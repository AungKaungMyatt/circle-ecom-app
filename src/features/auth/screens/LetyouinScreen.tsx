import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../../core/providers/ThemeProvider";
import { ArrowBigLeft } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  onBack?: (e: GestureResponderEvent) => void;
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
}: Props) {
  const t = useTheme();

  return (
    <SafeAreaView
      style={[styles.flex, { backgroundColor: t.colors.bg }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
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
      <Text style={[styles.title, { color: t.colors.text }]}>Let’s you in</Text>

      {/* Social buttons */}
      <View style={styles.stack16}>
        <SocialButton
          label="Continue with Facebook"
          icon={<FontAwesome name="facebook" size={20} color="#1877F2" />}
          onPress={onFacebook}
          themeCard={t.colors.card}
          themeText={t.colors.text}
          themeBorder={t.colors.textSecondary}
        />
        <SocialButton
          label="Continue with Google"
          icon={<FontAwesome name="google" size={20} color="#DB4437" />}
          onPress={onGoogle}
          themeCard={t.colors.card}
          themeText={t.colors.text}
          themeBorder={t.colors.textSecondary}
        />
        <SocialButton
          label="Continue with Apple"
          icon={<FontAwesome name="apple" size={20} color={t.colors.text} />}
          onPress={onApple}
          themeCard={t.colors.card}
          themeText={t.colors.text}
          themeBorder={t.colors.textSecondary}
        />
      </View>

      {/* OR divider */}
      <Divider label="or" lineColor={t.colors.textSecondary} textColor={t.colors.textSecondary} />

      {/* Password button */}
      <Pressable
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
        <Pressable onPress={onSignup}>
          <Text style={[styles.footerLink, { color: t.colors.text }]}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SocialButton({
  label,
  icon,
  onPress,
  themeCard,
  themeText,
  themeBorder,
}: {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  themeCard: string;
  themeText: string;
  themeBorder: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.socialBtn,
        {
          backgroundColor: themeCard,
          borderColor: themeBorder + "40",
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.socialLeft}>{icon}</View>
      <Text style={[styles.socialLabel, { color: themeText }]}>{label}</Text>
      <View style={styles.socialRight} />
    </Pressable>
  );
}

function Divider({
  label,
  lineColor,
  textColor,
}: {
  label: string;
  lineColor: string;
  textColor: string;
}) {
  return (
    <View style={styles.dividerRow}>
      <View
        style={[styles.dividerLine, { backgroundColor: lineColor + "55" }]}
      />
      <Text style={[styles.dividerText, { color: textColor }]}>{label}</Text>
      <View
        style={[styles.dividerLine, { backgroundColor: lineColor + "55" }]}
      />
    </View>
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
  socialBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  socialLeft: { width: 28, alignItems: "center", justifyContent: "center" },
  socialRight: { width: 28 }, // balances left icon for centered text
  socialLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginVertical: 24,
  },
  dividerLine: { height: StyleSheet.hairlineWidth, flex: 1, borderRadius: 1 },
  dividerText: { fontSize: 14, fontWeight: "600", textTransform: "lowercase" },
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
