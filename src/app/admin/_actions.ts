"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/admin-session";
import { getApiBaseUrl } from "@/lib/api/backend";

async function backendFetch(path: string, init?: RequestInit) {
  const cookieHeader = (await cookies()).toString();
  const headers = new Headers(init?.headers ?? {});
  if (cookieHeader) headers.set("cookie", cookieHeader);
  return fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function adminLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const response = await fetch(`${getApiBaseUrl()}/admin/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ password }),
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/admin/login?error=1");
  }

  // Forward backend session cookie to browser scope used by frontend app.
  const rawSetCookie = response.headers.get("set-cookie");
  const cookieStore = await cookies();
  if (rawSetCookie) {
    const [cookieKv, ...attrs] = rawSetCookie.split(";");
    const [name, ...valueParts] = cookieKv.split("=");
    const value = valueParts.join("=");
    if (name.trim() === ADMIN_SESSION_COOKIE && value) {
      const maxAge = attrs
        .map((item) => item.trim().toLowerCase())
        .find((item) => item.startsWith("max-age="));
      cookieStore.set(ADMIN_SESSION_COOKIE, value, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: maxAge ? Number(maxAge.replace("max-age=", "")) : 60 * 60 * 24 * 7,
      });
    }
  }

  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  await backendFetch("/admin/auth/logout", { method: "POST" });
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function createOfferAction(formData: FormData) {
  const offerId = String(formData.get("offerId") ?? "").trim();
  const isEdit = offerId.length > 0;
  const endpoint = isEdit ? `/admin/offers/${encodeURIComponent(offerId)}` : "/admin/offers";
  const method = isEdit ? "PATCH" : "POST";
  const heroImageFile = formData.get("heroImageFile");
  if (heroImageFile instanceof File && heroImageFile.size === 0) {
    formData.delete("heroImageFile");
  }

  let response: Response;
  try {
    response = await backendFetch(endpoint, {
      method,
      body: formData,
    });
  } catch {
    // Prevent server action crashes when backend is unavailable.
    redirect("/admin/offers?error=1");
  }

  if (response.status === 401) {
    redirect("/admin/login");
  }
  if (!response.ok) {
    redirect("/admin/offers?error=1");
  }
  redirect(isEdit ? `/admin/offers?updated=1&edit=${offerId}` : "/admin/offers?created=1");
}

export async function deactivateOfferAction(formData: FormData) {
  const offerId = String(formData.get("offerId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/dashboard");
  if (!offerId) {
    redirect(`${returnTo}?error=1`);
  }

  let response: Response;
  try {
    response = await backendFetch(`/admin/offers/${encodeURIComponent(offerId)}`, {
      method: "DELETE",
    });
  } catch {
    redirect(`${returnTo}?error=1`);
  }
  if (response.status === 401) {
    redirect("/admin/login");
  }
  if (!response.ok) {
    redirect(`${returnTo}?error=1`);
  }

  redirect(`${returnTo}?deactivated=1`);
}
