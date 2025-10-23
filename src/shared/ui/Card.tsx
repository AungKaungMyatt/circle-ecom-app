import React, { PropsWithChildren } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../core/providers/ThemeProvider";
export default function Card({
  children,
  style,
}: PropsWithChildren<{ style?: ViewStyle }>) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.colors.card, borderRadius: t.radius.xl },
        style,
      ]}
    >
      {children}
    </View>
  );
}
const styles = StyleSheet.create({ card: { padding: 20 } });
