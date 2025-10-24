import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
  // design tokens
  bg: string;
  border: string;
  text: string;
};

export default function SocialButton({
  label,
  icon,
  onPress,
  disabled,
  testID,
  bg,
  border,
  text,
}: Props) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: bg,
          borderColor: border + "40",
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.left}>{icon}</View>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
      {/* spacer to balance left icon so text is centered */}
      <View style={styles.right} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 56,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  left: { width: 28, alignItems: "center", justifyContent: "center" },
  right: { width: 28 },
  label: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "600" },
});
