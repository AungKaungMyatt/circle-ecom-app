import React from "react";
import { useRouter } from "expo-router";
import HomeScreen from "../../../features/home/screens/HomeScreen";

export default function HomeContainer() {
  const router = useRouter();

  // mock user + data (swap with API later)
  const user = { name: "Andrew Ainsley", avatar: undefined as string | undefined };

  const categories = [
    { id: "clothes", label: "Clothes", icon: "tshirt" as const },
    { id: "shoes", label: "Shoes", icon: "shoe-prints" as const },
    { id: "bags", label: "Bags", icon: "shopping-bag" as const },
    { id: "electronics", label: "Electronics", icon: "mobile" as const },
    { id: "watch", label: "Watch", icon: "clock" as const },
    { id: "jewelry", label: "Jewelry", icon: "gem" as const },
    { id: "kitchen", label: "Kitchen", icon: "utensils" as const },
    { id: "toys", label: "Toys", icon: "puzzle-piece" as const },
  ];

  const filters = ["All", "Clothes", "Shoes", "Bags", "Electronics"];

  const products = [
    { id: "p1", title: "Snake Leather Bag", price: 445, rating: 4.5, reviews: 1100, image: undefined },
    { id: "p2", title: "Suga Leather Shoes", price: 375, rating: 4.7, reviews: 1280, image: undefined },
    { id: "p3", title: "Leather Casual Suit", price: 420, rating: 4.3, reviews: 980, image: undefined },
    { id: "p4", title: "Black Leather Bag", price: 765, rating: 4.6, reviews: 870, image: undefined },
    { id: "p5", title: "Airtight Microphone", price: 390, rating: 4.6, reviews: 1450, image: undefined },
    { id: "p6", title: "Black Nike Shoes", price: 560, rating: 4.8, reviews: 1780, image: undefined },
  ];

  const onSeeAllSpecial = () => {};
  const onSeeAllPopular = () => {};
  const onOpenProduct = (id: string) => router.push(`/shop/${id}`);

  return (
    <HomeScreen
      user={user}
      categories={categories}
      filters={filters}
      products={products}
      onSeeAllSpecial={onSeeAllSpecial}
      onSeeAllPopular={onSeeAllPopular}
      onOpenProduct={onOpenProduct}
    />
  );
}
