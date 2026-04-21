"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Edit3, PlusCircle, Trash2, X } from "lucide-react";

import {
  bankOptions,
  categoryOptions,
  locationOptions,
  merchantOptions,
  offerTypeOptions,
  paymentOptions,
  type HierarchyOption,
} from "@/lib/admin/master-data";

type Status = "active" | "inactive";

type CategoryRecord = {
  id: string;
  name: string;
  parentId: string | null;
  bannerImageUrl: string;
  status: Status;
};

type MerchantRecord = {
  id: string;
  name: string;
  parentId: string | null;
  logoUrl: string;
  status: Status;
};

type BankRecord = {
  id: string;
  name: string;
  logoUrl: string;
  status: Status;
};

type LocationRecord = {
  id: string;
  name: string;
  status: Status;
};

type HierarchyRecord = {
  id: string;
  name: string;
  parentId: string | null;
  status: Status;
};

type ModalState =
  | { kind: "add-offer-type" }
  | { kind: "edit-offer-type"; id: string }
  | { kind: "add-category" }
  | { kind: "edit-category"; id: string }
  | { kind: "add-merchant" }
  | { kind: "edit-merchant"; id: string }
  | { kind: "add-payment" }
  | { kind: "edit-payment"; id: string }
  | { kind: "add-bank" }
  | { kind: "edit-bank"; id: string }
  | { kind: "add-location" }
  | { kind: "edit-location"; id: string }
  | null;

type DeleteState =
  | { kind: "offer-type"; id: string; name: string }
  | { kind: "category"; id: string; name: string }
  | { kind: "merchant"; id: string; name: string }
  | { kind: "payment"; id: string; name: string }
  | { kind: "bank"; id: string; name: string }
  | { kind: "location"; id: string; name: string }
  | null;

type MasterDataOpenKey =
  | "offer-type"
  | "category"
  | "merchant"
  | "payment"
  | "bank"
  | "location";

function initialModalFrom(open: MasterDataOpenKey | undefined): ModalState {
  if (open === "offer-type") return { kind: "add-offer-type" };
  if (open === "category") return { kind: "add-category" };
  if (open === "merchant") return { kind: "add-merchant" };
  if (open === "payment") return { kind: "add-payment" };
  if (open === "bank") return { kind: "add-bank" };
  if (open === "location") return { kind: "add-location" };
  return null;
}

function createCategorySeed(): CategoryRecord[] {
  const records: CategoryRecord[] = [];
  for (const parent of categoryOptions) {
    records.push({
      id: parent.id,
      name: parent.name,
      parentId: null,
      bannerImageUrl:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&h=500&q=80",
      status: "active",
    });
    for (const child of parent.children ?? []) {
      records.push({
        id: child.id,
        name: child.name,
        parentId: parent.id,
        bannerImageUrl:
          "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=500&q=80",
        status: "active",
      });
    }
  }
  return records;
}

function createHierarchySeed(options: HierarchyOption[]): HierarchyRecord[] {
  const records: HierarchyRecord[] = [];
  for (const parent of options) {
    records.push({
      id: parent.id,
      name: parent.name,
      parentId: null,
      status: "active",
    });
    for (const child of parent.children ?? []) {
      records.push({
        id: child.id,
        name: child.name,
        parentId: parent.id,
        status: "active",
      });
    }
  }
  return records;
}

function createMerchantSeed(): MerchantRecord[] {
  const records: MerchantRecord[] = [];
  for (const parent of merchantOptions) {
    records.push({
      id: parent.id,
      name: parent.name,
      parentId: null,
      logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        parent.name,
      )}&background=e2e8f0&color=0f172a&size=128&rounded=true`,
      status: "active",
    });
    for (const child of parent.children ?? []) {
      records.push({
        id: child.id,
        name: child.name,
        parentId: parent.id,
        logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          child.name,
        )}&background=e2e8f0&color=0f172a&size=128&rounded=true`,
        status: "active",
      });
    }
  }
  return records;
}

