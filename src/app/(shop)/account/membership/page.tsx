"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BadgePlus,
  Check,
  ChevronDown,
  CreditCard,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type MembershipStatus = "Active" | "Cancelled";

interface MemberRecord {
  member: string;
  idNumber: string;
  membershipNumber: string;
  email: string;
  phone: string;
  status: MembershipStatus;
}

const quickActions = [
  {
    title: "New Membership",
    icon: BadgePlus,
    emphasized: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    emphasized: false,
  },
];

const memberRecords: MemberRecord[] = [
  {
    member: "Sarah Treviño",
    idNumber: "************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
  },
  {
    member: "Michael Treviño",
    idNumber: "************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
  },
  {
    member: "Nicolas Treviño",
    idNumber: "************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
  },
  {
    member: "Emily Treviño",
    idNumber: "************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
  },
];

function MembershipStatusBadge({ status }: { status: MembershipStatus }) {
  const isActive = status === "Active";

  return (
    <Badge
      variant="outline"
      className={isActive
        ? "rounded-md border-[#B7D77A] bg-[#E6F4BF] px-3 py-1 text-xs font-medium text-[#6C8B12]"
        : "rounded-md border-[#EEC6BF] bg-[#FDEAE6] px-3 py-1 text-xs font-medium text-[#CC4B37]"
      }
    >
      {status}
    </Badge>
  );
}

export default function MembershipPage() {
  const [query, setQuery] = useState("Treviño");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return memberRecords;
    }

    return memberRecords.filter((record) =>
      [
        record.member,
        record.idNumber,
        record.membershipNumber,
        record.email,
        record.phone,
        record.status,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [query]);

  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#F8FAFC] -m-6 p-6 md:p-10">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="grid gap-5 md:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card
                key={action.title}
                className={`rounded-[10px] border border-[#D8E0EA] px-8 py-8 shadow-none ${
                  action.emphasized ? "bg-[#F1F2F4]" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-5 text-left transition-opacity hover:opacity-90"
                >
                  <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#3258C7] text-[#3258C7]">
                    <Icon className="h-6 w-6 stroke-[1.9]" />
                  </span>
                  <span className="text-[22px] font-semibold tracking-[-0.02em] text-[#223D7D] md:text-[24px]">
                    {action.title}
                  </span>
                </button>
              </Card>
            );
          })}
        </div>

        <Separator className="my-6 bg-[#D8E0EA]" />

        <section className="px-2 pb-4 pt-10 md:px-6">
          <div className="max-w-[840px]">
            <h1 className="text-[28px] font-medium tracking-[-0.02em] text-[#223D7D]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-[#445A88]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <form
            className="mt-7 flex flex-col items-center gap-3"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="relative w-full max-w-[520px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748B]" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-[42px] rounded-[10px] border-[#D7DDE6] bg-white pl-11 pr-4 text-[16px] text-[#334155] shadow-none placeholder:text-[#94A3B8] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>
            <Button
              type="submit"
              className="h-[42px] rounded-[6px] bg-[#223D7D] px-6 text-[15px] font-semibold text-white hover:bg-[#1B3166]"
            >
              Search Membership
            </Button>
          </form>

          <div className="mt-6 overflow-hidden rounded-[12px] border border-[#DFE5EC] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E5EAF0] bg-white text-[12px] font-medium text-[#5B677D]">
                    {[
                      "Member",
                      "ID Number",
                      "Membership number",
                      "Email address",
                      "Phone number",
                      "Membership status",
                    ].map((label) => (
                      <th key={label} className="whitespace-nowrap px-4 py-3 first:pl-5">
                        <span className="inline-flex items-center gap-1.5">
                          {label}
                          <ChevronDown className="h-4 w-4 rotate-180 stroke-[2.2] text-[#606B80]" />
                        </span>
                      </th>
                    ))}
                    <th className="whitespace-nowrap px-4 py-3 pr-5 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={`${record.member}-${record.membershipNumber}`}
                      className={index !== filteredRecords.length - 1 ? "border-b border-[#E5EAF0]" : ""}
                    >
                      <td className="whitespace-nowrap px-4 py-6 text-[16px] text-[#5C667A] first:pl-5">
                        {record.member}
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 text-[16px] text-[#5C667A]">
                        {record.idNumber}
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 text-[16px] text-[#5C667A]">
                        {record.membershipNumber}
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 text-[16px] text-[#5C667A]">
                        {record.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 text-[16px] text-[#5C667A]">
                        {record.phone}
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">
                        <MembershipStatusBadge status={record.status} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 pr-5">
                        <Link
                          href="#"
                          className="text-[15px] font-medium text-[#60A5FA] transition-colors hover:text-[#3B82F6]"
                        >
                          View membership
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-10">
                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                            <CreditCard className="h-6 w-6" />
                          </span>
                          <div>
                            <h2 className="text-lg font-semibold text-[#223D7D]">No matching memberships</h2>
                            <p className="mt-1 text-sm text-[#64748B]">
                              Try a different search term or create a new membership profile.
                            </p>
                          </div>
                          <Button
                            type="button"
                            className="mt-1 h-10 rounded-[6px] bg-[#223D7D] px-5 text-sm font-semibold text-white hover:bg-[#1B3166]"
                          >
                            <Check className="h-4 w-4" />
                            Create Membership
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
