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
 */

import { withAuth } from "@/features/auth/hoc/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heading } from "@chakra-ui/react";

function Dashboard() {
  return (
    <DashboardLayout>
      <Heading size="lg" mb={4}>
        Dashboard
      </Heading>
    </DashboardLayout>
  );
}
export default withAuth(Dashboard);
