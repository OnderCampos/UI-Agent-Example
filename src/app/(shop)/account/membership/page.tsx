"use client";

import {
  AlertTriangle,
  ChevronDown,
  CreditCard,
  Globe,
  MapPin,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const actionCards = [
  {
    title: "New Membership",
    icon: CreditCard,
    featured: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    featured: false,
  },
];

const memberRows = [
  {
    member: "Sarah Treviño",
    idNumber: "**************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
    tone: "active",
  },
  {
    member: "Michael Treviño",
    idNumber: "**************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
    tone: "active",
  },
  {
    member: "Nicolas Treviño",
    idNumber: "**************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
    tone: "cancelled",
  },
  {
    member: "Emily Treviño",
    idNumber: "**************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
    tone: "active",
  },
] as const;

const tableHeaders = [
  "Member",
  "ID Number",
  "Membership number",
  "Email address",
  "Phone number",
  "Membership status",
  "Actions",
] as const;

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Inter,sans-serif] text-[#0F172A]">
      <header className="bg-[#1E336E] text-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1080px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[19px] font-bold tracking-[-0.02em]">
            <span className="text-[#F97316]">✦</span>
            <span>PriceSmart</span>
          </div>

          <div className="hidden items-center gap-7 text-[14px] font-medium md:flex">
            <div className="flex items-center gap-2 text-white/95">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2 text-white/95">
              <span className="text-base leading-none">🌐</span>
              <span>Guatemala</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 text-white/95">
              <Globe className="h-4 w-4" />
              <span>English</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="h-[35px] bg-[#214CB8]" />
      </header>

      <main className="mx-auto max-w-[1080px] px-6 pb-24 pt-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-2">
          {actionCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                className={[
                  "flex min-h-[120px] items-center gap-6 rounded-[8px] border px-8 text-left transition-colors",
                  card.featured
                    ? "border-transparent bg-[#ECEEF2]"
                    : "border-[#D8E0EA] bg-white hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#3163DB] text-[#3163DB]">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#233F86]">
                  {card.title}
                </span>
              </button>
            );
          })}
        </section>

        <div className="mt-6 border-t border-[#E2E8F0]" />

        <section className="px-6 py-14">
          <div className="max-w-[900px]">
            <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[#233F86]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-[1.5] text-[#475569]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="relative w-full max-w-[434px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#64748B]" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-[10px] border-[#D7DEE8] bg-white pl-11 pr-4 text-[15px] text-[#334155] shadow-none placeholder:text-[#64748B] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>

            <Button
              type="button"
              className="h-[34px] rounded-[6px] bg-[#243C84] px-6 text-[15px] font-semibold text-white hover:bg-[#1E326E]"
            >
              Search Membership
            </Button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-white">
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-16 py-8 text-left text-[12px] font-medium text-[#475569] first:pl-16 last:pr-16"
                      >
                        <span className="inline-flex items-center gap-1 whitespace-nowrap">
                          {header}
                          {header !== "Actions" && <span className="text-[#64748B]">↓</span>}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {memberRows.map((row, index) => (
                    <tr
                      key={`${row.member}-${row.membershipNumber}`}
                      className={index !== memberRows.length - 1 ? "border-b border-[#E2E8F0]" : ""}
                    >
                      <td className="px-16 py-14 text-[14px] text-[#64748B]">{row.member}</td>
                      <td className="px-16 py-14 text-[14px] text-[#475569]">{row.idNumber}</td>
                      <td className="px-16 py-14 text-[14px] text-[#475569]">{row.membershipNumber}</td>
                      <td className="px-16 py-14 text-[14px] text-[#64748B]">{row.email}</td>
                      <td className="px-16 py-14 text-[14px] text-[#64748B]">{row.phone}</td>
                      <td className="px-16 py-14">
                        <Badge
                          variant="outline"
                          className={[
                            "rounded-[6px] border px-3 py-1 text-[12px] font-medium shadow-none",
                            row.tone === "active"
                              ? "border-[#C4E28B] bg-[#E8F6C5] text-[#5B8A0E]"
                              : "border-[#F5C7C1] bg-[#FEF2F2] text-[#DC2626]",
                          ].join(" ")}
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-16 py-14 text-[14px]">
                        <button
                          type="button"
                          className="font-medium text-[#60A5FA] transition-colors hover:text-[#3B82F6]"
                        >
                          View membership
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
