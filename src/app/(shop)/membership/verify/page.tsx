import { MembershipVerificationDialog } from "@/components/features/membership/membership-verification-dialog";

const members = [
  {
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    verified: true,
    avatarTone: "bg-gradient-to-br from-[#d2b29c] via-[#b56a42] to-[#7a3527]",
  },
  {
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatarTone: "bg-gradient-to-br from-[#8d5736] via-[#c28a67] to-[#4f2a18]",
  },
  {
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatarTone: "bg-gradient-to-br from-[#bdd6e9] via-[#7ea3cd] to-[#2f588c]",
  },
  {
    contact: "+502 94585 2576",
  },
];

export default function MembershipVerifyPage() {
  return <MembershipVerificationDialog members={members} />;
}
