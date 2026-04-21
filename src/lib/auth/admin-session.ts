import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "offerlu_admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") {
    return "dev-only-admin-session-secret-change-me";
  }
  throw new Error(
    "ADMIN_SESSION_SECRET is not set. Add it to your environment for admin login.",
  );
}

export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const payload = JSON.stringify({ exp });
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}::${sig}`, "utf-8").toString("base64url");
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const sep = decoded.lastIndexOf("::");
    if (sep === -1) return false;
    const payload = decoded.slice(0, sep);
    const sig = decoded.slice(sep + 2);
    const expected = createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");
    const a = Buffer.from(sig, "utf-8");
    const b = Buffer.from(expected, "utf-8");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const parsed = JSON.parse(payload) as { exp?: number };
    if (typeof parsed.exp !== "number") return false;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}
