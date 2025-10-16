import { MMKV, Mode } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

// Create a single MMKV instance for the app
export const mmkv = new MMKV({ id: "APP_STORE", mode: Mode.MULTI_PROCESS });

const mmkvStorage: StateStorage = {
  setItem: (name, value) => mmkv.set(name, value),
  getItem: (name) => mmkv.getString(name) ?? null,
  removeItem: (name) => mmkv.delete(name),
};

export default mmkvStorage;
