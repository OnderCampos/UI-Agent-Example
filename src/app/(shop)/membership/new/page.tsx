"use client";

import { useRouter } from "next/navigation";
import { MembershipDataView } from "@/components/features/membership-registration";

const mockPersonalData = {
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
};

const mockContactData = {
  email: "",
  emailDeclined: true,
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  mobileWarning: true,
};

const mockAddressData = {
  street: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
};

const mockSecondaryMembers = [
  {
    id: "1",
    firstName: "Mayra",
    lastName: "Treviño",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    hasWarning: true,
  },
  {
    id: "2",
    firstName: "Pablo",
    lastName: "Treviño",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    hasWarning: true,
  },
];

export default function NewMembershipPage() {
  const router = useRouter();

  return (
    <MembershipDataView
      personalData={mockPersonalData}
      contactData={mockContactData}
      addressData={mockAddressData}
      secondaryMembers={mockSecondaryMembers}
      onGoHome={() => router.push("/")}
      onPayment={() => router.push("/membership/new/payment")}
    />
  );
}
