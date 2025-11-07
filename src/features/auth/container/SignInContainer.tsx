import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInScreen from "@features/auth/screens/SignInScreen";
import * as AuthService from "@features/auth/services/AuthService";

const AFTER_AUTH_PATH = "/"; // or "/shop"

export default function SignInContainer() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    root?: string;
  }>({});

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    setErrors({});
    if (!email.includes("@")) return setErrors((e) => ({ ...e, email: "Enter a valid email" }));
    if (password.length < 6) return setErrors((e) => ({ ...e, password: "Minimum 6 characters" }));

    try {
      setLoading(true);
      const user = await AuthService.signInWithEmailPassword(email, password);
      // persist minimal session for the index gate
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.replace(AFTER_AUTH_PATH);
    } catch (e: any) {
      const msg = e?.message ?? "Sign-in failed";
      setErrors((prev) => ({ ...prev, root: msg }));
      Alert.alert("Sign in", msg);
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
    <SignInScreen
      loading={loading}
      errors={errors}
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/auth/let-you-in"))}
      onSubmit={onSubmit}
      onGoSignUp={() => router.push("/auth/sign-up")}
      onFacebook={() => social("facebook")}
      onGoogle={() => social("google")}
      onApple={() => social("apple")}
    //   onForgot={() => { /* TODO: router.push("/auth/forgot-password") */ }}
    />
  );
}
