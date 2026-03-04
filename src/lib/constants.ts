export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_KEY = process.env.API_KEY!;
export const PRODUCTS_LIMIT = 20;

export const ROUTES = {
  PHONES: {
    LIST: "/",
    DETAIL: (id: string) => `/phones/${id}`,
  },
  CART: "/cart",
} as const;
