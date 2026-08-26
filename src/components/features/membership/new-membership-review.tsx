import { Camera, CircleAlert, CreditCard, Globe, House, IdCard, Mail, MapPinned, Pencil, Phone, Trash2, UserRound, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const reviewSections = {
  personalData: [
    { label: "ID Type", value: "DNI" },
    { label: "ID Number", value: "IDGTM1234567890123S0123" },
    { label: "Membership Type", value: "Diamond" },
    { label: "Abbreviation", value: "Mr." },
    { label: "First Name", value: "Nicolás" },
    { label: "Last Name", value: "Treviño" },
    { label: "Gender", value: "Male" },
    { label: "Date of birth", value: "13/09/1978" },
    { label: "Occupation", value: "Urban planner" },
  ],
  contact: [
    { label: "Email address *", value: "Customer declined to provide email address", fullWidth: true },
    { label: "Mobile phone number *", value: "+502 1234 5678", trailingIcon: CircleAlert },
    { label: "Home phone number *", value: "+502 2345 6789" },
    { label: "Notifications", value: "By email address" },
  ],
  address: [
    { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
    { label: "Country", value: "Guatemala" },
    { label: "State", value: "Antigua" },
    { label: "City", value: "Sacatepequez" },
  ],
};

const secondaryMembers = [
  { name: "Mayra Treviño", image: "MT" },
  { name: "Pablo Treviño", image: "PT" },
];

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-2.5 text-[#213a7a]">
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <h2 className="text-[14px] font-medium">{title}</h2>
    </div>
  );
}

function DetailGrid({ items, columns = "grid-cols-1 md:grid-cols-3" }: { items: Array<{ label: string; value: string; fullWidth?: boolean; trailingIcon?: typeof CircleAlert }>; columns?: string }) {
  return (
    <div className={cn("grid gap-x-10 gap-y-6", columns)}>
      {items.map((item) => {
        const TrailingIcon = item.trailingIcon;

        return (
          <div key={`${item.label}-${item.value}`} className={cn(item.fullWidth && "md:col-span-full")}>
            <p className="mb-2 text-[11px] font-medium text-[#5f6780]">{item.label}</p>
            <div className="flex items-center gap-2 text-[14px] text-[#24314f]">
              <span>{item.value}</span>
              {TrailingIcon ? <TrailingIcon className="h-3.5 w-3.5 text-[#f0a01f]" /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SecondaryMemberCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#e7eaf1] bg-white px-3 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:w-[150px]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3d9c5] text-[11px] font-semibold text-[#5f3a26]">
          {image}
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#24314f]">{name}</p>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-[#3e6cc8]">
            <button type="button">Edit</button>
            <span className="h-3 w-px bg-[#d6dbe7]" />
            <button type="button">Remove</button>
          </div>
        </div>
      </div>
      <CircleAlert className="h-3.5 w-3.5 shrink-0 text-[#f0a01f]" />
    </div>
  );
}

export function NewMembershipReview() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#24314f]">
      <div className="h-11 bg-[#1650c8]" />

      <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <div />
          <Button variant="outline" className="h-9 rounded-md border-[#85a7e6] bg-white px-4 text-[12px] font-medium text-[#3868c8] hover:bg-[#f7faff] hover:text-[#3868c8]">
            Capture Member ID
          </Button>
        </div>

        <Card className="overflow-hidden rounded-none border-[#dbdfe8] shadow-none">
          <div className="grid md:grid-cols-[112px_1fr]">
            <aside className="border-r border-[#e1e5ed] bg-[#f7f7f8] px-4 py-6">
              <h1 className="mb-6 text-[18px] font-medium text-[#243b78]">New membership</h1>
              <nav className="space-y-4">
                <div className="flex items-start gap-2.5 text-[12px] font-medium text-[#24314f]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#24314f] text-[10px] text-white">1</span>
                  <div>
                    <p>Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[12px] text-[#b1b7c6]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e3e5ea] text-[10px] text-[#8f97aa]">2</span>
                  <div>
                    <p>Payment</p>
                  </div>
                </div>
              </nav>
            </aside>

            <section className="bg-white px-4 py-5 md:px-6 md:py-6">
              <div className="mb-6 flex items-center gap-2 text-[#243b78]">
                <IdCard className="h-4 w-4" strokeWidth={1.8} />
                <h2 className="text-[30px] leading-none font-medium md:text-[14px]">Personal data</h2>
              </div>

              <div className="grid gap-6 border-b border-[#e6e9ef] pb-8 md:grid-cols-[88px_1fr]">
                <div className="flex flex-col items-center">
                  <div className="relative h-[94px] w-[94px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_30%,#f7f7f7,#d9d9d9_70%)]">
                    <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-center justify-center bg-[#a12323] text-white">
                      <UserRound className="h-12 w-12" />
                    </div>
                    <div className="absolute inset-x-0 top-5 flex justify-center text-[#424242]">
                      <div className="h-7 w-7 rounded-full bg-[#6b6b6b]" />
                    </div>
                  </div>
                  <button type="button" className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#3e6cc8]">
                    <Camera className="h-3 w-3" />
                    Change picture
                  </button>
                </div>

                <DetailGrid items={reviewSections.personalData} />
              </div>

              <div className="border-b border-[#e6e9ef] py-7">
                <SectionTitle icon={Phone} title="Contact" />
                <DetailGrid items={reviewSections.contact} columns="grid-cols-1 md:grid-cols-2" />
              </div>

              <div className="border-b border-[#e6e9ef] py-7">
                <SectionTitle icon={MapPinned} title="Address" />
                <DetailGrid items={reviewSections.address} columns="grid-cols-1 md:grid-cols-4" />
              </div>

              <div className="py-7">
                <SectionTitle icon={UsersRound} title="Secondary memberships" />
                <div className="flex flex-wrap gap-4">
                  {secondaryMembers.map((member) => (
                    <SecondaryMemberCard key={member.name} {...member} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="border-t border-[#dfe3ea] bg-white px-4 py-4 md:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="h-9 rounded-md border-[#91ace0] px-4 text-[12px] font-medium text-[#3b67c0] hover:bg-[#f7faff] hover:text-[#3b67c0]">
                  <House className="h-3.5 w-3.5" />
                  Go back home
                </Button>
                <Button variant="outline" className="h-9 rounded-md border-[#91ace0] px-5 text-[12px] font-medium text-[#3b67c0] hover:bg-[#f7faff] hover:text-[#3b67c0]">
                  Save changes
                </Button>
              </div>

              <Button className="h-10 rounded-md bg-[#243b78] px-8 text-[12px] font-semibold text-white hover:bg-[#1e3267] sm:min-w-[132px]">
                Payment
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed right-6 top-[118px]">
        <button type="button" className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#233b7a] shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#2c468b] text-white">
            <CreditCard className="h-4 w-4" />
          </div>
        </button>
      </div>
    </div>
  );
}
