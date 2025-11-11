import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// (optional) devtools
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,        // 30s
      refetchOnWindowFocus: false, // Expo apps: usually better off
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function AppQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export { queryClient };