/**
 * Chakra UI Theme Configuration
 *
 * Responsibilities:
 * - Define global design tokens
 * - Colors
 * - Fonts
 * - Component styles
 *
 * Used globally via ChakraProvider
 */

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      500: "#3182ce",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});
