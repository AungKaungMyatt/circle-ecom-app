import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpScreen from "@features/auth/screens/SignUpScreen";
import * as AuthService from "@features/auth/services/AuthService";

// where to land after successful sign-up
const AFTER_AUTH_PATH = "/"; // or "/shop"

export default function SignUpContainer() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    root?: string;
  }>({});

  const onSubmit = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setErrors({});
    if (name.trim().length < 2) return setErrors((e) => ({ ...e, name: "Enter your full name" }));
    if (!email.includes("@")) return setErrors((e) => ({ ...e, email: "Enter a valid email" }));
    if (password.length < 8) return setErrors((e) => ({ ...e, password: "At least 8 characters" }));

    try {
      setLoading(true);
      const user = await AuthService.signUpWithEmail(name.trim(), email, password);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.replace(AFTER_AUTH_PATH);
    } catch (e: any) {
      const msg = e?.message ?? "Sign-up failed";
      setErrors((prev) => ({ ...prev, root: msg }));
      Alert.alert("Sign up", msg);
    } finally {
      setLoading(false);
    }
  };

  const social = async (provider: "facebook" | "google" | "apple") => {
    try {
      setLoading(true);
      const user = await AuthService.signInWithProvider(provider);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.replace(AFTER_AUTH_PATH);
    } catch (e: any) {
      Alert.alert("Social sign-in", e?.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpScreen
      loading={loading}
      errors={errors}
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/auth/let-you-in"))}
      onSubmit={onSubmit}
      onGoSignIn={() => router.push("/auth/sign-in")}
      onFacebook={() => social("facebook")}
      onGoogle={() => social("google")}
      onApple={() => social("apple")}
    />
  );
}
