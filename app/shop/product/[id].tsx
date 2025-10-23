import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useTheme } from "../../../src/core/providers/ThemeProvider";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = useTheme();
  return (
    <View style={{ flex:1, backgroundColor:t.colors.bg, padding:16 }}>
      <Text style={{ color:t.colors.text, fontSize:24, fontWeight:"700" }}>
        Product #{id}
      </Text>
    </View>
  );
}
