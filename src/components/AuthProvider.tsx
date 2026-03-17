"use client";

// NOTE: NextAuth SessionProvider is temporarily disabled to avoid CLIENT_FETCH_ERROR.
// Re-enable by restoring: import { SessionProvider } from "next-auth/react" and wrapping children.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
