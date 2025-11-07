// src/features/shop/components/ProductCard.tsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@core/providers/ThemeProvider";

type UIProduct = {
  id: string;
  title: string;
  price?: number | string | null;
  rating?: number | string | null;
  reviews?: number | string | null;
  image?: string; // url
};

type Variant = "home" | "list"; // home = compact, list = larger

const SIZES: Record<
  Variant,
  { imageHeight: number; padding: number; radius: number; title: number; price: number }
> = {
  home: { imageHeight: 110, padding: 10, radius: 14, title: 13, price: 14 },
  list: { imageHeight: 160, padding: 12, radius: 16, title: 14, price: 16 },
};

export default function ProductCard({
  product,
  variant = "list",
  onPress,
  onWishlistPress,
}: {
  product: UIProduct;
  variant?: Variant;
  onPress?: () => void;
  onWishlistPress?: (id: string) => void;
}) {
  const t = useTheme();
  const v = SIZES[variant];

  const priceNum = Number(product.price ?? 0);
  const displayPrice = Number.isFinite(priceNum) ? priceNum.toFixed(2) : "0.00";
  const ratingNum = Number(product.rating ?? 0);
  const displayRating = Number.isFinite(ratingNum) ? ratingNum.toFixed(1) : "0.0";
  const reviewsNum = Number(product.reviews ?? 0);
  const displayReviews = Number.isFinite(reviewsNum) ? reviewsNum.toLocaleString() : "0";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { padding: v.padding, borderRadius: v.radius },
        Platform.select({
          ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
          android: { elevation: 1.5 },
        }),
        { backgroundColor: t.colors.card, borderColor: t.colors.textSecondary + "22" },
      ]}
    >
      <Pressable
        onPress={() => onWishlistPress?.(product.id)}
        hitSlop={8}
        style={[
          styles.heart,
          { backgroundColor: t.colors.bg, borderColor: t.colors.textSecondary + "22" },
        ]}
      >
        <Feather name="heart" size={16} color={t.colors.text} />
      </Pressable>

      <View
        style={[
          styles.imageBox,
          { height: v.imageHeight, backgroundColor: t.colors.bg + "80", borderRadius: v.radius - 2 },
        ]}
      >
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={{ flex: 1 }} />
        )}
      </View>

      <Text numberOfLines={2} style={{ color: t.colors.text, fontWeight: "700", marginTop: 8, fontSize: v.title }}>
        {product.title}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
        <Feather name="star" size={14} color="#f5a623" />
        <Text style={{ color: t.colors.text, fontSize: 12 }}>
          {displayRating} <Text style={{ color: t.colors.textSecondary }}>({displayReviews})</Text>
        </Text>
      </View>

      <Text style={{ color: t.colors.text, marginTop: 6, fontSize: v.price, fontWeight: "700" }}>
        ${displayPrice}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    position: "relative",
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  imageBox: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },
});
