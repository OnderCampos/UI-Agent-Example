import {
  CheckCircle2,
  CircleAlert,
  UserRoundPlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const members = [
  {
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    status: "verified" as const,
    avatar: "NT",
  },
  {
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    status: "pending" as const,
    avatar: "MT",
  },
  {
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    status: "pending" as const,
    avatar: "PT",
  },
  {
    name: "",
    contact: "+502 94585 2576",
    status: "pending" as const,
    avatar: "",
  },
];

function AvatarBadge({ initials }: { initials: string }) {
  if (!initials) {
    return <div className="h-9 w-9 shrink-0" />;
  }

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f0d2bf] via-[#c99272] to-[#8c5d45] text-[11px] font-semibold text-white shadow-sm">
      {initials}
    </div>
  );
}

function CodeInputs() {
  return (
    <div className="w-[118px] shrink-0">
      <p className="mb-1 text-[6px] font-semibold uppercase tracking-[0.08em] text-[#7a8396]">
        Enter code
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Input
            key={index}
            aria-label={`Verification code digit ${index + 1}`}
            inputMode="numeric"
            maxLength={1}
            value="0"
            readOnly
            className="h-10 w-7 rounded-[5px] border-[#dde3ef] bg-white px-0 text-center text-[18px] font-semibold text-[#c8cfdb] shadow-none focus-visible:ring-1 focus-visible:ring-[#8da4de] focus-visible:ring-offset-0"
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-1 text-[7px] font-medium text-[#75a8ff] transition-colors hover:text-[#4d8eff]"
      >
        Resend code
      </button>
    </div>
  );
}

function MemberRow({
  name,
  contact,
  status,
  avatar,
}: {
  name: string;
  contact: string;
  status: "verified" | "pending";
  avatar: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#e8ebf1] py-4 last:border-b-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <AvatarBadge initials={avatar} />
        <div className="min-w-0 pt-0.5">
          {name ? (
            <div className="flex items-center gap-2">
              <p className="truncate text-[12px] font-semibold text-[#44516d]">{name}</p>
              {status === "verified" ? (
                <CheckCircle2 className="h-4 w-4 text-[#90a948]" strokeWidth={2.2} />
              ) : (
                <CircleAlert className="h-4 w-4 text-[#f1a321]" strokeWidth={2.2} />
              )}
            </div>
          ) : null}
          <p className="mt-0.5 truncate text-[12px] text-[#6d7688]">{contact}</p>
        </div>
      </div>

      {status === "verified" ? (
        <p className="pt-1 text-[12px] font-semibold text-[#8ba236]">Member verified</p>
      ) : (
        <CodeInputs />
      )}
    </div>
  );
}

export function MembershipVerificationDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#67738c] px-4 py-10">
      <Card className="w-full max-w-[318px] rounded-[8px] border-[#d8dde8] bg-[#fafafa] shadow-[0_12px_26px_rgba(35,48,78,0.12)] sm:max-w-[420px]">
        <div className="px-4 pb-4 pt-3 sm:px-4">
          <div className="flex items-start justify-between">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#dfe5ef] bg-[#f8f8f8] text-[#5b6782]">
              <span className="absolute inset-[-14px] rounded-full border border-white/35" />
              <span className="absolute inset-[-28px] rounded-full border border-white/20" />
              <UserRoundPlus className="relative z-10 h-5 w-5" strokeWidth={1.8} />
            </div>
            <button
              type="button"
              aria-label="Close verification dialog"
              className="rounded-sm p-1 text-[#98a0b3] transition-colors hover:bg-[#eef1f6] hover:text-[#6d7688]"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <h1 className="mt-3 text-[18px] font-semibold text-[#2c4b8d]">Verify memberships</h1>
          <p className="mt-1 max-w-[270px] text-[10px] leading-[1.55] text-[#616c82] sm:max-w-[310px]">
            Send a code to the registered contact of each member. You will enter the code number in the next screen.
          </p>

          <div className="mt-4">
            {members.map((member) => (
              <MemberRow key={`${member.name}-${member.contact}`} {...member} />
            ))}
          </div>

          <Button className="mt-5 h-10 w-full rounded-[5px] bg-[#233a85] text-[13px] font-semibold text-white hover:bg-[#1b2f73]">
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
}
