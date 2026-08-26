"use client";

import { CheckCircle2, CircleAlert, Mail, Phone, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const members = [
  {
    id: "nicolas",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatar: "NT",
    icon: Phone,
    status: "verified" as const,
  },
  {
    id: "mayra",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatar: "MT",
    icon: Phone,
    status: "pending" as const,
  },
  {
    id: "pablo",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatar: "PT",
    icon: Mail,
    status: "pending" as const,
  },
  {
    id: "alternate",
    name: "",
    contact: "+502 94585 2576",
    avatar: "",
    icon: Phone,
    status: "pending" as const,
  },
];

function Avatar({ initials, muted = false }: { initials: string; muted?: boolean }) {
  if (!initials) {
    return <div className="h-8 w-8" />;
  }

  return (
    <div
      className={[
        "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold",
        muted ? "bg-[#dae7ff] text-[#36548e]" : "bg-[#efd8cb] text-[#6f4735]",
      ].join(" ")}
    >
      {initials}
    </div>
  );
}

function CodeBoxes() {
  return (
    <div className="w-[112px]">
      <p className="mb-1 text-[6px] font-semibold uppercase tracking-[0.08em] text-[#7f8797]">Enter code</p>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="flex h-8 w-6 items-center justify-center rounded-[4px] border border-[#d8dde7] bg-white text-[16px] font-semibold leading-none text-[#cfd4dd] shadow-[inset_0_-2px_0_#eef2f8]"
          >
            0
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 text-[6px] font-medium text-[#5d99ff]">
        Resend code
      </button>
    </div>
  );
}

function MemberRow({
  name,
  contact,
  avatar,
  icon: Icon,
  status,
  mutedAvatar,
}: {
  name: string;
  contact: string;
  avatar: string;
  icon: typeof Phone;
  status: "verified" | "pending";
  mutedAvatar?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={avatar} muted={mutedAvatar} />
        <div className="min-w-0 text-[#44506b]">
          {name ? <p className="truncate text-[11px] font-semibold text-[#4a5671]">{name}</p> : null}
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[11px] text-[#616b81]">{contact}</p>
            {status === "verified" ? (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#7da230]" strokeWidth={2} />
            ) : (
              <CircleAlert className="h-3.5 w-3.5 shrink-0 text-[#e9a322]" strokeWidth={2} />
            )}
          </div>
        </div>
      </div>

      {status === "verified" ? (
        <p className="shrink-0 text-[11px] font-semibold text-[#7da230]">Member verified</p>
      ) : (
        <CodeBoxes />
      )}
    </div>
  );
}

export function MembershipVerifyDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#69738b] px-4 py-10">
      <Dialog open>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[318px] gap-0 rounded-[8px] border-none bg-[#f7f7f8] p-0 shadow-[0_20px_60px_rgba(17,24,39,0.25)]"
        >
          <div className="rounded-[8px] bg-[#f7f7f8] px-[18px] pb-[14px] pt-[12px]">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#e4e6eb] bg-[#f5f5f6] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ebedf2] text-[#6f778a] shadow-[0_0_0_6px_rgba(245,245,247,0.95),0_0_0_14px_rgba(245,245,247,0.7)]">
                  <UserPlus className="h-4 w-4" strokeWidth={1.8} />
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="rounded-sm p-1 text-[#9aa2b2] transition-colors hover:text-[#6d7484]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>

            <DialogTitle className="text-[13px] font-semibold text-[#223f7c]">Verify memberships</DialogTitle>
            <DialogDescription className="mt-1 max-w-[250px] text-[8px] leading-[1.6] text-[#5f6780]">
              Send a code to the registered contact of each member. You will enter the code number in the next screen.
            </DialogDescription>

            <div className="mt-4 divide-y divide-[#e0e3ea]">
              {members.map((member, index) => (
                <MemberRow
                  key={member.id}
                  {...member}
                  mutedAvatar={index === 2}
                />
              ))}
            </div>

            <div className="mt-5 border-t border-[#e0e3ea] pt-4">
              <Button className="h-[22px] w-full rounded-[4px] bg-[#21397b] px-4 text-[10px] font-semibold text-white hover:bg-[#1b3069]">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
