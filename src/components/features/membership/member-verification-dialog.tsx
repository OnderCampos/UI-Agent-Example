import { AlertCircle, CheckCircle2, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type VerificationMember = {
  id: string;
  name?: string;
  contact: string;
  avatar: string;
  verified?: boolean;
  contactType?: "phone" | "email";
  code?: string[];
};

const members: VerificationMember[] = [
  {
    id: "nicolas",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatar: "NT",
    verified: true,
    code: ["", "", "", ""],
  },
  {
    id: "mayra",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatar: "MT",
    code: ["0", "0", "0", "0"],
  },
  {
    id: "pablo-email",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatar: "PT",
    contactType: "email",
    code: ["0", "0", "0", "0"],
  },
  {
    id: "pablo-phone",
    contact: "+502 94585 2576",
    avatar: "PT",
    code: ["0", "0", "0", "0"],
  },
];

function AvatarBadge({ initials, tone }: { initials: string; tone: "red" | "amber" | "blue" }) {
  const tones = {
    red: "from-[#8d3c31] to-[#d69f81]",
    amber: "from-[#6f4424] to-[#efc39d]",
    blue: "from-[#5b7fb8] to-[#dbe6f9]",
  } as const;

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${tones[tone]} text-[11px] font-semibold text-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

function CodeBoxes({ code }: { code: string[] }) {
  return (
    <div className="flex gap-2">
      {code.map((digit, index) => (
        <div
          key={`${digit}-${index}`}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dfe4ee] bg-white text-sm font-semibold text-[#c1c8d6] shadow-[0_1px_0_rgba(16,24,40,0.04)]"
        >
          {digit}
        </div>
      ))}
    </div>
  );
}

function VerificationRow({ member, tone }: { member: VerificationMember; tone: "red" | "amber" | "blue" }) {
  return (
    <div className="grid grid-cols-[1fr_160px] items-center gap-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        {member.name ? <AvatarBadge initials={member.avatar} tone={tone} /> : <div className="w-8" />}
        <div className="min-w-0">
          {member.name ? (
            <div className="flex items-center gap-2">
              <p className="truncate text-[12px] font-semibold leading-none text-[#4f5b72]">
                {member.name}
              </p>
              {member.verified ? (
                <CheckCircle2 className="h-4 w-4 text-[#7da038]" strokeWidth={1.8} />
              ) : (
                <AlertCircle className="h-4 w-4 text-[#cc8b19]" strokeWidth={1.8} />
              )}
            </div>
          ) : null}
          <p className="mt-1 truncate text-[12px] text-[#6f7c92]">{member.contact}</p>
        </div>
      </div>

      <div className="justify-self-end text-right">
        {member.verified ? (
          <p className="text-[12px] font-semibold text-[#7da038]">Member verified</p>
        ) : (
          <div className="space-y-1">
            <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
              Enter code
            </p>
            <CodeBoxes code={member.code ?? []} />
            <button type="button" className="text-[8px] font-medium text-[#61a6ff] hover:underline">
              Resend code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function MemberVerificationDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#66738c] px-4 py-10">
      <Dialog open>
        <DialogContent className="w-full max-w-[318px] gap-0 rounded-[8px] border-0 bg-[#f8f8f9] p-0 shadow-[0_22px_70px_rgba(21,35,64,0.26)] sm:max-w-[318px] [&>button]:hidden">
          <div className="px-4 pb-4 pt-3">
            <div className="flex items-start justify-between">
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#f4f4f5] text-[#7c8699]">
                <div className="absolute inset-[6px] rounded-full border border-[#e4e5ea]" />
                <div className="absolute inset-[-7px] rounded-full border border-[#ececf0]" />
                <div className="absolute inset-[-20px] rounded-full border border-[#f1f1f4]" />
                <UserRoundPlus className="relative h-4 w-4" strokeWidth={1.8} />
              </div>
              <button type="button" aria-label="Close" className="mt-1 text-[#a1a9bb] hover:text-[#7c8699]">
                ×
              </button>
            </div>

            <div className="mt-3">
              <DialogTitle className="text-[14px] font-semibold text-[#27478f]">
                Verify memberships
              </DialogTitle>
              <DialogDescription className="mt-1 text-[9px] leading-[1.5] text-[#667085]">
                Send a code to the registered contact of each member. You will enter the code
                number in the next screen.
              </DialogDescription>
            </div>

            <div className="mt-3">
              <VerificationRow member={members[0]} tone="red" />
              <Separator className="bg-[#e5e7eb]" />
              <VerificationRow member={members[1]} tone="amber" />
              <Separator className="bg-[#e5e7eb]" />
              <VerificationRow member={members[2]} tone="blue" />
              <VerificationRow member={members[3]} tone="blue" />
            </div>

            <Separator className="mt-3 bg-[#e5e7eb]" />

            <Button className="mt-4 h-8 w-full rounded-[4px] bg-[#1d3478] text-[12px] font-semibold text-white hover:bg-[#172a62]">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
