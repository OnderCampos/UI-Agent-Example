"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  Camera,
  Folder,
  Home,
  MapPin,
  Phone,
  Users,
  User,
  ChevronDown,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Member {
  id: string;
  photoUrl: string;
  fullName: string;
  editLabel?: string;
  removeLabel?: string;
}

interface FieldGroupProps {
  label: string;
  value: React.ReactNode;
  required?: boolean;
  warning?: boolean;
}

function FieldGroup({ label, value, required, warning }: FieldGroupProps) {
  return (
    <div className="space-y-1.5">
      <span className="text-sm text-slate-500">
        {label}
        {required && <span className="text-slate-900"> *</span>}
      </span>
      <div className="flex items-center gap-2">
        <p className="text-slate-900 font-medium">{value}</p>
        {warning && (
          <AlertCircle className="w-4 h-4 text-[var(--ps-amber)]" />
        )}
      </div>
    </div>
  );
}

interface SectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 text-[var(--ps-blue)] text-xl font-medium mb-6">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function SecondaryMemberCard({
  member,
  onEdit,
  onRemove,
}: {
  member: Member;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={member.photoUrl}
          alt={member.fullName}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 font-semibold truncate">
          {member.fullName}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onEdit?.(member.id)}
            className="text-[var(--ps-blue)] hover:underline font-medium"
          >
            {member.editLabel ?? "Edit"}
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => onRemove?.(member.id)}
            className="text-[var(--ps-blue)] hover:underline font-medium"
          >
            {member.removeLabel ?? "Remove"}
          </button>
        </div>
      </div>
      <AlertCircle className="w-5 h-5 text-[var(--ps-amber)] shrink-0" />
    </div>
  );
}

export default function NewMembershipPage() {
  const [secondaryMembers] = useState<Member[]>([
    {
      id: "1",
      photoUrl: "https://i.pravatar.cc/150?u=mayra",
      fullName: "Mayra Treviño",
    },
    {
      id: "2",
      photoUrl: "https://i.pravatar.cc/150?u=pablo",
      fullName: "Pablo Treviño",
    },
  ]);

  const handleEdit = (id: string) => {
    console.log("Edit secondary member", id);
  };

  const handleRemove = (id: string) => {
    console.log("Remove secondary member", id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top action bar matching reference */}
      <div className="bg-[var(--ps-blue)] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-end gap-6 text-sm">
          <button className="flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Miraflores</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
            <Globe className="w-4 h-4" />
            <span>Guatemala</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
            <User className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Page header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-[var(--ps-blue)]">
              New membership
            </h1>
            <Button
              variant="outline"
              className="border-[var(--ps-blue)] text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] rounded-lg font-semibold w-full sm:w-auto"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Member ID
            </Button>
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar stepper */}
            <aside className="lg:w-56 shrink-0">
              <div className="flex lg:flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--ps-blue)] text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-[var(--ps-blue)] font-semibold text-sm">
                    Membership data
                  </span>
                </div>
                <div className="hidden lg:block h-6 w-px bg-slate-200 ml-4" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-slate-400 font-medium text-sm">
                    Payment
                  </span>
                </div>
              </div>
            </aside>

            {/* Main form */}
            <div className="flex-1 space-y-10">
              {/* Personal data */}
              <section>
                <SectionTitle icon={<Folder className="w-6 h-6" />}>
                  Personal data
                </SectionTitle>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar column */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-100">
                      <Image
                        src="https://i.pravatar.cc/300?u=nicolas"
                        alt="Member photo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--ps-blue)] hover:underline"
                    >
                      Change picture
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    <FieldGroup label="ID Type" value="DNI" />
                    <FieldGroup
                      label="ID Number"
                      value="IDGTM1234567890123S0123"
                    />
                    <FieldGroup label="Membership Type" value="Diamond" />
                    <FieldGroup label="Abbreviation" value="Mr." />
                    <FieldGroup label="First Name" value="Nicolás" />
                    <FieldGroup label="Last Name" value="Treviño" />
                    <FieldGroup label="Gender" value="Male" />
                    <FieldGroup label="Date of birth" value="13/09/1978" />
                    <FieldGroup label="Occupation" value="Urban planner" />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Contact */}
              <section>
                <SectionTitle icon={<Phone className="w-6 h-6" />}>
                  Contact
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <FieldGroup
                      label="Email address"
                      value="Customer declined to provide email address"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <FieldGroup
                      label="Mobile phone number"
                      value="+502 1234 5678"
                      required
                      warning
                    />
                  </div>
                  <FieldGroup
                    label="Home phone number"
                    value="+502 2345 6789"
                    required
                  />
                  <FieldGroup label="Notifications" value="By email address" />
                </div>
              </section>

              <Separator />

              {/* Address */}
              <section>
                <SectionTitle icon={<MapPin className="w-6 h-6" />}>
                  Address
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                  <div className="sm:col-span-2">
                    <FieldGroup
                      label="Address"
                      value="Km 46.5 Salida A Ciudad Vieja"
                      required
                    />
                  </div>
                  <FieldGroup label="Country" value="Guatemala" />
                  <FieldGroup label="State" value="Antigua" />
                  <FieldGroup label="City" value="Sacatepequez" />
                </div>
              </section>

              <Separator />

              {/* Secondary memberships */}
              <section>
                <SectionTitle icon={<Users className="w-6 h-6" />}>
                  Secondary memberships
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {secondaryMembers.map((member) => (
                    <SecondaryMemberCard
                      key={member.id}
                      member={member}
                      onEdit={handleEdit}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer actions */}
      <div className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-[var(--ps-blue)] text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] font-semibold rounded-lg flex-1 sm:flex-none"
                asChild
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-[var(--ps-blue)] text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] font-semibold rounded-lg flex-1 sm:flex-none"
              >
                Save changes
              </Button>
            </div>
            <Button className="bg-[var(--ps-blue)] hover:bg-[var(--ps-blue-dark)] text-white font-semibold rounded-lg px-8 w-full sm:w-auto">
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
