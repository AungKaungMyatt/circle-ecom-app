import { useEffect, useState } from "react";
import { api, Product as ApiProduct } from "@/lib/api";

export type ProductParams = {
  keyword?: string;
  categoryId?: string;
  sortBy?: "price_asc" | "price_desc" | "popularity" | "rating" | "newest";
  page?: number;
  limit?: number;
};

export type UIProduct = {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string;
};

export function useProductSearch(params: ProductParams) {
  const [items, setItems] = useState<UIProduct[]>([]);
  const [total, setTotal] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.listProducts(params); // GET /products?...
        // Map API -> UI shape and normalize numbers
        const mapped: UIProduct[] = (res.data ?? (res as any))?.map((p: ApiProduct & any) => {
          const priceNum = Number(p.basePrice ?? p.price ?? 0);
          const ratingNum = Number(p.rating ?? 0);
          return {
            id: String(p.id ?? Math.random()),
            title: String(p.name ?? "Unnamed Product"),
            price: Number.isFinite(priceNum) ? priceNum : 0,
            rating: Number.isFinite(ratingNum) ? ratingNum : 4.5,
            reviews: Number(p.reviewsCount ?? 1000),
            image: typeof p.images?.[0] === "string" ? p.images[0] : undefined,
          };
        }) ?? [];
        setItems(mapped);
        setTotal((res as any).total);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [JSON.stringify(params)]);

  return { items, total, loading, err };
}