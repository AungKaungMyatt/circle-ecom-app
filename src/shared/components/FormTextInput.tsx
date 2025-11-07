import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TextInputProps } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useTheme } from "@core/providers/ThemeProvider";

type Props = TextInputProps & {
  label: string;
  error?: string;
  secureToggle?: boolean;
};

export default function FormTextInput({ label, error, secureTextEntry, secureToggle, ...rest }: Props) {
  const t = useTheme();
  const [secure, setSecure] = React.useState(!!secureTextEntry);

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: t.colors.text, fontSize: 14, fontWeight: "600" }}>{label}</Text>
      <View
        style={[
          styles.field,
          {
            backgroundColor: t.colors.card,
            borderColor: (error ? t.colors.danger : t.colors.textSecondary) + "40",
          },
        ]}
      >
        <TextInput
          placeholderTextColor={t.colors.textSecondary + "99"}
          style={[styles.input, { color: t.colors.text }]}
          secureTextEntry={secure}
          {...rest}
        />
        {secureToggle ? (
          <Pressable hitSlop={8} onPress={() => setSecure((v) => !v)}>
            {secure ? <Eye size={18} color={t.colors.textSecondary} /> : <EyeOff size={18} color={t.colors.textSecondary} />}
          </Pressable>
        ) : null}
      </View>
      {!!error && <Text style={{ color: t.colors.danger, fontSize: 12 }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 52,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 16 },
});
