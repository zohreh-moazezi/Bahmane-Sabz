/**
 * Login Page
 *
 * Responsibilities:
 * - Page-level wrapper for LoginForm
 * - Can contain layout or page-specific styling
 */

import { Flex } from "@chakra-ui/react";
import Loginform from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Loginform />
    </Flex>
  );
}
