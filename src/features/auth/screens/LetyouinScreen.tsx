import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { ArrowBigLeft } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GoogleIcon } from "../../../assets/icons/index";
import { useTheme } from "../../../core/providers/ThemeProvider";
import { Divider, SocialButton } from "src/shared/components";

export type LetyouinProps = {
  onBack?: () => void;
  onFacebook?: () => void;
  onGoogle?: () => void;
  onApple?: () => void;
  onPassword?: () => void;
  onSignup?: () => void;
};

export default function LetyouinScreen({
  onBack,
  onFacebook,
  onGoogle,
  onApple,
  onPassword,
  onSignup,
}: LetyouinProps) {
  const t = useTheme();

  // centralize mapping so there’s no repeated JSX
  const socials = useMemo(
    () => [
      {
        key: "facebook",
        label: "Continue with Facebook",
        icon: <FontAwesome name="facebook" size={20} color="#1877F2" />,
        onPress: onFacebook,
        testID: "btn-facebook",
      },
      {
        key: "google",
        label: "Continue with Google",
        icon: <GoogleIcon width={20} height={20} />,
        onPress: onGoogle,
        testID: "btn-google",
      },
      {
        key: "apple",
        label: "Continue with Apple",
        icon: <FontAwesome name="apple" size={20} color={t.colors.text} />,
        onPress: onApple,
        testID: "btn-apple",
      },
    ],
    [onFacebook, onGoogle, onApple, t.colors.text]
  );

  return (
    <SafeAreaView
      style={[styles.flex, { backgroundColor: t.colors.bg }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          testID="btn-back"
        >
          <ArrowBigLeft size={22} color={t.colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationWrap}>
        <Image
          source={require("../../onboarding/assets/Images/ob6.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text
        style={[
          styles.title,
          { color: t.colors.text },
          // if you have typography tokens, uncomment:
          // t.typography.displayMd.weightExtraBold,
        ]}
      >
        Let’s you in
      </Text>

      {/* Social buttons */}
      <View style={styles.stack16}>
        {socials.map(({ key, label, icon, onPress, testID }) => (
          <SocialButton
            key={key}
            label={label}
            icon={icon}
            onPress={onPress}
            testID={testID}
            bg={t.colors.card}
            border={t.colors.textSecondary}
            text={t.colors.text}
          />
        ))}
      </View>

      {/* OR divider */}
      <Divider label="or" color={t.colors.textSecondary} />

      {/* Password CTA */}
      <Pressable
        testID="btn-password"
        accessibilityRole="button"
        accessibilityLabel="Sign in with password"
        onPress={onPassword}
        style={[
          styles.cta,
          { backgroundColor: t.dark ? t.colors.text : "#111" },
          styles.shadow,
        ]}
      >
        <Text
          style={[styles.ctaText, { color: t.dark ? t.colors.bg : "#fff" }]}
        >
          Sign in with password
        </Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: t.colors.textSecondary }]}>
          Don’t have an account?{" "}
        </Text>
        <Pressable testID="btn-signup" onPress={onSignup} hitSlop={6}>
          <Text style={[styles.footerLink, { color: t.colors.text }]}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  illustrationWrap: { alignItems: "center", marginTop: 8 },
  illustration: { width: 220, height: 220 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
  },
  stack16: { gap: 16, paddingHorizontal: 20, marginTop: 16 },
  cta: {
    marginHorizontal: 20,
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { fontSize: 16, fontWeight: "700" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 20,
  },
  footerText: { fontSize: 13 },
  footerLink: {
    fontSize: 13,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
