import type { PersistStorage, StateStorage } from "zustand/middleware";

function canUseJSI() {
  return (
    typeof (globalThis as any).__turboModuleProxy !== "undefined" &&
    typeof (globalThis as any).nativeCallSyncHook === "function"
  );
}

// Returns a storage object compatible with zustand/persist
export function getZustandStorage() {
  const canUseJSI =
    typeof (globalThis as any).__turboModuleProxy !== "undefined" &&
    typeof (globalThis as any).nativeCallSyncHook === "function";

  if (canUseJSI) {
    const { MMKV } = require("react-native-mmkv");
    const mmkv = new MMKV({ id: "APP_STORE" });
    console.log("Using MMKV Storage");
    return {
      getItem: (key: string) => mmkv.getString(key) ?? null,
      setItem: (key: string, value: string) => mmkv.set(key, value),
      removeItem: (key: string) => mmkv.delete(key),
    };
  }

  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  console.log("Using AsyncStorage Fallback");
  return {
    getItem: (key: string) => AsyncStorage.getItem(key),
    setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
    removeItem: (key: string) => AsyncStorage.removeItem(key),
  };
}
