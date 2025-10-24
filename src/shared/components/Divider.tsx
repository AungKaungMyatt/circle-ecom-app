import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Divider({
  label,
  color,
}: {
  label: string;
  color: string; // line + text color
}) {
  const line = color + "55";
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: line }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
      <View style={[styles.line, { backgroundColor: line }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginVertical: 24,
  },
  line: { height: StyleSheet.hairlineWidth, flex: 1, borderRadius: 1 },
  text: { fontSize: 14, fontWeight: "600", textTransform: "lowercase" },
});
