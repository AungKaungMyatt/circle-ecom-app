import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/core/providers/ThemeProvider";

export default function ShopHome() {
  const t = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg, padding: 16 }}>
      <Text style={{ color: t.colors.text, fontSize: 24, fontWeight: "800" }}>
        Shop
      </Text>

      <Pressable
        onPress={() =>
          router.push({ pathname: "/shop/product/[id]", params: { id: "42" } })
        }
      >
        <Text style={{ color: t.colors.text, marginTop: 16, textDecorationLine: "underline" }}>
          Go to product #42 →
        </Text>
      </Pressable>
    </View>
  );
}
