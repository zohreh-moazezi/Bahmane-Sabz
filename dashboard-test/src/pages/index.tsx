import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Root page
 * This page immediately redirects user to /login
 * because login is the entry point of the app.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
