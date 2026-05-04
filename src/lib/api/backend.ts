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

export interface PublicSiteCategoryResponse {
  id: string;
  name: string;
  bannerImageUrl: string | null;
  offerCount: number | null;
}

export interface PublicSitePromotionResponse {
  id: string;
  title: string;
  description: string | null;
  offerBannerImageUrl: string | null;
  startDate: string;
  endDate: string;
  companyName: string | null;
  merchant: string | null;
  category: string | null;
  offerType: string | null;
  daysLeft: number | null;
}

export interface PublicPromotionDetailResponse {
  id: string;
  title: string;
  description: string | null;
  offerDetails?: string | null;
  offerBannerImageUrl: string | null;
  startDate: string;
  endDate: string;
  merchant: string | null;
  category: string | null;
  offerType: string | null;
  daysLeft: number | null;
  relatedTags?: string[] | null;
}

export interface PublicSiteBankResponse {
  id: string;
  name: string;
  logoUrl: string | null;
  offerCount: number | null;
}

export interface PublicSiteContentResponse {
  categories?: PublicSiteCategoryResponse[];
  promotions?: PublicSitePromotionResponse[];
  banks?: PublicSiteBankResponse[];
}

export interface PublicPromotionSearchParams {
  q?: string;
  categories?: string[];
  offerTypes?: string[];
  paymentTypes?: string[];
  banks?: string[];
}

export interface PublicSearchFiltersResponse {
  categories: string[];
  offerTypes: string[];
  paymentTypes: string[];
  banks: string[];
}

const DEFAULT_API_BASE_URL = "http://localhost:4000/api/v1";

