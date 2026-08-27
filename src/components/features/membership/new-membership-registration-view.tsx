import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  Camera,
  ChevronDown,
  CreditCard,
  FolderOpen,
  Globe,
  Home,
  MapPin,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const personalFields = [
  [
    { label: "ID Type", value: "DNI" },
    { label: "ID Number", value: "IDGTM1234567890123S0123" },
    { label: "Membership Type", value: "Diamond" },
  ],
  [
    { label: "Abbreviation", value: "Mr." },
    { label: "First Name", value: "Nicolás" },
    { label: "Last Name", value: "Treviño" },
  ],
  [
    { label: "Gender", value: "Male" },
    { label: "Date of birth", value: "13/09/1978" },
    { label: "Occupation", value: "Urban planner" },
  ],
];

const contactRows = [
  {
    label: "Email address *",
    value: "Customer declined to provide email address",
    full: true,
  },
  {
    label: "Mobile phone number *",
    value: "+502 1234 5678",
    alert: true,
  },
  {
    label: "Home phone number *",
    value: "+502 2345 6789",
  },
  {
    label: "Notifications",
    value: "By email address",
  },
];

const addressFields = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers = [
  { name: "Mayra Treviño" },
  { name: "Pablo Treviño" },
];

function SectionTitle({ icon: Icon, title }: { icon: typeof FolderOpen; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[14px] font-medium text-[#243b76]">
      <Icon className="h-4 w-4" strokeWidth={1.9} />
      <h2>{title}</h2>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium uppercase tracking-[0.02em] text-[#6c738f]">{label}</p>
      <p className="text-[13px] text-[#33406b]">{value}</p>
    </div>
  );
}

export function NewMembershipRegistrationView() {
  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#24304f]">
      <header className="sticky top-0 z-10 shadow-sm">
        <div className="bg-[#17336d] text-white">
          <div className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-between px-8">
            <div className="text-[29px] font-bold tracking-[-0.04em]">
              Price<span className="text-[#e6522c]">Smart</span>
            </div>
            <div className="flex items-center gap-6 text-[13px] text-white/95">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Miraflores</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                <span>Guatemala</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-white/70" />
                <span>English</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[27px] bg-[#1652d4]" />
      </header>

      <main className="mx-auto max-w-[1280px] px-10 pb-8 pt-4">
        <div className="overflow-hidden rounded-[4px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
          <div className="flex min-h-[860px]">
            <aside className="w-[210px] border-r border-[#e6e8ef] px-8 py-11">
              <h1 className="mb-10 text-[38px] font-medium tracking-[-0.03em] text-[#344374]">
                New membership
              </h1>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[13px] font-medium text-[#263968]">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1f335c] text-[11px] font-semibold text-white">
                    1
                  </span>
                  <span>Membership data</span>
                </div>
                <div className="flex items-start gap-3 text-[13px] text-[#b5b8c6]">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#eef0f4] text-[11px] font-semibold text-[#a4aabc]">
                    2
                  </span>
                  <span>Payment</span>
                </div>
              </div>
            </aside>

            <section className="flex-1 px-6 py-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[30px] font-medium text-[#33467e]">
                  <FolderOpen className="h-6 w-6" strokeWidth={1.8} />
                  <span>Personal data</span>
                </div>
                <Button
                  variant="outline"
                  className="h-8 rounded-md border-[#8eb3f4] px-4 text-[12px] font-medium text-[#2864cf] hover:bg-[#edf4ff] hover:text-[#2864cf]"
                >
                  Capture Member ID
                </Button>
              </div>

              <div className="rounded-md border border-transparent px-4 pb-5">
                <div className="grid grid-cols-[160px_1fr] gap-8 border-b border-[#e5e7ee] pb-7">
                  <div className="flex flex-col items-center pt-1">
                    <div className="relative h-[110px] w-[110px] overflow-hidden rounded-full bg-[#e5e5e5]">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
                        alt="Primary member"
                        fill
                        className="object-cover"
                        sizes="110px"
                      />
                    </div>
                    <button className="mt-4 text-[11px] font-medium text-[#4c84e3]">Change picture</button>
                  </div>

                  <div className="space-y-8">
                    {personalFields.map((row) => (
                      <div key={row[0].label} className="grid grid-cols-3 gap-10">
                        {row.map((field) => (
                          <InfoField key={field.label} label={field.label} value={field.value} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-[#e5e7ee] py-7">
                  <SectionTitle icon={Phone} title="Contact" />
                  <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                    {contactRows.map((item) => (
                      <div key={item.label} className={item.full ? "col-span-2" : ""}>
                        <div className="space-y-2">
                          <p className="text-[10px] font-medium uppercase tracking-[0.02em] text-[#6c738f]">{item.label}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-[13px] text-[#33406b]">{item.value}</p>
                            {item.alert ? <AlertCircle className="h-4 w-4 text-[#f2a329]" /> : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-[#e5e7ee] py-7">
                  <SectionTitle icon={Home} title="Address" />
                  <div className="grid grid-cols-4 gap-8">
                    {addressFields.map((field) => (
                      <InfoField key={field.label} label={field.label} value={field.value} />
                    ))}
                  </div>
                </div>

                <div className="py-7">
                  <SectionTitle icon={UsersRound} title="Secondary memberships" />
                  <div className="flex gap-5">
                    {secondaryMembers.map((member) => (
                      <div
                        key={member.name}
                        className="flex w-[238px] items-center justify-between rounded-[8px] border border-[#e5e7ee] bg-white px-4 py-3 shadow-[0_1px_1px_rgba(16,24,40,0.04)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#ecedf2] text-[#5e6886]">
                            <UserRound className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-[#33406b]">{member.name}</p>
                            <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-[#4c84e3]">
                              <button>Edit</button>
                              <span className="text-[#9ca3ba]">|</span>
                              <button>Remove</button>
                            </div>
                          </div>
                        </div>
                        <AlertCircle className="h-4 w-4 text-[#f2a329]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-[#e5e7ee] px-10 py-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-9 rounded-md border-[#86a7e0] px-5 text-[13px] font-medium text-[#2f65c9] hover:bg-[#edf4ff] hover:text-[#2f65c9]"
                asChild
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-9 rounded-md border-[#86a7e0] px-7 text-[13px] font-medium text-[#2f65c9] hover:bg-[#edf4ff] hover:text-[#2f65c9]"
              >
                Save changes
              </Button>
            </div>
            <Button className="h-9 rounded-md bg-[#263d7e] px-9 text-[13px] font-medium text-white hover:bg-[#20366e]">
              <CreditCard className="h-4 w-4" />
              Payment
            </Button>
          </div>
        </div>

        <div className="fixed right-6 top-[110px] flex h-[58px] w-[58px] items-center justify-center rounded-[12px] bg-[#1e3776] shadow-[0_8px_20px_rgba(26,58,119,0.3)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2b4f9d]">
            <Camera className="h-4 w-4 text-white" />
          </div>
        </div>
      </main>
    </div>
  );
}
