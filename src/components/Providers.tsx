"use client";

import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWalletProvider from "@/lib/AppWalletProvider";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AppWalletProvider>{children}</AppWalletProvider>
  </QueryClientProvider>
);

export default Providers;
