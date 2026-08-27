import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  CircleAlert,
  Folder,
  House,
  IdCard,
  MapPinned,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DetailItem = {
  label: string;
  value: string;
};

type MemberChip = {
  id: string;
  name: string;
  image: string;
};

type SectionProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  className?: string;
};

function RegistrationSection({
  icon: Icon,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("border-t border-[#d9dce3] pt-5", className)}>
      <div className="mb-5 flex items-center gap-2 text-[15px] font-medium text-[#274385]">
        <Icon className="h-4 w-4" />
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DetailGrid({ items }: { items: DetailItem[] }) {
  return (
    <div className="grid flex-1 grid-cols-3 gap-x-10 gap-y-8 text-[12px] text-[#2d3f66]">
      {items.map((item) => (
        <div key={item.label}>
          <p className="mb-2 text-[11px] text-[#54627f]">{item.label}</p>
          <p className="font-medium text-[#283a63]">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function SecondaryMemberCard({ member }: { member: MemberChip }) {
  return (
    <div className="flex min-w-[150px] items-center gap-3 rounded-lg border border-[#e0e3ea] bg-white px-3 py-3 shadow-[0_1px_1px_rgba(16,24,40,0.04)]">
      <Image
        src={member.image}
        alt={member.name}
        width={26}
        height={26}
        className="h-[26px] w-[26px] rounded-full object-cover"
      />
      <div className="min-w-0 flex-1 text-[11px] leading-tight">
        <p className="truncate font-semibold text-[#33415c]">{member.name}</p>
        <div className="mt-1 flex gap-2 text-[#2d65c4]">
          <button type="button">Edit</button>
          <span className="text-[#a5afc3]">|</span>
          <button type="button">Remove</button>
        </div>
      </div>
      <CircleAlert className="h-4 w-4 text-[#f2a019]" />
    </div>
  );
}

const personalData: DetailItem[] = [
  { label: "ID Type", value: "DNI" },
  { label: "ID Number", value: "IDGTM1234567890123S0123" },
  { label: "Membership Type", value: "Diamond" },
  { label: "Abbreviation", value: "Mr." },
  { label: "First Name", value: "Nicolás" },
  { label: "Last Name", value: "Treviño" },
  { label: "Gender", value: "Male" },
  { label: "Date of birth", value: "13/09/1978" },
  { label: "Occupation", value: "Urban planner" },
];

const contactData: DetailItem[] = [
  { label: "Email address *", value: "Customer declined to provide email address" },
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "Mobile phone number *", value: "+502 1234 5678" },
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "Home phone number *", value: "+502 2345 6789" },
  { label: "Notifications", value: "By email address" },
  { label: "", value: "" },
];

const addressData: DetailItem[] = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers: MemberChip[] = [
  {
    id: "1",
    name: "Mayra Treviño",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "2",
    name: "Pablo Treviño",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  },
];

const steps = [
  { id: 1, label: "Membership data", active: true },
  { id: 2, label: "Payment", active: false },
];

export function NewMembershipRegistration() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#24375b]">
      <header>
        <div className="bg-[#172f73] text-white">
          <div className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-between px-7 text-[12px]">
            <div className="text-[24px] font-bold tracking-tight">
              Price<span className="text-[#f39f1c]">Smart</span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-white/95">
              <span>Miraflores</span>
              <span>Guatemala</span>
              <span>English</span>
            </div>
          </div>
        </div>
        <div className="h-[26px] bg-[#1e49a6]" />
      </header>

      <main className="mx-auto max-w-[1280px] px-10 pb-0 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-[18px] font-medium text-[#2a437c]">New membership</h1>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#86a6e8] px-4 text-[11px] font-medium text-[#2e67c7] hover:bg-[#eff4ff] hover:text-[#2e67c7]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="rounded-none border border-[#e2e5ec] bg-[#f7f7f8] shadow-none">
          <div className="grid min-h-[690px] grid-cols-[152px_1fr]">
            <aside className="border-r border-[#e0e4eb] px-5 py-5">
              <div className="space-y-5 text-[11px] text-[#909ab1]">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-semibold",
                        step.active
                          ? "bg-[#233f7d] text-white"
                          : "border border-[#d6dae3] bg-white text-[#b1b8c7]"
                      )}
                    >
                      {step.id}
                    </div>
                    <span className={step.active ? "font-semibold text-[#233f7d]" : "text-[#b6bcc9]"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="flex flex-col bg-[#fbfbfc] px-4 pt-4">
              <div className="flex-1 px-3 pb-6">
                <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#274385]">
                  <Folder className="h-4 w-4" />
                  <span>Personal data</span>
                </div>

                <section className="grid grid-cols-[92px_1fr] gap-5 pb-8">
                  <div className="pt-1 text-center text-[10px] text-[#2f67c4]">
                    <div className="mx-auto mb-3 h-[92px] w-[92px] overflow-hidden rounded-full bg-[#d7d7d7]">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
                        alt="Member"
                        width={92}
                        height={92}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button type="button" className="font-medium text-[#2f67c4]">
                      Change picture
                    </button>
                  </div>
                  <DetailGrid items={personalData} />
                </section>

                <RegistrationSection icon={Phone} title="Contact">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-8 text-[12px] text-[#2d3f66]">
                    <div className="col-span-3">
                      <p className="mb-2 text-[11px] text-[#54627f]">Email address *</p>
                      <p className="font-medium text-[#283a63]">Customer declined to provide email address</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] text-[#54627f]">Mobile phone number *</p>
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-[#283a63]">+502 1234 5678</p>
                        <CircleAlert className="h-4 w-4 text-[#f2a019]" />
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] text-[#54627f]">Home phone number *</p>
                      <p className="font-medium text-[#283a63]">+502 2345 6789</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] text-[#54627f]">Notifications</p>
                      <p className="font-medium text-[#283a63]">By email address</p>
                    </div>
                  </div>
                </RegistrationSection>

                <RegistrationSection icon={MapPinned} title="Address">
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-10 gap-y-6 text-[12px] text-[#2d3f66]">
                    {addressData.map((item) => (
                      <div key={item.label}>
                        <p className="mb-2 text-[11px] text-[#54627f]">{item.label}</p>
                        <p className="font-medium text-[#283a63]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </RegistrationSection>

                <RegistrationSection icon={UserRound} title="Secondary memberships">
                  <div className="flex gap-4">
                    {secondaryMembers.map((member) => (
                      <SecondaryMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </RegistrationSection>
              </div>

              <div className="border-t border-[#d9dce3] bg-[#fbfbfc] px-3 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#85a5e6] px-5 text-[12px] font-medium text-[#3269c7] hover:bg-[#eff4ff] hover:text-[#3269c7]"
                      asChild
                    >
                      <Link href="#">
                        <House className="h-4 w-4" />
                        Go back home
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#85a5e6] px-5 text-[12px] font-medium text-[#3269c7] hover:bg-[#eff4ff] hover:text-[#3269c7]"
                    >
                      Save changes
                    </Button>
                  </div>
                  <Button className="h-9 rounded-md bg-[#253b80] px-10 text-[12px] font-semibold text-white hover:bg-[#1d316d]">
                    Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed right-4 top-[118px] rounded-xl bg-[#1d3779] p-2 shadow-lg">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#223d86] text-white"
            aria-label="Utility action"
          >
            <IdCard className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
