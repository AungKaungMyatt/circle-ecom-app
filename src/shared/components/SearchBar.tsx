import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../core/providers/ThemeProvider";

export default function SearchBar({
  placeholder,
  rightIcon,
}: {
  placeholder: string;
  rightIcon?: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: t.colors.card,
          borderColor: t.colors.textSecondary + "22",
        },
      ]}
    >
      <Feather name="search" size={18} color={t.colors.textSecondary} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={t.colors.textSecondary + "88"}
        style={[styles.input, { color: t.colors.text }]}
      />
      {rightIcon}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    height: 44,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: { flex: 1, fontSize: 14 },
});
