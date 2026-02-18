// Configures the same system for "products":

// entityName = "products"

// columns = product fields

// Pages act as:
// Configuration layer, not logic layer

import { useState } from "react";
import { Box, Heading, Spinner, Center } from "@chakra-ui/react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { withAuth } from "@/features/auth/component/hoc/withAuth";
import { useEntities } from "@/features/entities/hooks/useEntities";
import EntityTable from "@/features/entities/components/EntityTable";
import { Product } from "@/features/entities/types";

function UsersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data, isLoading } = useEntities<Product>("products", limit, skip);

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner />
      </Center>
    );
  }

  return (
    <DashboardLayout>
      <Box>
        <Heading mb={6}>Products</Heading>

        <EntityTable
          entityName="products"
          items={data?.items || []}
          total={data?.total || 0}
          page={page}
          setPage={setPage}
          limit={limit}
          columns={[
            { key: "image", label: "Image" },
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "brand", label: "Brand" },
            { key: "price", label: "Price" },
          ]}
        />
      </Box>
    </DashboardLayout>
  );
}
export default withAuth(UsersPage);
