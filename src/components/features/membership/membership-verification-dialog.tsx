import { CheckCircle2, CircleAlert, ContactRound, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface VerificationMember {
  id: string;
  name?: string;
  contact: string;
  avatar?: string;
  status: "verified" | "pending";
}

interface MembershipVerificationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  members?: VerificationMember[];
}

const defaultMembers: VerificationMember[] = [
  {
    id: "1",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    status: "verified",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
  },
  {
    id: "2",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
  },
  {
    id: "3",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80",
  },
  {
    id: "4",
    contact: "+502 94585 2576",
    status: "pending",
  },
];

function CodeBoxes() {
  return (
    <div className="w-[150px] shrink-0">
      <div className="mb-1 text-[6px] font-semibold uppercase tracking-[0.08em] text-[#7f88a1]">
        Enter code
      </div>
      <div className="flex gap-[6px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-[31px] w-[28px] items-center justify-center rounded-[5px] border border-[#dde2ec] bg-white text-[18px] font-semibold leading-none text-[#c8cfda] shadow-[inset_0_-1px_0_rgba(17,24,39,0.03)]"
          >
            0
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-1 text-[6px] font-semibold text-[#3e8cff] underline-offset-2 hover:underline"
      >
        Resend code
      </button>
    </div>
  );
}

function MemberAvatar({ member }: { member: VerificationMember }) {
  if (!member.avatar) {
    return <div className="h-[28px] w-[28px] shrink-0 rounded-full bg-transparent" />;
  }

  return (
    <img
      src={member.avatar}
      alt={member.name ?? member.contact}
      className="h-[28px] w-[28px] shrink-0 rounded-full object-cover"
    />
  );
}

function MemberRow({ member }: { member: VerificationMember }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#d9dde5] py-4 last:border-b-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <MemberAvatar member={member} />
        <div className="min-w-0 text-[#5a6478]">
          {member.name ? (
            <>
              <div className="flex items-center gap-2">
                <p className="truncate text-[12px] font-semibold text-[#544f64]">{member.name}</p>
                {member.status === "verified" ? (
                  <CheckCircle2 className="h-[13px] w-[13px] text-[#8aa52b]" strokeWidth={2} />
                ) : (
                  <CircleAlert className="h-[13px] w-[13px] text-[#f3a323]" strokeWidth={2} />
                )}
              </div>
              <p className="mt-0.5 truncate text-[11px] text-[#71798b]">{member.contact}</p>
            </>
          ) : (
            <div className="flex items-center gap-2 pl-[40px]">
              <p className="truncate text-[11px] text-[#71798b]">{member.contact}</p>
              <CircleAlert className="h-[13px] w-[13px] text-[#f3a323]" strokeWidth={2} />
            </div>
          )}
        </div>
      </div>

      {member.status === "verified" ? (
        <p className="shrink-0 text-[12px] font-semibold text-[#88a81f]">Member verified</p>
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
    <div className="flex min-h-screen items-center justify-center bg-[#67728d] px-6 py-10">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[318px] max-w-[318px] gap-0 rounded-[8px] border-0 bg-[#f8f8f8] p-[18px] shadow-[0_18px_32px_rgba(23,34,69,0.18)] sm:rounded-[8px]">
          <div className="pointer-events-none absolute left-0 top-0 h-[78px] w-[108px] rounded-tl-[8px] bg-[radial-gradient(circle_at_0_0,rgba(242,242,242,0)_0,rgba(242,242,242,0)_34px,rgba(231,231,231,0.95)_34px,rgba(231,231,231,0.95)_35px,rgba(242,242,242,0)_35px),radial-gradient(circle_at_0_0,rgba(242,242,242,0)_0,rgba(242,242,242,0)_47px,rgba(232,232,232,0.9)_47px,rgba(232,232,232,0.9)_48px,rgba(242,242,242,0)_48px),radial-gradient(circle_at_0_0,rgba(242,242,242,0)_0,rgba(242,242,242,0)_60px,rgba(233,233,233,0.9)_60px,rgba(233,233,233,0.9)_61px,rgba(242,242,242,0)_61px)]" />

          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 z-10 text-[#9ca4b3] hover:text-[#6f7788]"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>

          <div className="relative z-10">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#d7dbe7] bg-[#f6f6f6] text-[#697689] shadow-sm">
              <ContactRound className="h-4 w-4" strokeWidth={1.8} />
            </div>

            <DialogTitle className="mt-4 text-[16px] font-semibold tracking-[-0.02em] text-[#26427e]">
              Verify memberships
            </DialogTitle>
            <DialogDescription className="mt-1 max-w-[250px] text-[9px] leading-[1.55] text-[#697286]">
              Send a code to the registered contact of each member. You will enter the code number in the next screen.
            </DialogDescription>

            <div className="mt-4">
              {members.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </div>

            <Button className="mt-6 h-[32px] w-full rounded-[4px] bg-[#19357b] text-[12px] font-semibold text-white hover:bg-[#17316f]">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
