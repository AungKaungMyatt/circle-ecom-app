export async function signInWithProvider(
  provider: "facebook" | "google" | "apple"
) {
  // Swap these with your real SDK integrations:
  switch (provider) {
    case "google":
      // e.g. with expo-auth-session or Firebase Auth
      return fakeDelay("google-user");
    case "facebook":
      return fakeDelay("facebook-user");
    case "apple":
      return fakeDelay("apple-user");
  }
}

function fakeDelay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
