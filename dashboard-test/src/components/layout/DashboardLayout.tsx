/**
 * DashboardLayout Component
 * ------------------------
 * Provides a consistent layout for dashboard pages including:
 * 1. Sidebar with navigation links (Dashboard, Users, Products)
 * 2. Header showing the page title and user avatar with greeting
 * 3. Main content area to render page-specific components
 *
 * Usage:
 * <DashboardLayout user={currentUser}>
 *   <YourPageContent />
 * </DashboardLayout>
 *
 * Principles applied:
 * - Separation of Concerns: Layout logic is separate from page logic
 * - Reusability: Can wrap any dashboard page
 * - DRY: Navigation buttons centralized in sidebar
 * - Clean Code: Chakra UI components used for styling and layout
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Avatar, Text, VStack, Button } from "@chakra-ui/react";
import { User } from "@/features/auth/type/auth.type";

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
}

export default function Layout({ children, user }: LayoutProps) {
  const router = useRouter();
  console.log("DASHBOARD LAYOUT LOADED");

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="gray.800" color="white" p={4}>
        <VStack align="start" spacing={4}>
          <Link href="/dashboard">
            <Button
              as="a"
              w="100%"
              cursor="pointer"
              variant={router.pathname === "/dashboard" ? "solid" : "white"}
              justifyContent="start"
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/users">
            <Button
              cursor="pointer"
              variant={router.pathname === "/users" ? "solid" : "white"}
              justifyContent="start"
            >
              Users
            </Button>
          </Link>

          <Link href="/products">
            <Button
              cursor="pointer"
              variant={router.pathname === "/products" ? "solid" : "white"}
              justifyContent="start"
            >
              Products
            </Button>
          </Link>
        </VStack>
      </Box>

      {/* Main Area */}
      <Box flex="1">
        {/* Header */}
        <Flex
          bg="white"
          p={4}
          shadow="sm"
          justify="space-between"
          align="center"
        >
          <Text fontSize="lg" fontWeight="bold">
            Dashboard
          </Text>
          {user && (
            <Flex align="center" gap={3}>
              <Text>HI {user.firstName}</Text>
              <Avatar size="sm" src={user.image} name={user.username} />
            </Flex>
          )}
        </Flex>

        {/* Page Content */}
        <Box p={6} bg="gray.50" minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
