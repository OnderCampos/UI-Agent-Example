"use client";

import Image from "next/image";
import { BadgeCheck, CircleAlert, UserRoundPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerificationMember {
  id: string;
  name?: string;
  contact: string;
  avatar?: string;
  verified?: boolean;
}

interface MembershipVerificationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  members?: VerificationMember[];
}

const defaultMembers: VerificationMember[] = [
  {
    id: "nicolas",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    verified: true,
  },
  {
    id: "mayra",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "pablo-email",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "pablo-phone",
    contact: "+502 94585 2576",
  },
];

function CodeBoxes() {
  return (
    <div className="w-[112px] shrink-0">
      <p className="text-[5px] font-semibold uppercase tracking-[0.08em] text-[#6f7d96]">Enter code</p>
      <div className="mt-1 flex gap-[6px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-[30px] w-[22px] items-center justify-center rounded-[5px] border border-[#d8dfe8] bg-white text-[14px] font-semibold text-[#d3d8e1] shadow-[inset_0_-1px_0_rgba(203,213,225,0.38)]"
          >
            0
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 text-[5px] font-medium text-[#5f9cf4]">
        Resend code
      </button>
    </div>
  );
}

function MemberRow({ member }: { member: VerificationMember }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#e6e8ed] py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.name ?? member.contact}
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full object-cover"
          />
        ) : (
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#eef2f7] text-[#7b879a]">
            <UserRoundPlus className="h-4 w-4" />
          </div>
        )}

        <div className="min-w-0">
          {member.name ? <p className="text-[11px] font-semibold leading-none text-[#4b5568]">{member.name}</p> : null}
          <div className="mt-[3px] flex items-center gap-2 text-[11px] text-[#6a7384]">
            <span className="truncate">{member.contact}</span>
            {member.verified ? (
              <BadgeCheck className="h-3.5 w-3.5 text-[#87a62f]" />
            ) : (
              <CircleAlert className="h-3.5 w-3.5 text-[#de9826]" />
            )}
          </div>
        </div>
      </div>

      {member.verified ? (
        <div className="pt-1 text-[11px] font-semibold text-[#7fa128]">Member verified</div>
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
    <div className="flex min-h-screen items-center justify-center bg-[#697591] px-4 py-12">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "w-[318px] max-w-[318px] gap-0 rounded-[8px] border-0 bg-[#f8f8f9] p-0 shadow-[0_14px_32px_rgba(15,23,42,0.18)]",
            "translate-x-[-50%] translate-y-[-50%]"
          )}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 text-[#99a3b4] transition-opacity hover:opacity-80"
          >
            ×
          </button>

          <div className="p-4 pb-3">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e3e7ee] bg-white text-[#7b8798] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
              <UserRoundPlus className="h-4 w-4 stroke-[1.8]" />
            </div>
            <DialogTitle className="text-[14px] font-semibold text-[#28417c]">Verify memberships</DialogTitle>
            <DialogDescription className="mt-1 max-w-[264px] text-[9px] leading-[1.45] text-[#667085]">
              Send a code to the registered contact of each member. You will enter the code number in the next screen.
            </DialogDescription>
          </div>

          <div className="px-4 pb-2">
            {members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>

          <div className="border-t border-[#eceff4] px-4 py-3">
            <Button className="h-8 w-full rounded-[4px] bg-[#243b83] text-[11px] font-semibold text-white hover:bg-[#203574]">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
