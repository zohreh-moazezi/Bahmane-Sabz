import { Heading, Text, Box, Flex, Image } from "@chakra-ui/react";

/**
 * RecentProducts Component
 * ------------------------
 * Displays a list of recently added products.
 * Props:
 *  - products: array of product objects fetched from API
 * Features:
 *  - Shows thumbnail, title, and price
 *  - Styled with Chakra UI
 */ 

export default function RecentProducts({ products }: { products: any[] }) {
  return (
    <Box bg="white" p={6} shadow="md" rounded="lg">
      <Heading size="md" mb={4}>
        Recant Products
      </Heading>
      {products.map((product) => (
        <Flex key={product.id} align="center" gap={4} mb={3}>
          <Image
            src={product.thumbnail}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
          />
          <Box>
            <Text fontWeight="medium">{product.title}</Text>
            <Text fontSize="sm" color="gray.500">
              ${product.price}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}
