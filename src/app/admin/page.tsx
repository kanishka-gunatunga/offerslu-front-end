import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export default async function AdminIndexPage() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (verifyAdminSessionToken(token)) {
    redirect("/admin/dashboard");
  }
  redirect("/admin/login");
}
