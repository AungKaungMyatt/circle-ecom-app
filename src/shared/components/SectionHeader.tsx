import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "@core/providers/ThemeProvider";

export default function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <Text style={{ color: t.colors.text, fontSize: 18, fontWeight: "800" }}>{title}</Text>
      <Pressable hitSlop={6} onPress={onSeeAll}>
        <Text style={{ color: t.colors.textSecondary, fontWeight: "600" }}>See All</Text>
      </Pressable>
    </View>
  );
}
