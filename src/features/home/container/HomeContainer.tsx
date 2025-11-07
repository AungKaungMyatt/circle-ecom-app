import React, { useMemo } from "react";
import { useRouter } from "expo-router";
import HomeScreen from "@features/home/screens/HomeScreen";
import { useShopData } from "@/features/shop/useShopData";

/** Map category names to icons used by HomeScreen */
function getIconForCategory(name?: string) {
  const key = (name ?? "").toLowerCase();
  if (key.includes("cloth")) return "tshirt" as const;
  if (key.includes("shoe")) return "shoe-prints" as const;
  if (key.includes("bag")) return "shopping-bag" as const;
  if (key.includes("elect")) return "mobile" as const;
  if (key.includes("watch")) return "clock" as const;
  if (key.includes("jewel")) return "gem" as const;
  if (key.includes("kitchen")) return "utensils" as const;
  if (key.includes("toy")) return "puzzle-piece" as const;
  return "shopping-bag" as const;
}

// This is the exact shape HomeScreen expects for each product item.
type UIProduct = {
  id: string;
  title: string;
  price: number;
  rating: number;           // must be number (not undefined)
  reviews: number;
  image?: string;           // url string or undefined
};

export default function HomeContainer() {
  const router = useRouter();

  // fetch categories + featured products from API
  const { categories, featured, loading, err } = useShopData(8);

  // dummy user (swap with real user data when available)
  const user = { name: "Guest", avatar: undefined as string | undefined };

  // map categories for HomeScreen
  const uiCategories = useMemo(
    () =>
      (categories ?? []).map((c) => ({
        id: c.id,
        label: c.name ?? "Unknown",
        icon: getIconForCategory(c.name),
      })),
    [categories]
  );

  // simple filters row
  const filters = useMemo(() => {
    const names = uiCategories.map((c) => c.label);
    const unique = Array.from(new Set(names));
    return ["All", ...unique.slice(0, 6)];
  }, [uiCategories]);

  // ---- map & normalize featured products (ensure types match HomeScreen) ----
  const uiProducts: UIProduct[] = useMemo(
    () =>
      (featured ?? []).map((p) => {
        // price -> number
        const priceNum = Number((p as any).basePrice ?? (p as any).price ?? 0);
        const price = Number.isFinite(priceNum) ? priceNum : 0;

        // rating -> number
        const ratingNum = Number((p as any).rating ?? 0);
        const rating = Number.isFinite(ratingNum) ? ratingNum : 4.5;

        // image -> string | undefined
        const image =
          typeof p.images?.[0] === "string" ? (p.images![0] as string) : undefined;

        return {
          id: String(p.id ?? Math.random()),
          title: String(p.name ?? "Unnamed Product"),
          price,
          rating,
          reviews: 1000, // TODO: replace with real counts when available
          image,
        };
      }),
    [featured]
  );

  // navigation handlers
  const onSeeAllSpecial = () => router.push("/shop/product");
  const onSeeAllPopular = () => router.push("/shop/product");
  const onOpenProduct = (id: string) => router.push(`/shop/product/${id}`);

  // minimal loading/error fallbacks (keep props stable)
  if (loading || err) {
    return (
      <HomeScreen
        user={user}
        categories={uiCategories}
        filters={filters}
        products={[]}
        onSeeAllSpecial={onSeeAllSpecial}
        onSeeAllPopular={onSeeAllPopular}
        onOpenProduct={onOpenProduct}
      />
    );
  }

  return (
    <HomeScreen
      user={user}
      categories={uiCategories}
      filters={filters}
      products={uiProducts}
      onSeeAllSpecial={onSeeAllSpecial}
      onSeeAllPopular={onSeeAllPopular}
      onOpenProduct={onOpenProduct}
    />
  );
}
