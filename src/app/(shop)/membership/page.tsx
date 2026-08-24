import { MembershipSearch } from "@/components/features/membership";

export default function MembershipLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top header bar matching the reference image */}
      <div className="bg-[#003d7a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="text-xl font-bold tracking-tight">
              Price<span className="text-[#f5a623]">Smart</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center text-[10px]">
                  📍
                </span>
                <span>Miraflores</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🇬🇹</span>
                <span>Guatemala</span>
                <span className="text-white/70">▼</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🌐</span>
                <span>English</span>
                <span className="text-white/70">▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary blue accent bar */}
      <div className="bg-[#0052a1] h-12" />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <MembershipSearch />
      </main>
    </div>
  );
}
