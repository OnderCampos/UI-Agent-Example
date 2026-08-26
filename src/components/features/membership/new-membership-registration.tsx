import Link from "next/link";
import {
  BriefcaseBusiness,
  Camera,
  CircleAlert,
  FolderOpen,
  Globe,
  Home,
  IdCard,
  Languages,
  Mail,
  MapPinned,
  MonitorSmartphone,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const personalData = [
  { label: "ID Type", value: "DNI", icon: IdCard },
  { label: "ID Number", value: "IDGTM1234567890123S0123", wide: true },
  { label: "Membership Type", value: "Diamond" },
  { label: "Abbreviation", value: "Mr." },
  { label: "First Name", value: "Nicolás" },
  { label: "Last Name", value: "Treviño" },
  { label: "Gender", value: "Male" },
  { label: "Date of birth", value: "13/09/1978" },
  { label: "Occupation", value: "Urban planner", icon: BriefcaseBusiness },
];

const contactData = [
  { label: "Email address *", value: "Customer declined to provide email address", icon: Mail, span: 2 },
  { label: "Mobile phone number *", value: "+502 1234 5678", icon: Phone },
  { label: "Notifications", value: "By email address", icon: CircleAlert },
  { label: "Home phone number *", value: "+502 2345 6789", icon: Phone },
];

const addressData = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja", icon: Home, wide: true },
  { label: "Country", value: "Guatemala", icon: Globe },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers = [
  { name: "Mayra Treviño", image: "MT" },
  { name: "Pablo Treviño", image: "PT" },
];

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[31px] font-medium tracking-[-0.02em] text-[#263b80] md:text-[18px]">
      <Icon className="h-4 w-4 text-[#263b80]" />
      <h2>{title}</h2>
    </div>
  );
}

function LabeledValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium leading-none text-[#5f6882]">{label}</p>
      <p className="text-[14px] text-[#2f3a58]">{value}</p>
    </div>
  );
}

export function NewMembershipRegistration() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#25314e]">
      <div className="h-8 bg-[#1f4ed8]" />

      <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-4 md:px-10">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-[18px] font-medium tracking-[-0.02em] text-[#33406b] md:text-[15px]">
              New membership
            </h1>
          </div>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#8db0ee] bg-white px-3 text-[11px] font-medium text-[#3b6dcc] hover:bg-[#eef4ff] hover:text-[#3b6dcc]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-none border border-[#d7dce6] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="grid min-h-[720px] grid-cols-1 md:grid-cols-[140px_1fr]">
            <aside className="border-r border-[#e5e9f0] bg-[#fafbfd] px-4 py-5">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#23335b]">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#23335b] text-[10px] text-white">1</span>
                    <span>Membership data</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#b1b8c7]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#eef1f5] text-[10px] text-[#aeb5c6]">2</span>
                  <span>Payment</span>
                </div>
              </div>
            </aside>

            <div className="flex flex-col">
              <div className="flex-1 px-4 py-5 md:px-6">
                <SectionTitle icon={FolderOpen} title="Personal data" />

                <div className="mb-7 grid gap-6 md:grid-cols-[92px_1fr]">
                  <div className="flex flex-col items-center">
                    <div className="flex h-[92px] w-[92px] items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] text-[26px] font-semibold text-[#8b93a7]">
                      NT
                    </div>
                    <button className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#4c87e6]">
                      <Camera className="h-3 w-3" />
                      Change picture
                    </button>
                  </div>

                  <div className="grid gap-y-7 md:grid-cols-3 md:gap-x-8">
                    {personalData.map((item) => (
                      <div key={item.label} className={item.wide ? "md:col-span-1" : ""}>
                        <LabeledValue label={item.label} value={item.value} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="mb-5 bg-[#e7eaf0]" />

                <section className="mb-7">
                  <SectionTitle icon={Phone} title="Contact" />
                  <div className="grid gap-y-6 md:grid-cols-3 md:gap-x-8">
                    {contactData.map((item) => (
                      <div key={item.label} className={item.span === 2 ? "md:col-span-3" : ""}>
                        <LabeledValue label={item.label} value={item.value} />
                      </div>
                    ))}
                  </div>
                </section>

                <Separator className="mb-5 bg-[#e7eaf0]" />

                <section className="mb-7">
                  <SectionTitle icon={MapPinned} title="Address" />
                  <div className="grid gap-y-6 md:grid-cols-4 md:gap-x-8">
                    {addressData.map((item) => (
                      <div key={item.label} className={item.wide ? "md:col-span-2" : ""}>
                        <LabeledValue label={item.label} value={item.value} />
                      </div>
                    ))}
                  </div>
                </section>

                <Separator className="mb-5 bg-[#e7eaf0]" />

                <section>
                  <SectionTitle icon={UsersRound} title="Secondary memberships" />
                  <div className="flex flex-wrap gap-4">
                    {secondaryMembers.map((member, index) => (
                      <div
                        key={member.name}
                        className="flex min-w-[150px] items-center gap-3 rounded-lg border border-[#e2e6ee] bg-white px-3 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.02)]"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d6dbe8] text-[10px] font-semibold text-[#34425f]">
                          {member.image}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-medium text-[#34425f]">{member.name}</p>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px] font-medium">
                            <button className="text-[#4d86e5]">Edit</button>
                            <span className="text-[#c6cada]">|</span>
                            <button className="text-[#d86b64]">Remove</button>
                          </div>
                        </div>
                        <CircleAlert className="h-3.5 w-3.5 text-[#f0a229]" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="border-t border-[#e4e8ef] bg-white px-4 py-4 md:px-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#8db0ee] px-4 text-[12px] font-medium text-[#3b6dcc] hover:bg-[#eef4ff] hover:text-[#3b6dcc]"
                      asChild
                    >
                      <Link href="/">
                        <Home className="h-3.5 w-3.5" />
                        Go back home
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#8db0ee] px-5 text-[12px] font-medium text-[#3b6dcc] hover:bg-[#eef4ff] hover:text-[#3b6dcc]"
                    >
                      Save changes
                    </Button>
                  </div>

                  <Button className="h-10 min-w-[130px] rounded-md bg-[#253b80] px-7 text-[12px] font-semibold text-white hover:bg-[#1d316d]">
                    Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-3 top-[118px] hidden rounded-xl bg-[#253b80] p-2 shadow-lg md:block">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#20346f] text-white">
          <MonitorSmartphone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
