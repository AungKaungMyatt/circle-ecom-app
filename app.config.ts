import { ExpoConfig } from "expo/config";

export default (): ExpoConfig => ({
  ...require("./app.json").expo,
  extra: {
    ...require("./app.json").expo.extra,
    EXPO_PUBLIC_API_BASE_URL:
      process.env.EXPO_PUBLIC_API_BASE_URL ??
      "https://online-shop-production-db95.up.railway.app",
  },
});
