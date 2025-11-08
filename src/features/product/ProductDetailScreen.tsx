import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@core/providers/ThemeProvider";
import { api, Product as ApiProduct } from "@/lib/api";
import { useAuth } from "@/core/store/auth";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 320;

export default function ProductDetailScreen() {
  const t = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const token = useAuth((s) => s.token);

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const p = await api.productById(String(id));
        if (!active) return;
        setProduct(p);
        if (p.variants && p.variants.length > 0) {
          setSelectedVariantId(p.variants[0].id);
        }
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load product");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const images: string[] = useMemo(() => {
    const arr = product?.images ?? [];
    return arr.filter(
      (x): x is string => typeof x === "string" && x.length > 0
    );
  }, [product]);

  const ratingNum = useMemo(() => {
    const n = Number(product?.rating ?? 0);
    return Number.isFinite(n) ? n : 0;
  }, [product]);

  const reviewsCount = useMemo(() => {
    const raw =
      (product as any)?.reviewsCount ?? (product as any)?.reviews?.length ?? 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }, [product]);

  const price = useMemo(() => {
    if (!product) return 0;
    const variant = product.variants?.find((v) => v.id === selectedVariantId);
    const n = Number(variant?.price ?? product.basePrice ?? 0);
    return Number.isFinite(n) ? n : 0;
  }, [product, selectedVariantId]);

  const onAddToWishlist = async () => {
    try {
      if (!token) {
        Alert.alert("Sign in required", "Please sign in to use your wishlist.");
        return;
      }
      setAdding(true);
      await api.addToWishlist(product!.id);
      Alert.alert("Added", "Product was added to your wishlist.");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Could not add to wishlist");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: t.colors.bg,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: t.colors.bg,
        }}
      >
        <Text style={{ color: t.colors.text }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: t.colors.bg }]}>
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: t.colors.card,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: t.colors.textSecondary + "22",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="arrow-left" size={20} color={t.colors.text} />
        </Pressable>
        <Text
          style={[styles.headerTitle, { color: t.colors.text }]}
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Image carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
            if (idx !== activeImage) setActiveImage(idx);
          }}
          scrollEventThrottle={16}
          style={{
            width,
            height: IMAGE_HEIGHT,
            backgroundColor: t.colors.card,
          }}
        >
          {(images.length ? images : [undefined]).map((src, i) => (
            <View
              key={i}
              style={{
                width,
                height: IMAGE_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {src ? (
                <Image
                  source={{ uri: src }}
                  style={{ width: "88%", height: "88%" }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={{
                    width: "88%",
                    height: "88%",
                    backgroundColor: "#00000010",
                    borderRadius: 16,
                  }}
                />
              )}
            </View>
          ))}
        </ScrollView>

        {/* dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          {(images.length ? images : [1]).map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === activeImage
                    ? t.colors.text
                    : t.colors.textSecondary + "66",
              }}
            />
          ))}
        </View>

        {/* Body */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {/* Title & rating */}
          <Text
            style={{ fontSize: 20, fontWeight: "700", color: t.colors.text }}
          >
            {product.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
            }}
          >
            <Feather name="star" size={16} color="#f5a623" />
            <Text style={{ color: t.colors.text }}>
              {ratingNum.toFixed(1)}{" "}
              <Text style={{ color: t.colors.textSecondary }}>
                ({reviewsCount.toLocaleString()})
              </Text>
            </Text>
          </View>

          {/* Price */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              marginTop: 10,
              color: t.colors.text,
            }}
          >
            ${price.toFixed(2)}
          </Text>

          {/* Variants */}
          {!!product.variants?.length && (
            <View style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: t.colors.text,
                  marginBottom: 8,
                  fontWeight: "600",
                }}
              >
                Variants
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {product.variants.map((v) => {
                  const active = selectedVariantId === v.id;
                  return (
                    <Pressable
                      key={v.id}
                      onPress={() => setSelectedVariantId(v.id)}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        backgroundColor: active
                          ? t.colors.primary + "22"
                          : t.colors.card,
                        borderColor: active
                          ? t.colors.primary
                          : t.colors.textSecondary + "33",
                      }}
                    >
                      <Text
                        style={{
                          color: active ? t.colors.primary : t.colors.text,
                          fontWeight: "600",
                        }}
                      >
                        {v.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* Description */}
          {product.description ? (
            <View style={{ marginTop: 16 }}>
              <Text
                style={{ color: t.colors.text, opacity: 0.9, lineHeight: 20 }}
              >
                {product.description}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View
        style={{
          padding: 16,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: t.colors.textSecondary + "22",
          backgroundColor: t.colors.bg,
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={onAddToWishlist}
            disabled={adding}
            style={{
              height: 48,
              paddingHorizontal: 16,
              borderRadius: 12,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: t.colors.textSecondary + "33",
              backgroundColor: t.colors.card,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {adding ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: t.colors.text, fontWeight: "700" }}>
                Add to wishlist
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Cart", "Add to cart coming soon")}
            style={{
              height: 48,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: t.colors.primary,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                color: t.colors.onPrimary ?? "#ffffff",
                fontWeight: "700",
              }}
            >
              Add to cart
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", flex: 1 },
});
