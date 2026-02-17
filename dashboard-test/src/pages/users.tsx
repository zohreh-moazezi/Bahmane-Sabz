/**
 * UsersPage
 * ----------
 * Main page for managing users.
 * Uses DashboardLayout for consistent layout.
 * Fetches users via useUsers hook and displays UserTable.
 * Wrapped in withAuth HOC to protect the page.
 */

import { useState } from "react";
import { Box, Heading, Spinner, Center } from "@chakra-ui/react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { withAuth } from "@/features/auth/component/hoc/withAuth";
import { useUsers } from "@/features/users/hooks/useUsers";
import UserTable from "@/features/users/component/UserTable";

function UsersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data, isLoading } = useUsers(limit, skip);

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
        <Heading mb={6}>Users</Heading>

        <UserTable
          users={data?.users || []}
          total={data?.total || 0}
          page={page}
          setPage={setPage}
          limit={limit}
        />
      </Box>
    </DashboardLayout>
  );
}
export default withAuth(UsersPage);
