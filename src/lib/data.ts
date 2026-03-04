import { API_BASE_URL, API_KEY, PRODUCTS_LIMIT } from "./constants";
import { Phone } from "./types";

export async function getPhones(search?: string): Promise<Phone[]> {
  const url = new URL(`${API_BASE_URL}/products`);

  if (search) {
    url.searchParams.set("search", search);
  }

  url.searchParams.set("limit", PRODUCTS_LIMIT.toString());

  const res = await fetch(url.toString(), {
    headers: { "x-api-key": API_KEY },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
