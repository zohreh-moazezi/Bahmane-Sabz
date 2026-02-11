/**
 * Custom App Component (Next.js)
 *
 * Purpose:
 * - Global configuration entry point
 *
 * Providers:
 * - ChakraProvider → global UI styling
 * - QueryClientProvider → React Query global state
 *
 * This file wraps ALL pages.
 */

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {theme} from "@/theme/index"

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
