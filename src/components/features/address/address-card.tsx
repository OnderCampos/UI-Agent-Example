"use client";

import { MapPin, Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserAddress } from "@/types/user";

interface AddressCardProps {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string, type: "shipping" | "billing") => void;
  isDeleting?: boolean;
}

// Map country codes to names
const countryNames: Record<string, string> = {
  CR: "Costa Rica",
  GT: "Guatemala",
  HN: "Honduras",
  SV: "El Salvador",
  NI: "Nicaragua",
  PA: "Panama",
  CO: "Colombia",
  DO: "Dominican Republic",
  JM: "Jamaica",
  TT: "Trinidad and Tobago",
  US: "United States",
};

export function AddressCard({ 
  address, 
  onEdit, 
  onDelete,
  onSetDefault,
  isDeleting = false,
}: AddressCardProps) {
  const countryName = countryNames[address.country] || address.country;

  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#0052a1]/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#0052a1]" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Label and Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-medium text-gray-900">
                {address.label || "Address"}
              </h3>
              {address.isDefaultShipping && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <Check className="w-3 h-3" />
                  Default Shipping
                </span>
              )}
              {address.isDefaultBilling && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  <Check className="w-3 h-3" />
                  Default Billing
                </span>
              )}
            </div>

            {/* Name */}
            <p className="text-gray-900">
              {address.firstName} {address.lastName}
            </p>

            {/* Address Lines */}
            <p className="text-gray-600 text-sm">
              {address.streetAddress}
              {address.streetAddress2 && `, ${address.streetAddress2}`}
            </p>
            <p className="text-gray-600 text-sm">
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p className="text-gray-600 text-sm">{countryName}</p>

            {/* Phone */}
            {address.phone && (
              <p className="text-gray-500 text-sm mt-1">{address.phone}</p>
            )}

            {/* Set Default Links */}
            {(!address.isDefaultShipping || !address.isDefaultBilling) && (
              <div className="flex gap-3 mt-3 text-sm">
                {!address.isDefaultShipping && (
                  <button
                    onClick={() => onSetDefault(address.id, "shipping")}
                    className="text-[#0052a1] hover:underline"
                  >
                    Set as default shipping
                  </button>
                )}
                {!address.isDefaultBilling && (
                  <button
                    onClick={() => onSetDefault(address.id, "billing")}
                    className="text-[#0052a1] hover:underline"
                  >
                    Set as default billing
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(address)}
            className="text-gray-500 hover:text-[#0052a1] hover:bg-[#0052a1]/5"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(address.id)}
            disabled={isDeleting}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
