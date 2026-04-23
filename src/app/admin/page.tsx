import { redirect } from "next/navigation";

import { checkAdminSessionServer } from "@/lib/api/backend";

export default async function AdminIndexPage() {
  if (await checkAdminSessionServer()) {
    redirect("/admin/dashboard");
  }
  redirect("/admin/login");
}
