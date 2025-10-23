import { useRouter, type Href } from "expo-router";

export function useNav() {
  const router = useRouter();
  return {
    push: (to: Href) => router.push(to),
    replace: (to: Href) => router.replace(to),
    back: () => router.back(),
  };
}