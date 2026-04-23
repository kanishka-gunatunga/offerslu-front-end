"use client";

import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { createOfferAction } from "@/app/admin/_actions";
import {
  type FlatOption,
  type HierarchyOption,
} from "@/lib/admin/master-data";
import type { AdminOffer } from "@/lib/admin/types";

export function AddOfferForm({
  initialValues,
  options,
  submitLabel = "Add offer",
}: {
  initialValues?: AdminOffer;
  options: {
    offerTypeOptions: HierarchyOption[];
    categoryOptions: HierarchyOption[];
    merchantOptions: HierarchyOption[];
    paymentOptions: HierarchyOption[];
    bankOptions: FlatOption[];
    locationOptions: FlatOption[];
  };
  submitLabel?: string;
}) {
  const {
    offerTypeOptions,
    categoryOptions,
    merchantOptions,
    paymentOptions,
    bankOptions,
    locationOptions,
  } = options;
  const initialCategoryParents = useMemo(
    () =>
      categoryOptions
        .filter((group) => initialValues?.categoryIds.includes(group.id))
        .map((group) => group.id),
    [categoryOptions, initialValues],
  );
  const initialMerchantParents = useMemo(
    () =>
      merchantOptions
        .filter((group) => initialValues?.merchantIds.includes(group.id))
        .map((group) => group.id),
    [merchantOptions, initialValues],
  );
  const initialPaymentParents = useMemo(
    () =>
      paymentOptions
        .filter((group) => initialValues?.paymentIds.includes(group.id))
        .map((group) => group.id),
    [paymentOptions, initialValues],
  );
  const initialOfferTypeParents = useMemo(
    () =>
      offerTypeOptions
        .filter((group) => initialValues?.offerTypeIds.includes(group.id))
        .map((group) => group.id),
    [offerTypeOptions, initialValues],
  );

  const [categoryParents, setCategoryParents] = useState<string[]>(initialCategoryParents);
  const [merchantParents, setMerchantParents] = useState<string[]>(initialMerchantParents);
  const [paymentParents, setPaymentParents] = useState<string[]>(initialPaymentParents);
  const [offerTypeParents, setOfferTypeParents] = useState<string[]>(initialOfferTypeParents);

  const toggleParent = (
    id: string,
    setState: Dispatch<SetStateAction<string[]>>,
  ) => {
    setState((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <form id="add-offer" action={createOfferAction} className="space-y-5">
      {initialValues ? <input type="hidden" name="offerId" value={initialValues.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Offer title
          <input
            required
            name="title"
            placeholder="HNB Credit Card Offer - Flash Sale"
            defaultValue={initialValues?.title}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Start date
          <input
            required
            type="date"
            name="startDate"
            defaultValue={initialValues?.startDate}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          End date
          <input
            required
            type="date"
            name="endDate"
            defaultValue={initialValues?.endDate}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Banner image
          <input
            required={!initialValues}
            type="file"
            name="heroImageFile"
            accept="image/*"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
          />
        </label>
      </div>

      <HierarchyCheckboxGroup
        legend="Offer Type (Optional)"
        description=""
        name="offerTypeIds"
        groups={offerTypeOptions}
        openParents={offerTypeParents}
        onToggleParent={(id) => toggleParent(id, setOfferTypeParents)}
        initialSelected={initialValues?.offerTypeIds ?? []}
        addHref="/admin/master-data?open=offer-type"
      />

      <HierarchyCheckboxGroup
        legend="Category (Optional)"
        description=""
        name="categoryIds"
        groups={categoryOptions}
        openParents={categoryParents}
        onToggleParent={(id) => toggleParent(id, setCategoryParents)}
        initialSelected={initialValues?.categoryIds ?? []}
        addHref="/admin/master-data?open=category"
      />

      <HierarchyCheckboxGroup
        legend="Merchant (Optional)"
        description=""
        name="merchantIds"
        groups={merchantOptions}
        openParents={merchantParents}
        onToggleParent={(id) => toggleParent(id, setMerchantParents)}
        initialSelected={initialValues?.merchantIds ?? []}
        addHref="/admin/master-data?open=merchant"
      />

      <HierarchyCheckboxGroup
        legend="Payment (Optional)"
        description=""
        name="paymentIds"
        groups={paymentOptions}
        openParents={paymentParents}
        onToggleParent={(id) => toggleParent(id, setPaymentParents)}
        initialSelected={initialValues?.paymentIds ?? []}
        addHref="/admin/master-data?open=payment"
      />

      <CheckboxGroup
        legend="Bank (Optional)"
        description=""
        name="bankIds"
        options={bankOptions.map((item) => ({ id: item.id, label: item.name }))}
        initialSelected={initialValues?.bankIds ?? []}
        addHref="/admin/master-data?open=bank"
      />

      <CheckboxGroup
        legend="Location (Optional)"
        description=""
        name="locationIds"
        options={locationOptions.map((item) => ({ id: item.id, label: item.name }))}
        initialSelected={initialValues?.locationIds ?? []}
        addHref="/admin/master-data?open=location"
      />

      <label className="block text-sm font-medium text-slate-700">
        Description
        <textarea
          required
          name="description"
          rows={4}
          placeholder="Limited time flash sale on luxury handbags..."
          defaultValue={initialValues?.description}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function CheckboxGroup({
  legend,
  description,
  name,
  options,
  initialSelected,
  addHref,
}: {
  legend: string;
  description: string;
  name: string;
  options: { id: string; label: string }[];
  initialSelected: string[];
  addHref?: string;
}) {
  return (
    <fieldset className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="px-1 text-sm font-semibold text-slate-900">{legend}</p>
        {addHref ? (
          <Link
            href={addHref}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Link>
        ) : null}
      </div>
      <p className="mb-3 text-xs text-slate-600">{description}</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <input
              type="checkbox"
              name={name}
              value={option.id}
              defaultChecked={initialSelected.includes(option.id)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function HierarchyCheckboxGroup({
  legend,
  description,
  name,
  groups,
  openParents,
  onToggleParent,
  initialSelected,
  addHref,
}: {
  legend: string;
  description: string;
  name: string;
  groups: HierarchyOption[];
  openParents: string[];
  onToggleParent: (id: string) => void;
  initialSelected: string[];
  addHref?: string;
}) {
  return (
    <fieldset className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="px-1 text-sm font-semibold text-slate-900">{legend}</p>
        {addHref ? (
          <Link
            href={addHref}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Link>
        ) : null}
      </div>
      <p className="mb-3 text-xs text-slate-600">{description}</p>
      <div className="space-y-3">
        {groups.map((group) => {
          const isOpen = openParents.includes(group.id);
          return (
            <div key={group.id} className="rounded-xl border border-slate-200 bg-white p-3">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-800">
                <input
                  type="checkbox"
                  name={name}
                  value={group.id}
                  defaultChecked={initialSelected.includes(group.id)}
                  onChange={() => onToggleParent(group.id)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                {group.name}
              </label>
              {isOpen && group.children?.length ? (
                <div className="mt-3 grid gap-2 pl-6 sm:grid-cols-2">
                  {group.children.map((child) => (
                    <label
                      key={child.id}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        name={name}
                        value={child.id}
                        defaultChecked={initialSelected.includes(child.id)}
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      {child.name}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
