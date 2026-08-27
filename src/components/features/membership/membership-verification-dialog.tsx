"use client";

import {
  CheckCircle2,
  CircleAlert,
  MailPlus,
  UserRoundPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const verificationMembers = [
  {
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    status: "verified" as const,
    avatar: "male",
  },
  {
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    status: "pending" as const,
    avatar: "female",
  },
  {
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    status: "pending" as const,
    avatar: "male-young",
  },
  {
    name: "",
    contact: "+502 94585 2576",
    status: "pending" as const,
    avatar: null,
  },
];

function Avatar({ variant }: { variant: "male" | "female" | "male-young" | null }) {
  if (!variant) {
    return <div className="h-8 w-8" />;
  }

  const styles = {
    male: {
      hair: "bg-[#7f6c61]",
      skin: "bg-[#e8c0a4]",
      shirt: "bg-[#b43031]",
    },
    female: {
      hair: "bg-[#5b382e]",
      skin: "bg-[#f0c6a8]",
      shirt: "bg-[#d28f54]",
    },
    "male-young": {
      hair: "bg-[#9ca8b8]",
      skin: "bg-[#f1ccb3]",
      shirt: "bg-[#8ab0d5]",
    },
  }[variant];

  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#e5e7eb] bg-[#eef2f7]">
      <div className={`absolute inset-x-[7px] top-[4px] h-[8px] rounded-full ${styles.hair}`} />
      <div className={`absolute left-[8px] top-[7px] h-[13px] w-[13px] rounded-full ${styles.skin}`} />
      <div className={`absolute inset-x-[5px] bottom-0 h-[12px] rounded-t-[10px] ${styles.shirt}`} />
    </div>
  );
}

function VerificationCodeInputs() {
  return (
    <div className="min-w-[114px]">
      <div className="mb-1 text-[6px] font-semibold uppercase tracking-[0.04em] text-[#68758a]">
        Enter code
      </div>
      <div className="flex gap-[5px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-9 w-6 items-center justify-center rounded-[6px] border border-[#d8dee8] bg-[#fbfcfd] text-[16px] font-semibold text-[#cad2de] shadow-[inset_0_-2px_0_rgba(56,88,139,0.06)]"
          >
            0
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 text-[6px] font-medium text-[#6d95e5]">
        Resend code
      </button>
    </div>
  );
}

function MemberRow({
  member,
}: {
  member: (typeof verificationMembers)[number];
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-[#e7eaf0] py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <Avatar variant={member.avatar} />

        <div className="min-w-0">
          {member.name ? (
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-semibold leading-none text-[#45546d]">
                {member.name}
              </p>
              {member.status === "verified" ? (
                <CheckCircle2 className="h-4 w-4 text-[#82aa32]" strokeWidth={2} />
              ) : (
                <CircleAlert className="h-4 w-4 text-[#e39a17]" strokeWidth={2} />
              )}
            </div>
          ) : null}
          <p className="mt-1 text-[11px] leading-none text-[#6e7785]">{member.contact}</p>
        </div>
      </div>

      {member.status === "verified" ? (
        <div className="pr-5 text-[12px] font-semibold text-[#82aa32]">Member verified</div>
      ) : (
        <VerificationCodeInputs />
      )}
    </div>
  );
}

export function MembershipVerificationDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#6d7890] px-6 py-16">
      <Dialog open>
        <DialogContent
          hideCloseButton
          aria-describedby="membership-verification-description"
          className="w-[317px] translate-y-0 gap-0 rounded-lg border-0 bg-[#fbfbfc] p-[18px] shadow-[0_18px_54px_rgba(37,54,90,0.18)] sm:max-w-[317px]"
        >
          <div className="flex items-start justify-between">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[14px] border border-[#ebedf1] bg-white text-[#54657e] shadow-[0_3px_10px_rgba(58,77,108,0.08)]">
              <div className="absolute -left-2 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-[#eef0f4]" />
              <div className="absolute -left-1 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-[#eef0f4]" />
              <UserRoundPlus className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <button
              type="button"
              aria-label="Close"
              className="rounded-sm p-1 text-[#96a1b2] transition hover:text-[#6e7789]"
            >
              ×
            </button>
          </div>

          <DialogTitle className="mt-3 text-left text-[14px] font-semibold text-[#24448b]">
            Verify memberships
          </DialogTitle>
          <DialogDescription
            id="membership-verification-description"
            className="mt-1 text-left text-[9px] leading-[1.55] text-[#606e84]"
          >
            Send a code to the registered contact of each member. You will enter the code
            number in the next screen.
          </DialogDescription>

          <div className="mt-4 space-y-0">
            {verificationMembers.map((member) => (
              <MemberRow key={`${member.name}-${member.contact}`} member={member} />
            ))}
          </div>

          <div className="mt-6 border-t border-[#e7eaf0] pt-4">
            <Button className="h-9 w-full rounded-[4px] bg-[#223b80] text-[12px] font-semibold text-white hover:bg-[#1b316c]">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