function createBankSeed(): BankRecord[] {
  return bankOptions.map((item) => ({
    id: item.id,
    name: item.name,
    logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      item.name,
    )}&background=e2e8f0&color=0f172a&size=128&rounded=true`,
    status: "active",
  }));
}

function createLocationSeed(): LocationRecord[] {
  return locationOptions.map((item) => ({
    id: item.id,
    name: item.name,
    status: "active",
  }));
}

function fileToObjectUrl(file: File | null): string | null {
  if (!file || file.size === 0) return null;
  return URL.createObjectURL(file);
}

function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function statusPill(status: Status) {
  return status === "active"
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
    : "bg-slate-100 text-slate-600 ring-slate-200";
}

export function MasterDataManager({ open }: { open?: MasterDataOpenKey }) {
  const [offerTypes, setOfferTypes] = useState<HierarchyRecord[]>(() =>
    createHierarchySeed(offerTypeOptions),
  );
  const [categories, setCategories] = useState<CategoryRecord[]>(createCategorySeed);
  const [merchants, setMerchants] = useState<MerchantRecord[]>(createMerchantSeed);
  const [payments, setPayments] = useState<HierarchyRecord[]>(() =>
    createHierarchySeed(paymentOptions),
  );
  const [banks, setBanks] = useState<BankRecord[]>(createBankSeed);
  const [locations, setLocations] = useState<LocationRecord[]>(createLocationSeed);
  const [modal, setModal] = useState<ModalState>(() => initialModalFrom(open));
  const [deleteTarget, setDeleteTarget] = useState<DeleteState>(null);
  const [message, setMessage] = useState<string>("");

  const offerTypeParents = useMemo(
    () => offerTypes.filter((item) => !item.parentId && item.status === "active"),
    [offerTypes],
  );
  const categoryParents = useMemo(
    () => categories.filter((item) => !item.parentId && item.status === "active"),
    [categories],
  );
  const merchantParents = useMemo(
    () => merchants.filter((item) => !item.parentId && item.status === "active"),
    [merchants],
  );
  const paymentParents = useMemo(
    () => payments.filter((item) => !item.parentId && item.status === "active"),
    [payments],
  );

  const currentOfferType =
    modal?.kind === "edit-offer-type"
      ? offerTypes.find((item) => item.id === modal.id) ?? null
      : null;
  const currentCategory =
    modal?.kind === "edit-category"
      ? categories.find((item) => item.id === modal.id) ?? null
      : null;
  const currentMerchant =
    modal?.kind === "edit-merchant"
      ? merchants.find((item) => item.id === modal.id) ?? null
      : null;
  const currentPayment =
    modal?.kind === "edit-payment"
      ? payments.find((item) => item.id === modal.id) ?? null
      : null;
  const currentBank =
    modal?.kind === "edit-bank" ? banks.find((item) => item.id === modal.id) ?? null : null;
  const currentLocation =
    modal?.kind === "edit-location"
      ? locations.find((item) => item.id === modal.id) ?? null
      : null;

  const saveCategory = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    const parentIdRaw = String(formData.get("parentId") ?? "").trim();
    const parentId = parentIdRaw || null;
    const bannerFile = formData.get("bannerImage") as File | null;
    if (!name) return;

    setCategories((prev) => {
      if (editingId) {
        const existing = prev.find((item) => item.id === editingId);
        if (!existing) return prev;
        const bannerImageUrl = fileToObjectUrl(bannerFile) ?? existing.bannerImageUrl;
        return prev.map((item) =>
          item.id === editingId
            ? { ...item, name, parentId, bannerImageUrl }
            : item,
        );
      }
      const bannerImageUrl =
        fileToObjectUrl(bannerFile) ??
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=500&q=80";
      return [
        ...prev,
        {
          id: newId("cat"),
          name,
          parentId,
          bannerImageUrl,
          status: "active",
        },
      ];
    });

    setModal(null);
    setMessage(editingId ? "Category updated." : "Category added.");
  };

  const saveOfferType = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    const parentIdRaw = String(formData.get("parentId") ?? "").trim();
    const parentId = parentIdRaw || null;
    if (!name) return;

    setOfferTypes((prev) => {
      if (editingId) {
        return prev.map((item) =>
          item.id === editingId ? { ...item, name, parentId } : item,
        );
      }
      return [...prev, { id: newId("ot"), name, parentId, status: "active" }];
    });
    setModal(null);
    setMessage(editingId ? "Offer type updated." : "Offer type added.");
  };

  const saveMerchant = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    const parentIdRaw = String(formData.get("parentId") ?? "").trim();
    const parentId = parentIdRaw || null;
    const logoFile = formData.get("logoImage") as File | null;
    if (!name) return;

    setMerchants((prev) => {
      if (editingId) {
        const existing = prev.find((item) => item.id === editingId);
        if (!existing) return prev;
        const logoUrl = fileToObjectUrl(logoFile) ?? existing.logoUrl;
        return prev.map((item) => (item.id === editingId ? { ...item, name, parentId, logoUrl } : item));
      }
      const logoUrl =
        fileToObjectUrl(logoFile) ??
        "https://ui-avatars.com/api/?name=MER&background=e2e8f0&color=0f172a&size=128&rounded=true";
      return [
        ...prev,
        { id: newId("mer"), name, parentId, logoUrl, status: "active" },
      ];
    });

    setModal(null);
    setMessage(editingId ? "Merchant updated." : "Merchant added.");
  };

  const savePayment = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    const parentIdRaw = String(formData.get("parentId") ?? "").trim();
    const parentId = parentIdRaw || null;
    if (!name) return;

    setPayments((prev) => {
      if (editingId) {
        return prev.map((item) =>
          item.id === editingId ? { ...item, name, parentId } : item,
        );
      }
      return [...prev, { id: newId("pay"), name, parentId, status: "active" }];
    });
    setModal(null);
    setMessage(editingId ? "Payment updated." : "Payment added.");
  };

  const saveBank = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    const logoFile = formData.get("logoImage") as File | null;
    if (!name) return;

    setBanks((prev) => {
      if (editingId) {
        const existing = prev.find((item) => item.id === editingId);
        if (!existing) return prev;
        const logoUrl = fileToObjectUrl(logoFile) ?? existing.logoUrl;
        return prev.map((item) => (item.id === editingId ? { ...item, name, logoUrl } : item));
      }
      const logoUrl =
        fileToObjectUrl(logoFile) ??
        "https://ui-avatars.com/api/?name=BANK&background=e2e8f0&color=0f172a&size=128&rounded=true";
      return [...prev, { id: newId("bank"), name, logoUrl, status: "active" }];
    });

    setModal(null);
    setMessage(editingId ? "Bank updated." : "Bank added.");
  };

  const saveLocation = (formData: FormData, editingId?: string) => {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    setLocations((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? { ...item, name } : item));
      }
      return [...prev, { id: newId("loc"), name, status: "active" }];
    });
    setModal(null);
    setMessage(editingId ? "Location updated." : "Location added.");
  };

  const softDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.kind === "offer-type") {
      setOfferTypes((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Offer type marked as inactive.");
    } else if (deleteTarget.kind === "category") {
      setCategories((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Category marked as inactive.");
    } else if (deleteTarget.kind === "merchant") {
      setMerchants((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Merchant marked as inactive.");
    } else if (deleteTarget.kind === "payment") {
      setPayments((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Payment marked as inactive.");
    } else if (deleteTarget.kind === "bank") {
      setBanks((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Bank marked as inactive.");
    } else {
      setLocations((prev) =>
        prev.map((item) => (item.id === deleteTarget.id ? { ...item, status: "inactive" } : item)),
      );
      setMessage("Location marked as inactive.");
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      {message ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
          {message}
        </p>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <EntityCard
          title="Offer Type"
          description="2 levels. Create parent and child offer types."
          onAdd={() => setModal({ kind: "add-offer-type" })}
        >
          <EntityTable
            columns={["Name", "Parent", "Status", "Actions"]}
            rows={offerTypes.map((item) => [
              item.name,
              item.parentId ? offerTypes.find((p) => p.id === item.parentId)?.name ?? "-" : "Level 1",
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-offer-type", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "offer-type", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>

        <EntityCard
          title="Category"
          description="2 levels. Every category has a banner image."
          onAdd={() => setModal({ kind: "add-category" })}
        >
          <EntityTable
            columns={["Name", "Parent", "Status", "Actions"]}
            rows={categories.map((item) => [
              item.name,
              item.parentId ? categories.find((p) => p.id === item.parentId)?.name ?? "-" : "Level 1",
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-category", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "category", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>

        <EntityCard
          title="Merchant"
          description="Supports level 1 and level 2 grouping. Merchant includes logo."
          onAdd={() => setModal({ kind: "add-merchant" })}
        >
          <EntityTable
            columns={["Name", "Parent", "Status", "Actions"]}
            rows={merchants.map((item) => [
              item.name,
              item.parentId ? merchants.find((p) => p.id === item.parentId)?.name ?? "-" : "Level 1",
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-merchant", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "merchant", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>

        <EntityCard
          title="Payment"
          description="2 levels. Create payment groups and sub payment types."
          onAdd={() => setModal({ kind: "add-payment" })}
        >
          <EntityTable
            columns={["Name", "Parent", "Status", "Actions"]}
            rows={payments.map((item) => [
              item.name,
              item.parentId ? payments.find((p) => p.id === item.parentId)?.name ?? "-" : "Level 1",
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-payment", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "payment", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>

        <EntityCard
          title="Bank"
          description="Single level with name and logo."
          onAdd={() => setModal({ kind: "add-bank" })}
        >
          <EntityTable
            columns={["Name", "Status", "Actions"]}
            rows={banks.map((item) => [
              item.name,
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-bank", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "bank", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>

        <EntityCard
          title="Location"
          description="Single level with location name only."
          onAdd={() => setModal({ kind: "add-location" })}
        >
          <EntityTable
            columns={["Name", "Status", "Actions"]}
            rows={locations.map((item) => [
              item.name,
              <StatusBadge key={`${item.id}-status`} status={item.status} />,
              <RowActions
                key={`${item.id}-actions`}
                onEdit={() => setModal({ kind: "edit-location", id: item.id })}
                onDelete={() => setDeleteTarget({ kind: "location", id: item.id, name: item.name })}
              />,
            ])}
          />
        </EntityCard>
      </section>

      {modal ? (
        <ModalFrame
          title={
            modal.kind.startsWith("add")
              ? `Add ${modal.kind.split("-")[1]}`
              : `Edit ${modal.kind.split("-")[1]}`
          }
          onClose={() => setModal(null)}
        >
          {modal.kind === "add-offer-type" || modal.kind === "edit-offer-type" ? (
            <HierarchyNameForm
              entityLabel="Offer type"
              initial={currentOfferType}
              parentOptions={offerTypeParents}
              onSubmit={(fd) => saveOfferType(fd, currentOfferType?.id)}
            />
          ) : null}
          {modal.kind === "add-category" || modal.kind === "edit-category" ? (
            <CategoryForm
              initial={currentCategory}
              parentOptions={categoryParents}
              onSubmit={(fd) => saveCategory(fd, currentCategory?.id)}
            />
          ) : null}
          {modal.kind === "add-merchant" || modal.kind === "edit-merchant" ? (
            <MerchantForm
              initial={currentMerchant}
              parentOptions={merchantParents}
              onSubmit={(fd) => saveMerchant(fd, currentMerchant?.id)}
            />
          ) : null}
          {modal.kind === "add-payment" || modal.kind === "edit-payment" ? (
            <HierarchyNameForm
              entityLabel="Payment"
              initial={currentPayment}
              parentOptions={paymentParents}
              onSubmit={(fd) => savePayment(fd, currentPayment?.id)}
            />
          ) : null}
          {modal.kind === "add-bank" || modal.kind === "edit-bank" ? (
            <BankForm initial={currentBank} onSubmit={(fd) => saveBank(fd, currentBank?.id)} />
          ) : null}
          {modal.kind === "add-location" || modal.kind === "edit-location" ? (
            <LocationForm
              initial={currentLocation}
              onSubmit={(fd) => saveLocation(fd, currentLocation?.id)}
            />
          ) : null}
        </ModalFrame>
      ) : null}

      {deleteTarget ? (
        <ModalFrame title="Confirm Deactivate" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-slate-700">
            Deactivate <span className="font-semibold">{deleteTarget.name}</span>? This is a soft
            delete and will set status to inactive.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={softDelete}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Confirm Deactivate
            </button>
          </div>
        </ModalFrame>
      ) : null}
    </div>
  );
}

function EntityCard({
  title,
  description,
  onAdd,
  children,
}: {
  title: string;
  description: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex h-[420px] flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:h-[460px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <PlusCircle className="h-4 w-4" />
          Add
        </button>
      </div>
      <div className="admin-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        {children}
      </div>
    </div>
  );
}

function EntityTable({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((cells, index) => (
            <tr key={index}>
              {cells.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-3 py-2 text-sm text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold hover:bg-slate-50"
      >
        <Edit3 className="h-3.5 w-3.5" />
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${statusPill(status)}`}>
      {status}
    </span>
  );
}

