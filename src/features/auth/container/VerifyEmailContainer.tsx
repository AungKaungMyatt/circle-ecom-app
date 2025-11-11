import React from "react";
import { Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import VerifyEmailScreen from "@features/auth/screens/VerifyEmailScreen";
import { useVerifyEmailMutation } from "@/features/auth/api/useAuthMutation";
import { api } from "@/lib/api"; // only if you wire resend

export default function VerifyEmailContainer() {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const email = (emailParam ?? "").trim();

  React.useEffect(() => {
    if (!email) router.replace("/auth/signin");
  }, [email]);

  const verify = useVerifyEmailMutation();

  const [errors, setErrors] = React.useState<{ code?: string; root?: string }>(
    {}
  );

  const onSubmit = (code: string) => {
    setErrors({});
    const safe = (code ?? "").trim();
    if (safe.length < 4) {
      setErrors({ code: "Enter the 4–6 digit code" });
      return;
    }

    verify.mutate(
      { email, code: safe },
      {
        onSuccess: () => {
          Alert.alert(
            "Verified",
            "Your email has been verified. Please sign in."
          );
          router.replace({ pathname: "/auth/signin", params: { email } });
        },
        onError: (err: any) => {
          const msg = String(err?.message ?? "Verification failed");
          setErrors({ root: msg });
          Alert.alert("Verify email", msg);
        },
      }
    );
  };

  const onResend = async () => {
    try {
      // If your API has a resend endpoint:
      // await api.resendVerification(email);
      Alert.alert(
        "Check your inbox",
        "A new verification code was sent (demo)."
      );
    } catch (e: any) {
      Alert.alert(
        "Resend failed",
        e?.message ?? "Could not resend verification email."
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Verify email" }} />
      <VerifyEmailScreen
        loading={verify.isPending}
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
