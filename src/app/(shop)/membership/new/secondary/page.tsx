"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Folder,
  Globe,
  Home,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FormSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

function FormSelect({
  id,
  label,
  placeholder = "Select",
  required,
}: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-slate-900"> *</span>}
      </Label>
      <div className="relative">
        <select
          id={id}
          className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

interface FormInputProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

function FormInput({
  id,
  label,
  placeholder,
  required,
  type = "text",
  disabled,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-slate-900"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="h-10 rounded-md border-input bg-background text-sm placeholder:text-slate-400"
      />
    </div>
  );
}

interface SectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-center gap-2 text-xl font-medium text-[var(--ps-blue)]">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default function NewSecondaryMembershipPage() {
  const [sameAddress, setSameAddress] = useState(false);
  const [emailDeclined, setEmailDeclined] = useState(false);
  const [mobileDeclined, setMobileDeclined] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top action bar */}
      <div className="bg-[var(--ps-blue)] text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <span className="text-xl font-bold tracking-tight md:text-2xl">
            Price<span className="text-[var(--ps-amber)]">Smart</span>
          </span>
          <div className="flex items-center gap-6 text-sm">
            <button className="flex items-center gap-1.5 transition-colors hover:text-[var(--ps-amber)]">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-[var(--ps-amber)]">
              <Globe className="h-4 w-4" />
              <span>Guatemala</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-[var(--ps-amber)]">
              <User className="h-4 w-4" />
              <span>English</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Page header */}
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-[var(--ps-blue)] md:text-3xl">
              Nicolas Treviño
            </h1>
            <p className="text-slate-500">Primary membership</p>
          </div>
        </div>

        {/* Section title and capture button */}
        <div className="container mx-auto px-4 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-medium text-[var(--ps-blue)] md:text-2xl">
              New secondary membership
            </h2>
            <Button
              variant="outline"
              className="w-full rounded-lg border-[var(--ps-blue)] font-semibold text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] sm:w-auto"
            >
              Capture Member ID
            </Button>
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar stepper */}
            <aside className="shrink-0 lg:w-56">
              <div className="flex gap-4 lg:flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ps-blue)] text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-sm font-semibold text-[var(--ps-blue)]">
                    Membership data
                  </span>
                </div>
                <div className="ml-4 hidden h-6 w-px bg-slate-200 lg:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-400">
                    2
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    Payment
                  </span>
                </div>
              </div>
            </aside>

            {/* Main form */}
            <div className="flex-1 space-y-10">
              {/* Personal data */}
              <section>
                <SectionTitle icon={<Folder className="h-6 w-6" />}>
                  Personal data
                </SectionTitle>
                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Photo column */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="relative h-36 w-36 rounded-full bg-slate-200" />
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--ps-blue)] hover:underline"
                    >
                      Take photo
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                    <FormSelect id="id-type" label="ID Type" required />
                    <FormInput
                      id="id-number"
                      label="ID Number"
                      placeholder="Enter ID number"
                      required
                    />
                    <FormSelect
                      id="membership-type"
                      label="Membership type"
                      required
                    />
                    <FormSelect id="abbreviation" label="Abbreviation" />
                    <FormInput
                      id="first-name"
                      label="First Name"
                      placeholder="Enter first name"
                      required
                    />
                    <FormInput
                      id="last-name"
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                    />
                    <FormSelect id="gender" label="Gender" />
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="date-of-birth"
                        className="text-sm font-medium text-slate-700"
                      >
                        Date of birth <span className="text-slate-900">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="date-of-birth"
                          type="text"
                          placeholder="Select"
                          className="h-10 rounded-md border-input bg-background pr-10 text-sm placeholder:text-slate-400"
                        />
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                          <svg
                            className="h-4 w-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="16"
                              rx="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <FormSelect id="occupation" label="Occupation" />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Contact */}
              <section>
                <SectionTitle icon={<Phone className="h-6 w-6" />}>
                  Contact
                </SectionTitle>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[1fr_auto_auto]">
                    <FormInput
                      id="email"
                      label="Email address"
                      placeholder="Enter your email address"
                      required
                      type="email"
                      disabled={emailDeclined}
                    />
                    <Button
                      variant="outline"
                      className="h-10 rounded-lg border-slate-300 px-6 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                      disabled={emailDeclined}
                    >
                      Send code
                    </Button>
                    <div className="flex items-center gap-2 pb-2.5">
                      <Checkbox
                        id="email-declined"
                        checked={emailDeclined}
                        onCheckedChange={(checked) =>
                          setEmailDeclined(checked === true)
                        }
                      />
                      <Label
                        htmlFor="email-declined"
                        className="cursor-pointer text-sm font-normal text-slate-700"
                      >
                        Customer declines to provide email address
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[1fr_auto_auto]">
                    <FormInput
                      id="mobile-phone"
                      label="Mobile phone number"
                      placeholder="Enter your phone number"
                      required
                      type="tel"
                      disabled={mobileDeclined}
                    />
                    <Button
                      variant="outline"
                      className="h-10 rounded-lg border-slate-300 px-6 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                      disabled={mobileDeclined}
                    >
                      Send code
                    </Button>
                    <div className="flex items-center gap-2 pb-2.5">
                      <Checkbox
                        id="mobile-declined"
                        checked={mobileDeclined}
                        onCheckedChange={(checked) =>
                          setMobileDeclined(checked === true)
                        }
                      />
                      <Label
                        htmlFor="mobile-declined"
                        className="cursor-pointer text-sm font-normal text-slate-700"
                      >
                        Customer declines to provide mobile phone number
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <FormInput
                      id="home-phone"
                      label="Home phone number"
                      placeholder="Enter your home phone number"
                      type="tel"
                    />
                    <FormSelect id="notifications" label="Notifications" />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Address */}
              <section>
                <SectionTitle icon={<MapPin className="h-6 w-6" />}>
                  Address
                </SectionTitle>
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="same-address"
                      checked={sameAddress}
                      onCheckedChange={(checked) =>
                        setSameAddress(checked === true)
                      }
                    />
                    <Label
                      htmlFor="same-address"
                      className="cursor-pointer text-sm font-normal text-slate-700"
                    >
                      Same address as primary member
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                      <FormInput
                        id="address"
                        label="Address"
                        placeholder="Enter your address"
                        required
                      />
                    </div>
                    <FormSelect id="country" label="Country" />
                    <FormSelect id="state" label="State" />
                    <FormSelect id="city" label="City" />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer actions */}
      <div className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-[var(--ps-blue)] font-semibold text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] sm:flex-none"
                asChild
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-[var(--ps-blue)] font-semibold text-[var(--ps-blue)] hover:bg-[var(--ps-blue-lighter)] sm:flex-none"
              >
                Save changes
              </Button>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button className="flex-1 rounded-lg bg-[#d9531e] font-semibold text-white hover:bg-[#c4491b] sm:flex-none sm:px-8">
                Previous
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-slate-300 bg-slate-100 font-semibold text-slate-500 hover:bg-slate-200 sm:flex-none sm:px-8"
              >
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
