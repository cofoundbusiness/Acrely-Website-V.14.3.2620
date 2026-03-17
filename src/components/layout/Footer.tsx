import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-secondary dark:bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none tracking-tighter">A</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Acrely</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs mt-2">
              The modern commercial real estate discovery platform. Find your next investment, warehouse, or retail space.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/search?type=office"      className="hover:text-white transition">Offices</Link></li>
              <li><Link href="/search?type=retail"      className="hover:text-white transition">Retail</Link></li>
              <li><Link href="/search?type=industrial"  className="hover:text-white transition">Industrial</Link></li>
              <li><Link href="/search?type=multifamily" className="hover:text-white transition">Multifamily</Link></li>
              <li><Link href="/search?type=land"        className="hover:text-white transition">Land</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/about"              className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/insights"           className="hover:text-white transition">Market Insights</Link></li>
              <li><Link href="/contact"            className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/careers"            className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/dashboard"          className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/dashboard/settings" className="hover:text-white transition">Settings</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">List your property</h3>
            <p className="text-sm text-slate-400 mb-4">
              Reach thousands of investors and commercial tenants daily.
            </p>
            <Link href="/post-property">
              <Button variant="accent" className="w-full">Start Listing</Button>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Acrely. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
