import React from "react";
import { Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import VerifyEmailScreen from "@features/auth/screens/VerifyEmailScreen";
import { api } from "@/lib/api";

/**
 * This container expects VerifyEmailScreen to accept:
 *  - loading: boolean
 *  - email: string
 *  - errors: { code?: string; root?: string }
 *  - onSubmit: (code: string) => void
 *  - onBack: () => void
 *  - onResend?: () => void  (optional; shows an alert for now)
 *
 * If your screen uses different prop names, adjust below accordingly.
 */
export default function VerifyEmailContainer() {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();

  // if no email in params, kick back to Sign In
  const email = (emailParam ?? "").trim();
  React.useEffect(() => {
    if (!email) router.replace("/auth/signin");
  }, [email]);

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ code?: string; root?: string }>({});

  const onSubmit = async (code: string) => {
    setErrors({});
    const safe = (code ?? "").trim();
    if (safe.length < 4) {
      setErrors({ code: "Enter the 4–6 digit code" });
      return;
    }
    try {
      setLoading(true);
      await api.verifyEmail(email, safe);
      Alert.alert("Verified", "Your email has been verified. Please sign in.");
      // Go to Sign In, prefill email via params (your SignInScreen can read it)
      router.replace({ pathname: "/auth/signin", params: { email } });
    } catch (e: any) {
      const msg = e?.message ?? "Verification failed";
      setErrors({ root: msg });
      Alert.alert("Verify email", msg);
    } finally {
      setLoading(false);
    }
  };

  // Optional: you can wire a real resend endpoint later
  const onResend = async () => {
    Alert.alert("Check your inbox", "A new verification code was sent (demo).");
    // If your API supports it, call something like:
    // await api.resendVerification(email);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Verify email" }} />
      <VerifyEmailScreen
        loading={loading}
        email={email}
        errors={errors}
        onSubmit={onSubmit}
        onBack={() =>
          router.canGoBack() ? router.back() : router.replace("/auth/signin")
        }
        onResend={onResend}
      />
    </>
  );
}
