import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ChevronDown,
  Circle,
  FolderOpen,
  MapPin,
  Phone,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DetailItemProps {
  label: string;
  value: string;
  className?: string;
}

function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-[11px] font-medium text-[#64748b]">{label}</p>
      <p className="text-[13px] text-[#243b6b]">{value}</p>
    </div>
  );
}

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
}

function SectionTitle({ icon: Icon, title }: SectionTitleProps) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[#284687]">
      <Icon className="h-4 w-4 stroke-[1.8]" />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

interface SecondaryMembershipCardProps {
  name: string;
  image: string;
}

function SecondaryMembershipCard({ name, image }: SecondaryMembershipCardProps) {
  return (
    <div className="flex min-w-[150px] items-center justify-between rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          alt={name}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-[#334155]">{name}</p>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-medium">
            <button className="text-[#2b56c4]">Edit</button>
            <span className="text-[#cbd5e1]">|</span>
            <button className="text-[#d45d3a]">Remove</button>
          </div>
        </div>
      </div>
      <Circle className="h-4 w-4 fill-[#fff7e8] text-[#e2a02f] stroke-[1.8]" />
    </div>
  );
}

export function MembershipRegistrationView() {
  return (
    <div className="min-h-[calc(100vh-148px)] bg-[#f6f7fb] text-[#0f172a]">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-5 lg:px-10">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[20px] font-medium text-[#2a3f7a]">New membership</h1>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#8bb3f1] px-3 text-[11px] font-medium text-[#2b56c4] hover:bg-[#eef5ff] hover:text-[#2b56c4]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm bg-white shadow-[0_0_0_1px_rgba(226,232,240,0.9)]">
          <div className="grid min-h-[760px] grid-cols-1 lg:grid-cols-[184px_1fr]">
            <aside className="border-r border-[#e6eaf1] bg-[#fbfcfe] px-5 py-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#243b6b] text-[10px] font-semibold text-white">
                    1
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold text-[#243b6b]">Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-45">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#cad3e1] text-[10px] font-semibold text-[#94a3b8]">
                    2
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-[#64748b]">Payment</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex flex-col">
              <div className="flex-1 px-4 py-7 sm:px-6 lg:px-7">
                <section className="border-b border-[#e7ebf1] pb-7">
                  <SectionTitle icon={FolderOpen} title="Personal data" />
                  <div className="grid gap-6 xl:grid-cols-[120px_1fr] xl:gap-8">
                    <div className="flex flex-col items-center pt-1">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
                        alt="Member profile"
                        width={98}
                        height={98}
                        className="h-[98px] w-[98px] rounded-full object-cover"
                      />
                      <button className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#2b56c4]">
                        <Camera className="h-3 w-3" />
                        Change picture
                      </button>
                    </div>

                    <div className="grid gap-y-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                      <DetailItem label="ID Type" value="DNI" />
                      <DetailItem label="ID Number" value="IDGTM1234567890123S0123" />
                      <DetailItem label="Membership Type" value="Diamond" />
                      <DetailItem label="Abbreviation" value="Mr." />
                      <DetailItem label="First Name" value="Nicolás" />
                      <DetailItem label="Last Name" value="Treviño" />
                      <DetailItem label="Gender" value="Male" />
                      <DetailItem label="Date of birth" value="13/09/1978" />
                      <DetailItem label="Occupation" value="Urban planner" />
                    </div>
                  </div>
                </section>

                <section className="border-b border-[#e7ebf1] py-7">
                  <SectionTitle icon={Phone} title="Contact" />
                  <div className="grid gap-y-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                    <DetailItem label="Email address *" value="Customer declined to provide email address" className="sm:col-span-2 lg:col-span-3" />
                    <DetailItem label="Mobile phone number *" value="+502 1234 5678" />
                    <DetailItem label="" value="" className="hidden lg:block" />
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-[#64748b]">&nbsp;</p>
                      <Circle className="h-4 w-4 fill-[#fff7e8] text-[#e2a02f] stroke-[1.8]" />
                    </div>
                    <DetailItem label="Home phone number *" value="+502 2345 6789" />
                    <DetailItem label="Notifications" value="By email address" />
                  </div>
                </section>

                <section className="border-b border-[#e7ebf1] py-7">
                  <SectionTitle icon={MapPin} title="Address" />
                  <div className="grid gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
                    <DetailItem label="Address *" value="Km 46.5 Salida A Ciudad Vieja" className="lg:col-span-2" />
                    <DetailItem label="Country" value="Guatemala" />
                    <DetailItem label="State" value="Antigua" />
                    <DetailItem label="City" value="Sacatepequez" />
                  </div>
                </section>

                <section className="pt-7">
                  <SectionTitle icon={UserRoundPlus} title="Secondary memberships" />
                  <div className="flex flex-wrap gap-4">
                    <SecondaryMembershipCard
                      name="Mayra Treviño"
                      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    />
                    <SecondaryMembershipCard
                      name="Pablo Treviño"
                      image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                    />
                  </div>
                </section>
              </div>

              <div className="border-t border-[#e7ebf1] px-4 py-4 sm:px-6 lg:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#91a9df] px-5 text-[12px] font-medium text-[#2b56c4] hover:bg-[#f5f8ff] hover:text-[#2b56c4]"
                      asChild
                    >
                      <Link href="/">
                        <UserRound className="h-4 w-4" />
                        Go back home
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#91a9df] px-5 text-[12px] font-medium text-[#2b56c4] hover:bg-[#f5f8ff] hover:text-[#2b56c4]"
                    >
                      Save changes
                    </Button>
                  </div>

                  <Button className="h-10 min-w-[126px] rounded-md bg-[#233b7b] px-6 text-[12px] font-medium text-white hover:bg-[#1d3268]">
                    Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-6 top-[168px] z-20 rounded-xl bg-[#203b7b] p-3 shadow-[0_8px_24px_rgba(35,59,123,0.28)]">
        <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#263f80] text-white">
          <ChevronDown className="h-5 w-5 -rotate-90" />
        </button>
      </div>
    </div>
  );
}
