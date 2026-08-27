import type { ComponentProps } from "react";
import { Camera, CircleAlert, CreditCard, IdCard, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

const member = {
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  birthDate: "13/09/1978",
  occupation: "Urban planner",
};

const contact = {
  emailLabel: "Customer declined to provide email address",
  mobile: "+502 1234 5678",
  home: "+502 2345 6789",
  notification: "By email address",
};

const address = {
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
};

const secondaryMemberships = [
  { name: "Mayra Treviño", tone: "from-[#8a4a2f] to-[#f0b482]" },
  { name: "Pablo Treviño", tone: "from-[#9aa7b7] to-[#e8d7cb]" },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="text-sm text-slate-700">{value}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[#27458b]">
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function SecondaryMembershipCard({ name, tone }: { name: string; tone: string }) {
  return (
    <div className="flex min-w-[150px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${tone}`} />
      <div className="flex-1">
        <p className="text-xs font-medium text-slate-700">{name}</p>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] font-medium text-[#2f5db3]">
          <button type="button">Edit</button>
          <span className="text-slate-300">|</span>
          <button type="button" className="text-[#d16262]">Remove</button>
        </div>
      </div>
      <CircleAlert className="h-3.5 w-3.5 text-[#d7981a]" strokeWidth={2} />
    </div>
  );
}

export function NewMembershipRegistration() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="h-11 bg-[#173579]" />
      <div className="h-7 bg-[#2150b7]" />

      <div className="mx-auto max-w-[1280px] px-6 py-5">
        <div className="rounded-sm border border-slate-200 bg-white shadow-[0_2px_14px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-5">
            <h1 className="text-[18px] font-medium text-[#32477d]">New membership</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="h-8 rounded-md border-[#7ca1e8] px-3 text-[11px] font-medium text-[#2d5eb7] hover:bg-[#eef4ff] hover:text-[#2d5eb7]"
              >
                Capture Member ID
              </Button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d3d84] text-white shadow-[0_6px_18px_rgba(29,61,132,0.28)]"
              >
                <CreditCard className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex">
            <aside className="w-[170px] border-r border-slate-200 px-5 py-6">
              <ol className="space-y-6 text-[11px]">
                <li className="flex items-center gap-2 font-medium text-[#32477d]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#243f84] text-[10px] text-white">1</span>
                  Membership data
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 text-[10px]">2</span>
                  Payment
                </li>
              </ol>
            </aside>

            <div className="flex-1 px-7 py-6">
              <SectionTitle icon={IdCard} title="Personal data" />

              <div className="grid grid-cols-[150px_1fr] gap-8 border-b border-slate-200 pb-7">
                <div className="flex flex-col items-center pt-1">
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-50">
                    <div className="absolute inset-x-5 top-5 h-8 rounded-full bg-[#946849]" />
                    <div className="absolute inset-x-7 top-10 bottom-0 rounded-t-[45px] bg-[#b22124]" />
                    <div className="absolute left-7 top-6 h-11 w-11 rounded-full bg-[#e9c5a8]" />
                    <div className="absolute left-[34px] top-[38px] h-2 w-2 rounded-full bg-slate-700" />
                    <div className="absolute left-[46px] top-[38px] h-2 w-2 rounded-full bg-slate-700" />
                    <div className="absolute left-[37px] top-[48px] h-1 w-10 rounded-full bg-slate-700/80" />
                  </div>
                  <button type="button" className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#4b7ad5]">
                    <Camera className="h-3 w-3" />
                    Change picture
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-10 gap-y-6 pt-1">
                  <Field label="ID Type" value={member.idType} />
                  <Field label="ID Number" value={member.idNumber} />
                  <Field label="Membership Type" value={member.membershipType} />
                  <Field label="Abbreviation" value={member.abbreviation} />
                  <Field label="First Name" value={member.firstName} />
                  <Field label="Last Name" value={member.lastName} />
                  <Field label="Gender" value={member.gender} />
                  <Field label="Date of birth" value={member.birthDate} />
                  <Field label="Occupation" value={member.occupation} />
                </div>
              </div>

              <section className="border-b border-slate-200 py-6">
                <SectionTitle icon={Phone} title="Contact" />
                <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                  <Field label="Email address *" value={contact.emailLabel} />
                  <div />
                  <div />
                  <Field label="Mobile phone number *" value={contact.mobile} />
                  <div className="flex items-end pb-1 text-[#d7981a]">
                    <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                  <div />
                  <Field label="Home phone number *" value={contact.home} />
                  <Field label="Notifications" value={contact.notification} />
                  <div />
                </div>
              </section>

              <section className="border-b border-slate-200 py-6">
                <SectionTitle icon={MapPin} title="Address" />
                <div className="grid grid-cols-4 gap-x-10 gap-y-6">
                  <Field label="Address *" value={address.address} />
                  <Field label="Country" value={address.country} />
                  <Field label="State" value={address.state} />
                  <Field label="City" value={address.city} />
                </div>
              </section>

              <section className="py-6">
                <SectionTitle icon={Users2Shim} title="Secondary memberships" />
                <div className="flex flex-wrap gap-4">
                  {secondaryMemberships.map((secondary) => (
                    <SecondaryMembershipCard key={secondary.name} {...secondary} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-7 py-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="h-9 rounded-md border-[#7ca1e8] px-5 text-xs font-medium text-[#2d5eb7] hover:bg-[#eef4ff] hover:text-[#2d5eb7]">
                Go back home
              </Button>
              <Button variant="outline" className="h-9 rounded-md border-[#7ca1e8] px-5 text-xs font-medium text-[#2d5eb7] hover:bg-[#eef4ff] hover:text-[#2d5eb7]">
                Save changes
              </Button>
            </div>
            <Button className="h-9 min-w-[96px] rounded-md bg-[#223b80] px-6 text-xs font-medium text-white hover:bg-[#1b316c]">
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users2Shim(props: React.ComponentProps<typeof Mail>) {
  return <UserRound {...props} />;
}
