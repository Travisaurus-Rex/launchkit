import type { ReactNode } from "react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8] text-stone-950">
      <SiteHeader />

      <div className="flex-1">{children}</div>

      <SiteFooter />
    </div>
  );
}
