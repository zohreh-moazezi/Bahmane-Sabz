import { Box, Heading, Flex, Avatar, Text, Badge } from "@chakra-ui/react";

/**
 * RecentUsers Component
 * ---------------------
 * Displays a list of recently added users.
 * Props:
 *  - users: array of user objects fetched from API
 * Features:
 *  - Shows avatar, full name, email, and gender badge
 *  - Styled with Chakra UI
 */

export default function RecantUsers({ users }: { users: any[] }) {
  return (
    <Box bg="white" p={6} shadow="md" rounded="lg" mb={8}>
      <Heading size="md" mb={4}>
        Recent Users
      </Heading>

      {users.map((user) => (
        <Flex key={user.id} justify="space-between" mb={3}>
          <Flex align="center" gap={3}>
            <Avatar size="sm" src={user.image} />
            <Box>
              <Text fontWeight="medium">
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Box>
          </Flex>
          <Badge display="flex" justifyContent="center" alignItems="center">{user.gender}</Badge>
        </Flex>
      ))}
    </Box>
  );
}
