import { useEffect, useState } from "react";
import { api, Category as ApiCategory, Product as ApiProduct } from "@/lib/api";

export function useShopData(limit = 8) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [featured, setFeatured] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [cats, feats] = await Promise.all([
          api.listCategories(),            // GET /categories
          api.featuredProducts(limit),     // GET /products/featured/list?limit=
        ]);
        setCategories(cats);
        setFeatured(feats);
      } catch (e: any) { setErr(e.message); }
      finally { setLoading(false); }
    })();
  }, [limit]);

  return { categories, featured, loading, err };
}
