import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import { User } from "@/features/auth/type/auth.type";

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="gray.800" color="white" p={4}>
        Sidebar
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
