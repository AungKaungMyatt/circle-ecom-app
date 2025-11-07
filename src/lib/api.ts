const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://online-shop-production-db95.up.railway.app";

type Http = "GET" | "POST" | "PATCH" | "DELETE";

async function req<T>(
  path: string,
  opts: {
    method?: Http;
    body?: any;
    token?: string;
    query?: Record<string, any>;
  } = {}
): Promise<T> {
  const { method = "GET", body, token, query } = opts;
  const url = new URL(path, BASE_URL);
  if (query)
    Object.entries(query).forEach(
      ([k, v]) => v != null && url.searchParams.append(k, String(v))
    );

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok)
    throw new Error(`HTTP ${res.status}: ${await res.text().catch(() => "")}`);
  return res.json();
}

export type Category = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};
export type Product = {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  basePrice: number;
  images?: string[];
  isFeatured?: boolean;
  rating?: number;
  variants?: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    image?: string;
  }[];
};
export type Review = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
};
export type Paged<T> = {
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
};

export const api = {
  // AUTH
  signup: (p: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => req(`/auth/signup`, { method: "POST", body: p }),
  verifyEmail: (email: string, code: string) =>
    req(`/auth/verify-email`, { method: "POST", body: { email, code } }),
  signin: (email: string, password: string) =>
    req<{ accessToken: string }>(`/auth/signin`, {
      method: "POST",
      body: { email, password },
    }),
  me: (token: string) => req(`/users/profile`, { token }),

  // CATEGORIES
  listCategories: () => req<Category[]>(`/categories`),

  // PRODUCTS
  listProducts: (params?: {
    keyword?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: "price_asc" | "price_desc" | "popularity" | "rating" | "newest";
    page?: number;
    limit?: number;
  }) => req<Paged<Product>>(`/products`, { query: params }),
  featuredProducts: (limit = 8) =>
    req<Product[]>(`/products/featured/list`, { query: { limit } }),
  productById: (id: string) => req<Product>(`/products/${id}`),

  // REVIEWS
  listReviewsForProduct: (productId: string) =>
    req<Review[]>(`/reviews/product/${productId}`),

  // WISHLIST (requires token)
  myWishlist: (token: string) => req<Product[]>(`/wishlist`, { token }),
  addToWishlist: (token: string, productId: string) =>
    req(`/wishlist`, { method: "POST", token, body: { productId } }),
  removeFromWishlist: (token: string, productId: string) =>
    req(`/wishlist/${productId}`, { method: "DELETE", token }),
  clearWishlist: (token: string) =>
    req(`/wishlist`, { method: "DELETE", token }),
};
