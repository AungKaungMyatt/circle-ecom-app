// import type { StateStorage } from "zustand/middleware";

// let backend: StateStorage;

// try {
//   // Try MMKV (works in a dev client with New Architecture)
//   // Using dynamic require so Expo Go doesn't crash at import time
//   const { MMKV } = require("react-native-mmkv");
//   const mmkv = new MMKV({ id: "APP_STORE" });
//   backend = {
//     setItem: (name, value) => mmkv.set(name, value),
//     getItem: (name) => mmkv.getString(name) ?? null,
//     removeItem: (name) => mmkv.delete(name),
//   };
// } catch {
//   // Fallback for Expo Go / old architecture
//   const AsyncStorage =
//     require("@react-native-async-storage/async-storage").default;
//   backend = {
//     setItem: (name, value) => AsyncStorage.setItem(name, value),
//     getItem: (name) => AsyncStorage.getItem(name),
//     removeItem: (name) => AsyncStorage.removeItem(name),
//   };
// }

// export default backend;
