import { Tabs } from "expo-router";
import { useTheme } from "@core/providers/ThemeProvider";
import { Home, ShoppingCart, ShoppingBag, Wallet, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopTabsLayout() {
  const t = useTheme();

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, backgroundColor: t.colors.bg }}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: t.colors.card,
          borderTopColor: t.colors.textSecondary + "40",
          height: 60,
        },
        tabBarActiveTintColor: t.colors.text,
        tabBarInactiveTintColor: t.colors.textSecondary,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index" // app/shop/index.tsx (Home)
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="cart" // app/shop/cart.tsx
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <ShoppingCart color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="orders" // app/shop/orders.tsx  ← add this file
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="wallet" // app/shop/wallet.tsx  ← add this file
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => <Wallet color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="profile" // app/shop/profile.tsx
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />

      {/* keep product screens hidden from tab bar */}
      <Tabs.Screen name="product" options={{ href: null }} />
    </Tabs>
    </SafeAreaView>
  );
}
