import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "../../core/providers/ThemeProvider";

export function H1(props: TextProps) {
  const t = useTheme();
  return (
    <RNText
      {...props}
      style={[
        { fontSize: 42, fontWeight: "800", color: t.colors.text },
        props.style,
      ]}
    />
  );
}
export function H2(props: TextProps) {
  const t = useTheme();
  return (
    <RNText
      {...props}
      style={[
        { fontSize: 18, fontWeight: "700", color: t.colors.text },
        props.style,
      ]}
    />
  );
}
export function P(props: TextProps) {
  const t = useTheme();
  return (
    <RNText
      {...props}
      style={[{ fontSize: 14, color: t.colors.textSecondary }, props.style]}
    />
  );
}
