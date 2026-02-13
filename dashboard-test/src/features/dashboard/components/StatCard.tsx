import { Box, Text } from "@chakra-ui/react";

/**
 * StatCard Component
 * ------------------
 * Displays a single statistic card (e.g., total users, total products)
 * Props:
 *  - title: title of the stat
 *  - value: numeric value (optional)
 * Features:
 *  - Styled with Chakra UI
 *  - Displays '...' if value is undefined (loading state)
 */

interface StateCardProps {
  title: string;
  value?: number;
}

export default function StatCard({ title, value }: StateCardProps) {
  return (
    <Box bg="white" p={6} shadow="md" rounded="lg">
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {value ?? "..."}
      </Text>
    </Box>
  );
}
