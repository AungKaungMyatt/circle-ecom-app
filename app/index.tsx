import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@core/providers/ThemeProvider";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // simulate splash delay
        await new Promise((res) => setTimeout(res, 1200));

        const user = await AsyncStorage.getItem("user");
        setIsLoggedIn(!!user);
      } catch (err) {
        console.log("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: t.colors.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={t.colors.text} size="large" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/shop" />;
  }

  return <Redirect href="/onboarding" />;
}
