/**
 * withAuth HOC (Higher-Order Component)
 *
 * Purpose:
 * - Protect Next.js pages from unauthenticated access
 * - Redirect users to login if they are not authenticated
 *
 * Responsibilities:
 * - Check if accessToken exists
 * - Redirect to /login if not
 * - Wrap protected page component and render only for authenticated users
 *
 * Best Practices Applied:
 * - Separation of concerns: authentication logic is separate from UI
 * - Reusable: can wrap any page
 * - Follows SOLID principles (Single Responsibility)
 *
 * Usage:
 *
 * ```ts
 * export default withAuth(DashboardPage);
 * ```
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import { tokenStorage } from "@/lib/storage";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const token = tokenStorage.getToken();

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token, router]);
    if (!token) return null;

    return <WrappedComponent {...props} />;
  };
  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
}
