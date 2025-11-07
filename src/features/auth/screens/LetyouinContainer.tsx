import React, { useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import LetyouinScreen from "../../auth/screens/LetyouinScreen";
import * as AuthService from "../services/AuthService";

const AFTER_LOGIN_PATH = ""; // root index.tsx
const BACK_FALLBACK_PATH = "/onboarding"; // where to go if there's no history

export default function LetyouinContainer() {
  const router = useRouter();

  const onBack = React.useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace(BACK_FALLBACK_PATH);
  }, [router]);

  const handleSocial = React.useCallback(
    async (provider: "facebook" | "google" | "apple") => {
      try {
        await AuthService.signInWithProvider(provider);
        router.replace(AFTER_LOGIN_PATH); 
      } catch (e: any) {
        Alert.alert("Sign-in failed", e?.message ?? "Please try again.");
      }
    },
    [router]
  );

  const onPassword = useCallback(() => {
    router.push("/auth/sign-in");
  }, [router]);

  const onSignup = useCallback(() => {
    router.push("/auth/sign-up");
  }, [router]);

  return (
    <LetyouinScreen
      onBack={onBack}
      onFacebook={() => handleSocial("facebook")}
      onGoogle={() => handleSocial("google")}
      onApple={() => handleSocial("apple")}
      onPassword={onPassword}
      onSignup={onSignup}
    />
  );
}
