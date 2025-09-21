import { useAuthStore } from "@/store/auth/authStore";

export async function fetchWrapper<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
    const { accessToken, setAccessToken } = useAuthStore.getState();

    console.log("fetchWrapper accessToken:", accessToken);
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
    };

    const res = await fetch(url, { ...options, headers, credentials: "include" });

    const newAccessToken = res.headers.get("x-access-token");
    if (newAccessToken) {
        setAccessToken(newAccessToken);
    }

    if (res.status === 401) {
        setAccessToken(null);
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Request failed");
    }

    console.log("x-access-token:", res.headers.get("x-access-token"));
    return res.json() as Promise<T>;
}
