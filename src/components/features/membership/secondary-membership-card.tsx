"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";

interface SecondaryMembershipCardProps {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  hasWarning?: boolean;
  warningMessage?: string;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function SecondaryMembershipCard({
  id,
  firstName,
  lastName,
  avatarUrl,
  hasWarning = false,
  warningMessage,
  onEdit,
  onRemove,
}: SecondaryMembershipCardProps) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#0052a1]/30 transition-colors">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={fullName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#0052a1] font-semibold">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{fullName}</p>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onEdit?.(id)}
            className="text-[#0052a1] hover:underline font-medium"
          >
            Edit
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => onRemove?.(id)}
            className="text-[#0052a1] hover:underline font-medium"
          >
            Remove
          </button>
        </div>
      </div>

      {hasWarning && (
        <div className="shrink-0" title={warningMessage}>
          <AlertCircle className="w-5 h-5 text-[#f5a623]" />
        </div>
      )}
    </div>
  );
}
