import "server-only";

import { cookies } from "next/headers";

import type { AdminOffer } from "@/lib/admin/types";

export type MasterDataEntity =
  | "offer-types"
  | "categories"
  | "merchants"
  | "payments"
  | "banks"
  | "locations";

export interface MasterDataRecord {
  id: string;
  name: string;
  parentId: string | null;
  status: "active" | "inactive";
  bannerImageUrl?: string | null;
  logoUrl?: string | null;
}

export interface OffersListResponse {
  items: AdminOffer[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

const DEFAULT_API_BASE_URL = "http://localhost:4000/api/v1";

export function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

async function backendFetch(path: string, init?: RequestInit) {
  const cookieHeader = (await cookies()).toString();
  const headers = new Headers(init?.headers ?? {});
  if (cookieHeader) headers.set("cookie", cookieHeader);
  if (!headers.has("accept")) headers.set("accept", "application/json");

  return fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function checkAdminSessionServer(): Promise<boolean> {
  const response = await backendFetch("/admin/auth/session");
  if (response.status === 200) return true;
  if (response.status === 401) return false;
  return false;
}

export async function getAdminOffersServer(query: URLSearchParams): Promise<OffersListResponse> {
  const qs = query.toString();
  const response = await backendFetch(`/admin/offers${qs ? `?${qs}` : ""}`);
  if (!response.ok) {
    return {
      items: [],
      meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 1 },
    };
  }
  const payload = (await response.json()) as unknown;
  if (isOffersListResponse(payload)) {
    return payload;
  }
  if (isObject(payload) && isOffersListResponse(payload.data)) {
    return payload.data;
  }
  return {
    items: [],
    meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 1 },
  };
}

export async function getAdminOffersAllPagesServer(baseQuery: URLSearchParams): Promise<AdminOffer[]> {
  const firstQuery = new URLSearchParams(baseQuery);
  firstQuery.set("page", "1");
  firstQuery.set("pageSize", "50");
  const first = await getAdminOffersServer(firstQuery);

  const safeTotalPages = Math.max(1, Math.min(first.meta.totalPages || 1, 200));
  if (safeTotalPages === 1) return first.items;

  const requests: Promise<OffersListResponse>[] = [];
  for (let page = 2; page <= safeTotalPages; page += 1) {
    const q = new URLSearchParams(baseQuery);
    q.set("page", String(page));
    q.set("pageSize", String(first.meta.pageSize || 50));
    requests.push(getAdminOffersServer(q));
  }

  const rest = await Promise.all(requests);
  const merged = [...first.items, ...rest.flatMap((item) => item.items)];

  // Defensive dedupe by ID to avoid duplicate rows from joins.
  return Array.from(new Map(merged.map((item) => [item.id, item])).values());
}

export async function getAdminOfferByIdServer(id: string): Promise<AdminOffer | null> {
  if (!id) return null;
  const response = await backendFetch(`/admin/offers/${encodeURIComponent(id)}`);
  if (!response.ok) return null;
  const payload = (await response.json()) as unknown;
  if (isAdminOffer(payload)) return payload;
  if (isObject(payload) && isAdminOffer(payload.item)) return payload.item;
  if (isObject(payload) && isAdminOffer(payload.data)) return payload.data;
  return null;
}

export async function getMasterDataEntityServer(entity: MasterDataEntity): Promise<MasterDataRecord[]> {
  const response = await backendFetch(`/admin/master-data/${entity}`);
  if (!response.ok) return [];
  const payload = (await response.json()) as unknown;
  return normalizeMasterDataList(payload);
}

export async function getAllMasterDataServer() {
  const [offerTypes, categories, merchants, payments, banks, locations] = await Promise.all([
    getMasterDataEntityServer("offer-types"),
    getMasterDataEntityServer("categories"),
    getMasterDataEntityServer("merchants"),
    getMasterDataEntityServer("payments"),
    getMasterDataEntityServer("banks"),
    getMasterDataEntityServer("locations"),
  ]);

  return { offerTypes, categories, merchants, payments, banks, locations };
}

function normalizeMasterDataList(payload: unknown): MasterDataRecord[] {
  if (Array.isArray(payload)) return payload as MasterDataRecord[];
  if (isObject(payload)) {
    if (Array.isArray(payload.items)) return payload.items as MasterDataRecord[];
    if (isObject(payload.data) && Array.isArray(payload.data.items)) {
      return payload.data.items as MasterDataRecord[];
    }
    if (Array.isArray(payload.data)) return payload.data as MasterDataRecord[];
  }
  return [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isOffersListResponse(value: unknown): value is OffersListResponse {
  if (!isObject(value) || !Array.isArray(value.items) || !isObject(value.meta)) return false;
  return (
    typeof value.meta.page === "number" &&
    typeof value.meta.pageSize === "number" &&
    typeof value.meta.totalItems === "number" &&
    typeof value.meta.totalPages === "number"
  );
}

function isAdminOffer(value: unknown): value is AdminOffer {
  if (!isObject(value)) return false;
  return typeof value.id === "string" && typeof value.title === "string";
}

