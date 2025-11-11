import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/core/store/auth";
import { queryClient } from "@/core/query/react-query";

export function useSignInMutation() {
  const setToken = useAuth((s) => s.setToken);

  return useMutation({
    mutationFn: async (p: { email: string; password: string }) => {
      const res = await api.signin(p.email, p.password);
      return res; // { accessToken }
    },
    onSuccess: ({ accessToken }) => {
      setToken(accessToken);
      // Invalidate user-dependent data
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async (p: { firstName: string; lastName: string; email: string; password: string }) => {
      return api.signup(p);
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: async (p: { email: string; code: string }) => {
      return api.verifyEmail(p.email, p.code);
    },
  });
}