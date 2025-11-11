import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import SignUpScreen from "@features/auth/screens/SignUpScreen";
import { useSignUpMutation } from "@/features/auth/api/useAuthMutation";

const AFTER_SIGNUP_PATH = "/auth/verify-email";

export default function SignUpContainer() {
  const router = useRouter();
  const signup = useSignUpMutation();

  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string; root?: string }>({});

  const goVerify = (email: string) =>
    router.replace({ pathname: AFTER_SIGNUP_PATH, params: { email } });

  const onSubmit = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setErrors({});
    if (name.trim().length < 2) return setErrors((e) => ({ ...e, name: "Enter your full name" }));
    if (!email.includes("@")) return setErrors((e) => ({ ...e, email: "Enter a valid email" }));
    if (password.length < 8) return setErrors((e) => ({ ...e, password: "At least 8 characters" }));

    signup.mutate(
      { firstName: name.trim(), lastName: "", email: email.trim(), password },
      {
        onSuccess: () => goVerify(email.trim()),
        onError: (err: any) => {
          const msg = String(err?.message ?? "Sign-up failed");

          // Already registered -> verify
          if (/already/i.test(msg) || /exist/i.test(msg)) {
            Alert.alert("Sign up", "Email already registered. Please verify your email.");
            goVerify(email.trim());
            return;
          }

          // Network hiccup -> offer Verify as a fallback
          if (/network error/i.test(msg)) {
            Alert.alert(
              "Network hiccup",
              "We couldn't confirm the response, but your account may have been created.\n\nIf you received a verification email, continue to Verify. Otherwise, Retry.",
              [
                { text: "Retry", style: "cancel" },
                { text: "Verify", onPress: () => goVerify(email.trim()) },
              ]
            );
            return;
          }

          setErrors((prev) => ({ ...prev, root: msg }));
          Alert.alert("Sign up", msg);
        },
      }
    );
  };

  const social = async (_p: "facebook" | "google" | "apple") =>
    Alert.alert("Coming soon", "Social sign-in not implemented yet.");

  return (
    <SignUpScreen
      loading={signup.isPending}
      errors={errors}
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/auth/signin"))}
      onSubmit={onSubmit}
      onGoSignIn={() => router.push("/auth/signin")}
      onFacebook={() => social("facebook")}
      onGoogle={() => social("google")}
      onApple={() => social("apple")}
    />
  );
}
