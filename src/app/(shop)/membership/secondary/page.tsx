"use client";

import { useRouter } from "next/navigation";
import { SecondaryMemberForm } from "@/components/features/membership-registration";

export default function NewSecondaryMembershipPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex">
      <aside className="hidden md:block w-64 border-r border-gray-200 p-8">
        <nav aria-label="Membership registration progress">
          <ol className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-[#0052a1] border-[#0052a1] text-white">
                  1
                </div>
                <div className="w-0.5 h-8 bg-gray-200 mt-2" />
              </div>
              <span className="text-sm font-medium mt-1.5 text-[#0052a1]">
                Membership data
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-white border-gray-300 text-gray-400">
                  2
                </div>
              </div>
              <span className="text-sm font-medium mt-1.5 text-gray-400">
                Payment
              </span>
            </li>
          </ol>
        </nav>
      </aside>

      <SecondaryMemberForm
        primaryMemberName="Nicolas Treviño"
        onGoHome={() => router.push("/")}
        onSaveChanges={() => {}}
        onPrevious={() => router.push("/membership/new")}
        onAddMember={() => router.push("/membership/new")}
        onCaptureMemberId={() => {}}
        onTakePhoto={() => {}}
        onSubmit={(data) => {
          console.log("Secondary member data:", data);
          router.push("/membership/new");
        }}
      />
    </div>
  );
}
