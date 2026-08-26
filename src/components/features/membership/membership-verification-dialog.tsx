import { CheckCircle2, CircleAlert, ShieldCheck, UserPlus2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerificationMember {
  name?: string;
  contact: string;
  verified?: boolean;
  avatarTone?: string;
}

interface MembershipVerificationDialogProps {
  members: VerificationMember[];
}

function MemberAvatar({ name, avatarTone }: { name?: string; avatarTone?: string }) {
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "";

  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white",
        avatarTone ?? "bg-gradient-to-br from-[#7aa5d8] to-[#274a86]"
      )}
    >
      {initials || <UserPlus2 className="h-4 w-4" strokeWidth={1.9} />}
    </div>
  );
}

function CodeBoxes() {
  return (
    <div className="w-[148px]">
      <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-[#7e8798]">Enter code</p>
      <div className="mt-1 flex gap-2">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex h-[34px] w-[28px] items-center justify-center rounded-[4px] border border-[#dfe4ec] bg-white text-[20px] font-semibold leading-none text-[#d6dbe4]"
          >
            0
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 text-[7px] font-medium text-[#4e8ee9] hover:underline">
        Resend code
      </button>
    </div>
  );
}

export function MembershipVerificationDialog({ members }: MembershipVerificationDialogProps) {
  return (
    <div className="min-h-screen bg-[#697592] px-4 py-10 text-[#30426d]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[760px] items-center justify-center">
        <div className="w-full max-w-[316px] rounded-[8px] bg-[#f7f7f8] p-4 shadow-[0_18px_70px_rgba(27,35,63,0.28)]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#dde1e8] bg-white text-[#526279] shadow-sm">
                <div className="absolute left-1/2 top-1/2 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70" />
                <div className="absolute left-1/2 top-1/2 h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#eef0f4]" />
                <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
              </div>
            </div>
            <button type="button" className="rounded-sm p-1 text-[#9ca5b5] hover:bg-[#eceef3] hover:text-[#616d82]">
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-3">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#27438a]">Verify memberships</h2>
            <p className="mt-1 max-w-[260px] text-[9px] leading-[1.55] text-[#616d82]">
              Send a code to the registered contact of each member. You will enter the code number in the next screen.
            </p>
          </div>

          <div className="mt-4 divide-y divide-[#dfe3ea] border-y border-[#dfe3ea]">
            {members.map((member, index) => (
              <div key={`${member.contact}-${index}`} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  {member.name ? <MemberAvatar name={member.name} avatarTone={member.avatarTone} /> : <div className="w-9" />}
                  <div className="min-w-0">
                    {member.name ? <p className="truncate text-[11px] font-semibold text-[#4a5570]">{member.name}</p> : null}
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[11px] text-[#6d778b]">{member.contact}</p>
                      {member.verified ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#8bad31]" strokeWidth={2.2} />
                      ) : (
                        <CircleAlert className="h-3.5 w-3.5 shrink-0 text-[#e49d19]" strokeWidth={2.1} />
                      )}
                    </div>
                  </div>
                </div>

                {member.verified ? (
                  <p className="shrink-0 text-[11px] font-semibold text-[#7ca427]">Member verified</p>
                ) : (
                  <CodeBoxes />
                )}
              </div>
            ))}
          </div>

          <Button className="mt-4 h-[28px] w-full rounded-[4px] bg-[#213b85] text-[11px] font-semibold text-white hover:bg-[#19306c]">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
