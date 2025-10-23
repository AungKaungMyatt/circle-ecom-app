import React from "react";
import { View } from "react-native";
import { useTheme } from "../../core/providers/ThemeProvider";
export default function DotPager({ total, index }: { total: number; index: number; }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={{
          width: i === index ? 22 : 8, height: 8, borderRadius: 4,
          backgroundColor: i === index ? t.colors.text : t.colors.primaryMuted, marginHorizontal: 4
        }}/>
      ))}
    </View>
  );
}
