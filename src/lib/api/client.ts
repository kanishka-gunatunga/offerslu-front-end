const DEFAULT_API_BASE_URL = "http://localhost:4000/api/v1";

export function getClientApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export function getClientBackendOrigin() {
  try {
    return new URL(getClientApiBaseUrl()).origin;
  } catch {
    return "http://localhost:4000";
  }
}

export async function clientApiFetch(path: string, init?: RequestInit) {
  return fetch(`${getClientApiBaseUrl()}${path}`, {
    ...init,
    credentials: "include",
  });
}

