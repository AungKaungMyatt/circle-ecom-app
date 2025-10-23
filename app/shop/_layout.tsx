import { Tabs } from "expo-router";
import { useTheme } from "../../src/core/providers/ThemeProvider";
import { Home, ShoppingCart, User } from "lucide-react-native";

export default function ShopTabsLayout() {
  const t = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: t.colors.card,
          borderTopColor: t.colors.textSecondary + "40",
        },
        tabBarActiveTintColor: t.colors.text,
        tabBarInactiveTintColor: t.colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <ShoppingCart color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
      {/* hide product stack from the tab bar */}
      <Tabs.Screen name="product" options={{ href: null }} />
    </Tabs>
  );
}
