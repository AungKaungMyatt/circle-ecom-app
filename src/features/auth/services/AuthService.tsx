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

export async function signInWithEmailPassword(email: string, password: string) {
  await delay(500);
  if (email === "fail@example.com") throw new Error("Invalid credentials");
  return { uid: "user-123", email };
}

export async function signUpWithEmail(name: string, email: string, password: string) {
  await delay(600);
  if (email.endsWith("@blocked.com")) throw new Error("Email domain not allowed");
  return { uid: "user-456", email, name };
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));