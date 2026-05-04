import { adminLoginAction } from "@/app/admin/_actions";

export function AdminLoginForm() {
  return (
    <form action={adminLoginAction} className="space-y-4">
      <div>
        <label
          htmlFor="admin-password"
          className="block text-sm font-medium text-slate-800"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-sky-500/40 focus:border-sky-500 focus:ring-2"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-sky-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        Sign in
      </button>
    </form>
  );
}
