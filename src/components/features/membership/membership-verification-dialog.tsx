import {
  CircleAlert,
  CircleCheck,
  UserRoundPlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VerificationStatus = "verified" | "pending";

type VerificationMember = {
  id: string;
  name?: string;
  contact: string;
  initials: string;
  status: VerificationStatus;
  showAvatar?: boolean;
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
    initials: "NT",
    status: "verified",
    showAvatar: true,
  },
  {
    id: "2",
    name: "Mayra Treviño",
    contact: "+502 9887 65432",
    initials: "MT",
    status: "pending",
    showAvatar: true,
  },
  {
    id: "3",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    initials: "PT",
    status: "pending",
    showAvatar: true,
  },
  {
    id: "4",
    contact: "+502 94585 2576",
    initials: "PH",
    status: "pending",
    showAvatar: false,
  },
];

function CodeBoxes() {
  return (
    <div>
      <p className="mb-1 text-[8px] font-semibold leading-none text-[#7f8798]">
        Enter code
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#d8dce5] bg-[#f8f9fb] text-[21px] font-semibold leading-none text-[#d4d9e4]"
          >
            0
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-1 text-[8px] font-medium text-[#4c86df]"
      >
        Resend code
      </button>
    </div>
  );
}

function MemberAvatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce2ec] text-[10px] font-semibold text-[#32415f]">
      {initials}
    </div>
  );
}

export function MembershipVerificationDialog({
  open = true,
  onOpenChange,
  members = defaultMembers,
}: MembershipVerificationDialogProps) {
  return (
    <div className="min-h-screen bg-[#68748e]">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[316px] max-w-[316px] gap-0 rounded-[8px] border-none bg-[#f8f8f8] p-0 shadow-[0_18px_48px_rgba(27,39,76,0.24)] sm:w-[316px]">
          <div className="px-4 pb-4 pt-3">
            <DialogHeader className="space-y-0 text-left">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#e6e7eb] bg-white text-[#6f7789] shadow-[inset_0_0_0_1px_rgba(240,242,246,0.6)]">
                  <UserRoundPlus className="h-4 w-4" strokeWidth={1.7} />
                </div>
              </div>
              <DialogTitle className="text-[13px] font-semibold tracking-[-0.01em] text-[#273b7a]">
                Verify memberships
              </DialogTitle>
              <DialogDescription className="mt-1 max-w-[252px] text-[9px] leading-[1.45] text-[#5d677e]">
                Send a code to the registered contact of each member. You will enter the code number in the next screen.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-0">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className={cn(
                    "grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[#e5e7eb] py-3",
                    index === members.length - 1 && "border-b-0 pb-2"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {member.showAvatar ? (
                      <MemberAvatar initials={member.initials} />
                    ) : (
                      <div className="w-8" />
                    )}

                    <div className="min-w-0">
                      {member.name ? (
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-[10px] font-semibold leading-none text-[#3e4f71]">
                            {member.name}
                          </p>
                          {member.status === "verified" ? (
                            <CircleCheck className="h-3.5 w-3.5 text-[#89a83e]" strokeWidth={2} />
                          ) : (
                            <CircleAlert className="h-3.5 w-3.5 text-[#e39c20]" strokeWidth={2} />
                          )}
                        </div>
                      ) : null}
                      <p className="mt-1 truncate text-[10px] leading-none text-[#636d82]">
                        {member.contact}
                      </p>
                    </div>
                  </div>

                  {member.status === "verified" ? (
                    <p className="text-[10px] font-semibold text-[#84a235]">
                      Member verified
                    </p>
                  ) : (
                    <CodeBoxes />
                  )}
                </div>
              ))}
            </div>

            <Button className="mt-4 h-9 w-full rounded-[4px] bg-[#23397d] text-[11px] font-semibold text-white hover:bg-[#1f3470]">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
