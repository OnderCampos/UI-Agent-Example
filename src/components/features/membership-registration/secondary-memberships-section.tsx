"use client";

import Image from "next/image";
import { Users, AlertCircle, User } from "lucide-react";

interface SecondaryMember {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  hasWarning?: boolean;
}

interface SecondaryMembershipsSectionProps {
  members: SecondaryMember[];
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function SecondaryMembershipsSection({
  members,
  onEdit,
  onRemove,
}: SecondaryMembershipsSectionProps) {
  return (
    <section className="pb-8">
      <div className="flex items-center gap-2 text-[#0052a1] mb-6">
        <Users className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Secondary memberships</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={`${member.firstName} ${member.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-gray-900 truncate">
                {member.firstName} {member.lastName}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => onEdit?.(member.id)}
                  className="text-[#0066cc] hover:text-[#0052a1] font-medium"
                >
                  Edit
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => onRemove?.(member.id)}
                  className="text-[#0066cc] hover:text-[#0052a1] font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            {member.hasWarning && (
              <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0" aria-label="Warning" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