export function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export function getBackendOrigin() {
  return new URL(getApiBaseUrl()).origin;
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

export async function getPublicSiteContentServer(): Promise<PublicSiteContentResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/public/site-content`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as unknown;
    if (isPublicSiteContentResponse(payload)) return payload;
    if (isObject(payload) && isPublicSiteContentResponse(payload.data)) return payload.data;
    return null;
  } catch {
    return null;
  }
}

export async function getPublicPromotionsByCategoryServer(
  category: string,
): Promise<PublicSitePromotionResponse[] | null> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/public/promotions?category=${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as unknown;
    if (Array.isArray(payload) && payload.every(isPublicSitePromotion)) return payload;
    if (
      isObject(payload) &&
      Array.isArray(payload.promotions) &&
      payload.promotions.every(isPublicSitePromotion)
    ) {
      return payload.promotions;
    }
    if (
      isObject(payload) &&
      isObject(payload.data) &&
      Array.isArray(payload.data.promotions) &&
      payload.data.promotions.every(isPublicSitePromotion)
    ) {
      return payload.data.promotions;
    }
    return null;
  } catch {
    return null;
  }
}

export async function searchPublicPromotionsServer(
  params: PublicPromotionSearchParams,
): Promise<PublicSitePromotionResponse[] | null> {
  const qs = new URLSearchParams();
  if (params.q?.trim()) qs.set("q", params.q.trim());
  if (params.categories && params.categories.length > 0) qs.set("categories", params.categories.join(","));
  if (params.offerTypes && params.offerTypes.length > 0) qs.set("offerTypes", params.offerTypes.join(","));
  if (params.paymentTypes && params.paymentTypes.length > 0) {
    qs.set("paymentTypes", params.paymentTypes.join(","));
  }
  if (params.banks && params.banks.length > 0) qs.set("banks", params.banks.join(","));

  try {
    const response = await fetch(`${getApiBaseUrl()}/public/promotions/search?${qs.toString()}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as unknown;
    if (Array.isArray(payload) && payload.every(isPublicSitePromotion)) return payload;
    if (
      isObject(payload) &&
      Array.isArray(payload.promotions) &&
      payload.promotions.every(isPublicSitePromotion)
    ) {
      return payload.promotions;
    }
    if (
      isObject(payload) &&
      isObject(payload.data) &&
      Array.isArray(payload.data.promotions) &&
      payload.data.promotions.every(isPublicSitePromotion)
    ) {
      return payload.data.promotions;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getPublicSearchFiltersServer(): Promise<PublicSearchFiltersResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/public/promotions/search-filters`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as unknown;
    if (isPublicSearchFilters(payload)) return payload;
    if (isObject(payload) && isPublicSearchFilters(payload.filters)) return payload.filters;
    if (isObject(payload) && isObject(payload.data) && isPublicSearchFilters(payload.data)) {
      return payload.data;
    }
    if (
      isObject(payload) &&
      isObject(payload.data) &&
      isPublicSearchFilters(payload.data.filters)
    ) {
      return payload.data.filters;
    }
    return null;
  } catch {
    return null;
  }
}

export type PublicPromotionByIdResult =
  | { kind: "ok"; promotion: PublicPromotionDetailResponse }
  | { kind: "not_found" }
  | { kind: "unavailable" };

export async function getPublicPromotionByIdServer(id: string): Promise<PublicPromotionByIdResult> {
  const trimmed = id.trim();
  if (!trimmed) return { kind: "not_found" };
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/public/promotions/${encodeURIComponent(trimmed)}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (response.status === 404) return { kind: "not_found" };
    if (!response.ok) return { kind: "unavailable" };

    const payload = (await response.json()) as unknown;
    let promotion: PublicPromotionDetailResponse | null = null;
    if (isPublicPromotionDetail(payload)) promotion = payload;
    else if (isObject(payload) && isPublicPromotionDetail(payload.promotion)) promotion = payload.promotion;
    else if (isObject(payload) && isPublicPromotionDetail(payload.data)) promotion = payload.data;
    else if (
      isObject(payload) &&
      isObject(payload.data) &&
      isPublicPromotionDetail(payload.data.promotion)
    ) {
      promotion = payload.data.promotion;
    }
    if (promotion) return { kind: "ok", promotion };
    return { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}

export async function checkAdminSessionServer(): Promise<boolean> {
  try {
    const response = await backendFetch("/admin/auth/session");
    if (response.status === 200) return true;
    if (response.status === 401) return false;
    return false;
  } catch {
    return false;
  }
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

function isPublicSiteCategory(value: unknown): value is PublicSiteCategoryResponse {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    (typeof value.bannerImageUrl === "string" || value.bannerImageUrl === null || value.bannerImageUrl === undefined) &&
    (typeof value.offerCount === "number" || value.offerCount === null || value.offerCount === undefined)
  );
}

function isPublicSitePromotion(value: unknown): value is PublicSitePromotionResponse {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    (typeof value.description === "string" || value.description === null || value.description === undefined) &&
    (typeof value.offerBannerImageUrl === "string" ||
      value.offerBannerImageUrl === null ||
      value.offerBannerImageUrl === undefined) &&
    typeof value.startDate === "string" &&
    typeof value.endDate === "string" &&
    (typeof value.companyName === "string" || value.companyName === null || value.companyName === undefined) &&
    (typeof value.merchant === "string" || value.merchant === null || value.merchant === undefined) &&
    (typeof value.category === "string" || value.category === null || value.category === undefined) &&
    (typeof value.offerType === "string" || value.offerType === null || value.offerType === undefined) &&
    (typeof value.daysLeft === "number" || value.daysLeft === null || value.daysLeft === undefined)
  );
}

function isPublicPromotionDetail(value: unknown): value is PublicPromotionDetailResponse {
  if (!isObject(value)) return false;
  const relatedTagsOk =
    value.relatedTags === undefined ||
    value.relatedTags === null ||
    (Array.isArray(value.relatedTags) && value.relatedTags.every((item) => typeof item === "string"));
  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    (typeof value.description === "string" || value.description === null || value.description === undefined) &&
    (typeof value.offerDetails === "string" ||
      value.offerDetails === null ||
      value.offerDetails === undefined) &&
    (typeof value.offerBannerImageUrl === "string" ||
      value.offerBannerImageUrl === null ||
      value.offerBannerImageUrl === undefined) &&
    typeof value.startDate === "string" &&
    typeof value.endDate === "string" &&
    (typeof value.merchant === "string" || value.merchant === null || value.merchant === undefined) &&
    (typeof value.category === "string" || value.category === null || value.category === undefined) &&
    (typeof value.offerType === "string" || value.offerType === null || value.offerType === undefined) &&
    (typeof value.daysLeft === "number" || value.daysLeft === null || value.daysLeft === undefined) &&
    relatedTagsOk
  );
}

function isPublicSiteBank(value: unknown): value is PublicSiteBankResponse {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    (typeof value.logoUrl === "string" || value.logoUrl === null || value.logoUrl === undefined) &&
    (typeof value.offerCount === "number" || value.offerCount === null || value.offerCount === undefined)
  );
}

function isPublicSiteContentResponse(value: unknown): value is PublicSiteContentResponse {
  if (!isObject(value)) return false;
  const categoriesValid =
    value.categories === undefined ||
    (Array.isArray(value.categories) && value.categories.every(isPublicSiteCategory));
  const promotionsValid =
    value.promotions === undefined ||
    (Array.isArray(value.promotions) && value.promotions.every(isPublicSitePromotion));
  const banksValid =
    value.banks === undefined ||
    (Array.isArray(value.banks) && value.banks.every(isPublicSiteBank));
  return categoriesValid && promotionsValid && banksValid;
}

function isPublicSearchFilters(value: unknown): value is PublicSearchFiltersResponse {
  if (!isObject(value)) return false;
  const isStringArray = (v: unknown) => Array.isArray(v) && v.every((item) => typeof item === "string");
  return (
    isStringArray(value.categories) &&
    isStringArray(value.offerTypes) &&
    isStringArray(value.paymentTypes) &&
    isStringArray(value.banks)
  );
}

