import Link from "next/link";
import { ChevronDown, Globe, MapPin } from "lucide-react";

export function MembershipDashboardHeader() {
  return (
    <header>
      <div className="bg-[#1a2d63] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
          <Link href="/" className="text-[18px] font-semibold leading-none tracking-tight text-white">
            Price<span className="text-[#f26b2d]">Smart</span>
          </Link>

          <div className="flex items-center gap-6 text-[14px] text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] leading-none">🌎</span>
              <span>Guatemala</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[#1f49b8]" />
    </header>
  );
}
