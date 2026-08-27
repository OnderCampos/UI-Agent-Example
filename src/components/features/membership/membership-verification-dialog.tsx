"use client";

import { CheckCircle2, CircleAlert, Mail, UserRound, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type VerificationMember = {
  id: string;
  name?: string;
  contact: string;
  avatar?: string;
  verified?: boolean;
  channel?: "phone" | "email";
};

type MembershipVerificationDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  members?: VerificationMember[];
};

const defaultMembers: VerificationMember[] = [
  {
    id: "1",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatar: "NT",
    verified: true,
    channel: "phone",
  },
  {
    id: "2",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatar: "MT",
    channel: "phone",
  },
  {
    id: "3",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatar: "PT",
    channel: "email",
  },
  {
    id: "4",
    contact: "+502 94585 2576",
    channel: "phone",
  },
];

function AvatarBadge({ label = "", verified }: { label?: string; verified?: boolean }) {
  if (!label) {
    return <div className="h-10 w-10" />;
  }

  return (
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#f0d7cb] text-xs font-semibold text-[#6b4b42] shadow-sm">
      {label}
      {verified ? (
        <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-white">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#7ca12b]" />
        </span>
      ) : null}
    </div>
  );
}

function CodeBoxes() {
  return (
    <div className="flex flex-col items-start gap-1 text-[8px] text-[#7d8699]">
      <span className="font-semibold uppercase tracking-[0.03em] text-[#80889b]">Enter code</span>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d8dce5] bg-white text-lg font-semibold text-[#c5cad6] shadow-[inset_0_-2px_0_0_#eff2f7]"
          >
            0
          </div>
        ))}
      </div>
      <button type="button" className="text-[8px] font-medium text-[#69a7ff]">
        Resend code
      </button>
    </div>
  );
}

function MemberRow({ member }: { member: VerificationMember }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-[#e3e5eb] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <AvatarBadge label={member.avatar} verified={member.verified} />
        <div className="min-w-0 text-[#29395f]">
          {member.name ? <div className="text-[13px] font-semibold leading-4">{member.name}</div> : null}
          <div className="flex items-center gap-2 text-[12px] leading-4 text-[#5f6982]">
            {member.channel === "email" ? <Mail className="h-3.5 w-3.5 text-[#8f98ab]" /> : <UserRound className="h-3.5 w-3.5 text-[#8f98ab]" />}
            <span className="truncate">{member.contact}</span>
            {member.verified ? (
              <CheckCircle2 className="h-4 w-4 text-[#84a43f]" />
            ) : (
              <CircleAlert className="h-4 w-4 text-[#eea625]" />
            )}
          </div>
        </div>
      </div>

      {member.verified ? (
        <div className="pr-2 text-[12px] font-semibold text-[#7ea12b]">Member verified</div>
      ) : (
        <CodeBoxes />
      )}
    </div>
  );
}

export function MembershipVerificationDialog({
  open = true,
  onOpenChange,
  members = defaultMembers,
}: MembershipVerificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] gap-0 rounded-[10px] border-0 bg-[#f8f8f9] p-0 shadow-[0_12px_30px_rgba(21,34,72,0.24)] [&>button]:hidden">
        <div className="relative px-5 pb-4 pt-5 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            className="absolute right-4 top-4 text-[#9aa3b5] transition-colors hover:text-[#6b7284]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#dde2ea] bg-[#f5f6f8] text-[#73809a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <UserRound className="h-5 w-5" />
          </div>

          <DialogTitle className="text-[22px] font-semibold text-[#24417d]">Verify memberships</DialogTitle>
          <DialogDescription className="mt-1 max-w-[420px] text-[12px] leading-5 text-[#5d6880]">
            Send a code to the registered contact of each member. You will enter the code number in the next screen.
          </DialogDescription>

          <div className="mt-4 space-y-0 rounded-md bg-transparent">
            {members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-6 border-t border-[#e3e5eb] pt-4">
            <Button className="h-10 w-full rounded-md bg-[#1f3575] text-[14px] font-semibold text-white hover:bg-[#172a63]">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
