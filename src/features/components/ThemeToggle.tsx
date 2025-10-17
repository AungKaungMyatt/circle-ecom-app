import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../app/providers/ThemeProvider";
import { useThemeStore, ThemeMode } from "../../app/store/useThemeStore";

export default function ThemeToggle() {
  const t = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const modes: ThemeMode[] = ["light", "dark", "system"];

  return (
    <View style={{ gap: 12, padding: 16, backgroundColor: t.colors.card }}>
      <Text style={{ color: t.colors.text, fontWeight: "700" }}>Theme</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {modes.map((m) => (
          <Pressable key={m} onPress={() => setMode(m)}>
            <Text style={{ color: mode === m ? t.colors.text : t.colors.sub }}>
              {m.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