function ModalFrame({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function HierarchyNameForm({
  entityLabel,
  initial,
  parentOptions,
  onSubmit,
}: {
  entityLabel: string;
  initial: HierarchyRecord | null;
  parentOptions: HierarchyRecord[];
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        {entityLabel} name
        <input
          name="name"
          defaultValue={initial?.name ?? ""}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Parent {entityLabel.toLowerCase()} (for level 2)
        <select
          name="parentId"
          defaultValue={initial?.parentId ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        >
          <option value="">No parent (Level 1)</option>
          {parentOptions
            .filter((item) => item.id !== initial?.id)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function CategoryForm({
  initial,
  parentOptions,
  onSubmit,
}: {
  initial: CategoryRecord | null;
  parentOptions: CategoryRecord[];
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        Category name
        <input
          name="name"
          defaultValue={initial?.name ?? ""}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Parent category (for level 2)
        <select
          name="parentId"
          defaultValue={initial?.parentId ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        >
          <option value="">No parent (Level 1)</option>
          {parentOptions
            .filter((item) => item.id !== initial?.id)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Category banner image
        <input
          type="file"
          name="bannerImage"
          accept="image/*"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function MerchantForm({
  initial,
  parentOptions,
  onSubmit,
}: {
  initial: MerchantRecord | null;
  parentOptions: MerchantRecord[];
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        Merchant name
        <input
          name="name"
          defaultValue={initial?.name ?? ""}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Parent merchant (for level 2)
        <select
          name="parentId"
          defaultValue={initial?.parentId ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        >
          <option value="">No parent (Level 1)</option>
          {parentOptions
            .filter((item) => item.id !== initial?.id)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Merchant logo
        <input
          type="file"
          name="logoImage"
          accept="image/*"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function BankForm({
  initial,
  onSubmit,
}: {
  initial: BankRecord | null;
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        Bank name
        <input
          name="name"
          defaultValue={initial?.name ?? ""}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Bank logo
        <input
          type="file"
          name="logoImage"
          accept="image/*"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function LocationForm({
  initial,
  onSubmit,
}: {
  initial: LocationRecord | null;
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        Location name
        <input
          name="name"
          defaultValue={initial?.name ?? ""}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}
