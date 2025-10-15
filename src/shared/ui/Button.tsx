import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../app/providers/ThemeProvider";

export default function Button({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const t = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: t.colors.primary, borderRadius: t.radius.full },
        style,
      ]}
    >
      <Text style={[styles.txt, { color: t.colors.primaryText }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: { paddingVertical: 14, alignItems: "center" },
  txt: { fontSize: 16, fontWeight: "700" },
});
