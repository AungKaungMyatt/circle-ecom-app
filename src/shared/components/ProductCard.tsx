import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../core/providers/ThemeProvider";

export default function ProductCard({
  product,
  onPress,
}: {
  product: { id: string; title: string; price: number; rating: number; reviews: number; image?: any };
  onPress?: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable onPress={onPress} style={[
      styles.card,
      { backgroundColor: t.colors.card, borderColor: t.colors.textSecondary + "22" }
    ]}>
      <View style={{ alignItems: "flex-end" }}>
        <Pressable hitSlop={6}>
          <Feather name="heart" size={16} color={t.colors.text} />
        </Pressable>
      </View>
      <View style={styles.imageBox}>
        {product.image ? (
          <Image source={product.image} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
        ) : (
          <View style={{ flex: 1, backgroundColor: "#00000010", borderRadius: 12 }} />
        )}
      </View>
      <Text numberOfLines={2} style={{ color: t.colors.text, fontWeight: "700", marginTop: 8 }}>
        {product.title}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
        <Feather name="star" size={14} color="#f5a623" />
        <Text style={{ color: t.colors.text, fontSize: 12 }}>
          {product.rating.toFixed(1)}  <Text style={{ color: t.colors.textSecondary }}>({product.reviews.toLocaleString()})</Text>
        </Text>
      </View>
      <Text style={{ color: t.colors.text, marginTop: 6 }}>${product.price.toFixed(2)}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { width: "48%", padding: 10, borderRadius: 16, borderWidth: StyleSheet.hairlineWidth },
  imageBox: { height: 120, borderRadius: 12, overflow: "hidden", marginTop: 4 },
});
