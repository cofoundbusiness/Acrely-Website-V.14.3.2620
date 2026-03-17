"use client";

// NOTE: useSession (NextAuth) temporarily disabled to prevent CLIENT_FETCH_ERROR.
// Restore by re-importing useSession from "next-auth/react" and removing the stub below.
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  // --- Auth stub: replace with useSession() + role checks when NextAuth is configured ---
  // const { data: session, status } = useSession();
  // --------------------------------------------------------------------------------------

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-73px)] py-20 flex items-start justify-center">
      <div className="bg-white rounded-2xl border border-border shadow-sm p-12 text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-secondary mb-3">Admin Dashboard</h1>
        <p className="text-slate-500 leading-relaxed mb-6">
          Admin access requires authentication. This panel will be available once sign-in and role management is fully configured.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
