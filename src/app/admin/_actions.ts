"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";

function getExpectedAdminPassword(): string {
  const fromEnv = process.env.ADMIN_PASSWORD;
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== "production") return "admin";
  return "";
}

const MAX_BANNER_SIZE_BYTES = 5 * 1024 * 1024;

function getImageFileExtension(file: File): string {
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  if (file.type === "image/svg+xml") return "svg";
  return "webp";
}

async function saveOfferBannerFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Banner must be an image file.");
  }
  if (file.size > MAX_BANNER_SIZE_BYTES) {
    throw new Error("Banner exceeds maximum file size.");
  }

  const fileName = `${Date.now()}-${randomUUID()}.${getImageFileExtension(file)}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "offers");
  const targetPath = path.join(uploadDir, fileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(targetPath, Buffer.from(await file.arrayBuffer()));

  return `/uploads/offers/${fileName}`;
}

export async function adminLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = getExpectedAdminPassword();
  if (!expected || password !== expected) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

async function requireAdminSession() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login");
  }
}

export async function createOfferAction(formData: FormData) {
  await requireAdminSession();
  const offerId = String(formData.get("offerId") ?? "").trim();
  const isEdit = Boolean(offerId);

  const title = String(formData.get("title") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  const description = String(formData.get("description") ?? "").trim();

  const offerTypeIds = formData.getAll("offerTypeIds").map(String);
  const categoryIds = formData.getAll("categoryIds").map(String);
  const merchantIds = formData.getAll("merchantIds").map(String);
  const paymentIds = formData.getAll("paymentIds").map(String);
  const bankIds = formData.getAll("bankIds").map(String);
  const locationIds = formData.getAll("locationIds").map(String);

  const bannerFile = formData.get("heroImageFile");

  if (
    !title ||
    !startDate ||
    !endDate ||
    !description ||
    offerTypeIds.length === 0 ||
    categoryIds.length === 0 ||
    merchantIds.length === 0 ||
    paymentIds.length === 0 ||
    bankIds.length === 0 ||
    locationIds.length === 0
  ) {
    redirect("/admin/offers?error=1");
  }

  if (bannerFile instanceof File && bannerFile.size > 0) {
    await saveOfferBannerFile(bannerFile);
  } else if (!isEdit) {
    redirect("/admin/offers?error=1");
  }

  // Placeholder until DB integration is finalized in the next step.
  redirect(isEdit ? `/admin/offers?updated=1&edit=${offerId}` : "/admin/offers?created=1");
}

export async function deactivateOfferAction(formData: FormData) {
  await requireAdminSession();
  const offerId = String(formData.get("offerId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/dashboard");
  if (!offerId) {
    redirect(`${returnTo}?error=1`);
  }

  // Placeholder until DB integration is finalized in the next step.
  redirect(`${returnTo}?deactivated=1`);
}

export async function createCategoryAction(formData: FormData) {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/master-data?error=1");
  redirect("/admin/master-data?saved=category");
}

export async function createMerchantAction(formData: FormData) {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/master-data?error=1");
  redirect("/admin/master-data?saved=merchant");
}

export async function createBankAction(formData: FormData) {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/master-data?error=1");
  redirect("/admin/master-data?saved=bank");
}

export async function createLocationAction(formData: FormData) {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/master-data?error=1");
  redirect("/admin/master-data?saved=location");
}
