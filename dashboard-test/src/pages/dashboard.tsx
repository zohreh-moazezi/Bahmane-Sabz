/**
 * Dashboard Page
 *
 * Purpose:
 * - Represents a protected area of the application.
 * - Accessible only to authenticated users.
 *
 * Responsibilities:
 * - Render dashboard content
 * - Use withAuth HOC to prevent unauthorized access
 * - Fetch authenticated user data using React Query
 *
 * Architecture Notes:
 * - Authentication logic is NOT handled here.
 * - Route protection is delegated to withAuth HOC.
 * - Data fetching is done via axiosInstance (which automatically
 *   attaches accessToken and handles token refresh).
 *
 * This separation keeps the page clean and focused on UI.
 
* Main admin dashboard page.
 * Features:
 *  - Shows top-level stats (users, products)
 *  - Displays recent users and products
 *  - Uses DashboardLayout for sidebar/header
 *  - Protected route using withAuth HOC
 
*/

import { withAuth } from "@/features/auth/component/hoc/withAuth";
import { useAuthUser } from "@/features/auth/hooks/useAuthUser";
import { useDashboardStates } from "@/features/dashboard/hooks/useDashboardStates";
import RecentProducts from "@/features/dashboard/components/RecentProducts";
import RecantUsers from "@/features/dashboard/components/RecentUsers";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/StatCard";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

function Dashboard() {
  const { usersQuery, productsQuery } = useDashboardStates();
  const { data: user, isLoading, error } = useAuthUser();
  const stats = [
    { title: "Users", value: usersQuery.data?.total },
    { title: "Products", value: productsQuery.data?.total },
  ];

  if (isLoading) return <Heading>Loading...</Heading>;
  if (error) return <Text color="red.500">Error Loading User</Text>;

  return (
    <DashboardLayout user={user}>
      <Heading size="lg" mb={4}>
        Welcome to your Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </SimpleGrid>
      <RecantUsers users={usersQuery.data?.users || []} />
      <RecentProducts products={productsQuery.data?.products || []} />
    </DashboardLayout>
  );
}
export default withAuth(Dashboard);
