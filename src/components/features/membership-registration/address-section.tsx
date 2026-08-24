"use client";

import { MapPin, Home } from "lucide-react";

interface AddressData {
  street: string;
  country: string;
  state: string;
  city: string;
}

interface AddressSectionProps {
  data: AddressData;
}

export function AddressSection({ data }: AddressSectionProps) {
  return (
    <section className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-2 text-[#0052a1] mb-6">
        <MapPin className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Address</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              Address <span className="text-red-500">*</span>
            </p>
          </div>
          <p className="text-base font-medium text-gray-900">{data.street}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Country</p>
          <p className="text-base font-medium text-gray-900">{data.country}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">State</p>
          <p className="text-base font-medium text-gray-900">{data.state}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">City</p>
          <p className="text-base font-medium text-gray-900">{data.city}</p>
        </div>
      </div>
    </section>
  );
}
