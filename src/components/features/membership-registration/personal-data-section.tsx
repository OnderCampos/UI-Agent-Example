"use client";

import Image from "next/image";
import { Folder, User } from "lucide-react";

interface PersonalData {
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  photoUrl?: string;
}

interface PersonalDataSectionProps {
  data: PersonalData;
  onChangePicture?: () => void;
}

export function PersonalDataSection({
  data,
  onChangePicture,
}: PersonalDataSectionProps) {
  return (
    <section className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-2 text-[#0052a1] mb-6">
        <Folder className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Personal data</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
            {data.photoUrl ? (
              <Image
                src={data.photoUrl}
                alt={`${data.firstName} ${data.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-gray-300" />
            )}
          </div>
          <button
            type="button"
            onClick={onChangePicture}
            className="text-sm text-[#0066cc] hover:text-[#0052a1] font-medium"
          >
            Change picture
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <DataField label="ID Type" value={data.idType} />
          <DataField label="ID Number" value={data.idNumber} />
          <DataField label="Membership Type" value={data.membershipType} />
          <DataField label="Abbreviation" value={data.abbreviation} />
          <DataField label="First Name" value={data.firstName} />
          <DataField label="Last Name" value={data.lastName} />
          <DataField label="Gender" value={data.gender} />
          <DataField label="Date of birth" value={data.dateOfBirth} />
          <DataField label="Occupation" value={data.occupation} />
        </div>
      </div>
    </section>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  );
}
