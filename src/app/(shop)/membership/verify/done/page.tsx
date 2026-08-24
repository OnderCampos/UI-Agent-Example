"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";

export default function VerifyMembershipsDonePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-ps-overlay">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center relative z-10">
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#003d7a] mb-3">
          Memberships verified
        </h1>
        <p className="text-gray-600 mb-8">
          All member contacts have been verified successfully.
        </p>
        <Button
          type="button"
          onClick={() => router.push(APP_ROUTES.MEMBERSHIP)}
          className="w-full bg-[#003d7a] hover:bg-[#002d5c] text-white h-12 rounded-lg font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
