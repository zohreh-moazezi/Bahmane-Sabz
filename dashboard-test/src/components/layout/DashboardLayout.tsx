import { Box, Flex } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w="250px"
        bg="gray.800"
        color="white"
        p={4}
      >
        Sidebar
      </Box>

      {/* Main Area */}
      <Box flex="1">
        {/* Header */}
        <Box bg="white" p={4} shadow="sm">
          Header
        </Box>

        {/* Page Content */}
        <Box p={6} bg="gray.50" minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
