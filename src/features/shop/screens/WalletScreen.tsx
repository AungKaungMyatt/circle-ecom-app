import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@core/providers/ThemeProvider";

export default function WalletScreen() {
  const t = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.colors.bg }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: t.colors.text }]}>My Wallet</Text>
        <Text style={[styles.balanceLabel, { color: t.colors.textSecondary }]}>
          Available Balance
        </Text>
        <Text style={[styles.balance, { color: t.colors.text }]}>$0.00</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: t.colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: t.colors.onPrimary }]}>
            Add Funds
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  balanceLabel: { fontSize: 16, marginBottom: 4 },
  balance: { fontSize: 28, fontWeight: "800", marginBottom: 32 },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
