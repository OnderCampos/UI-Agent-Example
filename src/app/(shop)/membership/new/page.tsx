"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Phone,
  MapPin,
  Users,
  Home,
  Camera,
  AlertCircle,
  Pencil,
  ArrowRight,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

interface PersonalData {
  avatarUrl: string;
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
}

interface ContactData {
  email: string;
  declinedEmail: boolean;
  mobilePhone: string;
  homePhone: string;
  notifications: string;
}

interface Member {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
}

interface AddressData {
  address: string;
  country: string;
  state: string;
  city: string;
}

// ------------------------------------------------------------------
// Mock Data
// ------------------------------------------------------------------

const initialPersonalData: PersonalData = {
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face",
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
};

const initialContactData: ContactData = {
  email: "",
  declinedEmail: true,
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
};

const initialAddressData: AddressData = {
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
};

const initialSecondaryMembers: Member[] = [
  {
    id: "sm-1",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    firstName: "Mayra",
    lastName: "Treviño",
  },
  {
    id: "sm-2",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    firstName: "Pablo",
    lastName: "Treviño",
  },
];

// ------------------------------------------------------------------
// Reusable UI Components
// ------------------------------------------------------------------

interface SectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-semibold text-[#002d5c] mb-6">
      {icon}
      {children}
    </h2>
  );
}

interface DataRowProps {
  label: string;
  value: string;
  required?: boolean;
}

function DataRow({ label, value, required = false }: DataRowProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-500">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </p>
      <p className="text-[15px] font-medium text-[#002d5c]">{value}</p>
    </div>
  );
}

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm text-gray-500">{label}</Label>
      <div className="flex h-10 items-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-[#002d5c]">
        {value}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------

function Stepper() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0052a1] text-sm font-semibold text-white">
          1
        </span>
        <span className="text-sm font-semibold text-[#002d5c]">Membership data</span>
      </div>
      <div className="ml-3.5 h-6 w-px bg-gray-300" />
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-400">
          2
        </span>
        <span className="text-sm font-medium text-gray-400">Payment</span>
      </div>
    </div>
  );
}

interface PersonalDataSectionProps {
  data: PersonalData;
  editing: boolean;
  onChange: (data: PersonalData) => void;
}

function PersonalDataSection({ data, editing, onChange }: PersonalDataSectionProps) {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section>
      <SectionTitle icon={<FolderOpen className="h-5 w-5" />}>Personal data</SectionTitle>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 lg:w-40">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img
              src={data.avatarUrl}
              alt={`${data.firstName} ${data.lastName}`}
              className="h-full w-full object-cover"
            />
          </div>
          <button className="text-sm font-medium text-[#0052a1] hover:underline">
            Change picture
          </button>
        </div>

        {/* Fields */}
        <div className="grid flex-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {editing ? (
            <>
              <ReadOnlyField label="ID Type" value={data.idType} />
              <ReadOnlyField label="ID Number" value={data.idNumber} />
              <ReadOnlyField label="Membership Type" value={data.membershipType} />
              <ReadOnlyField label="Abbreviation" value={data.abbreviation} />
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-500">First Name</Label>
                <Input
                  value={data.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-500">Last Name</Label>
                <Input
                  value={data.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-500">Gender</Label>
                <Input
                  value={data.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-500">Date of birth</Label>
                <Input
                  value={data.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-gray-500">Occupation</Label>
                <Input
                  value={data.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
                />
              </div>
            </>
          ) : (
            <>
              <DataRow label="ID Type" value={data.idType} />
              <DataRow label="ID Number" value={data.idNumber} />
              <DataRow label="Membership Type" value={data.membershipType} />
              <DataRow label="Abbreviation" value={data.abbreviation} />
              <DataRow label="First Name" value={data.firstName} />
              <DataRow label="Last Name" value={data.lastName} />
              <DataRow label="Gender" value={data.gender} />
              <DataRow label="Date of birth" value={data.dateOfBirth} />
              <DataRow label="Occupation" value={data.occupation} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

interface ContactSectionProps {
  data: ContactData;
  editing: boolean;
  onChange: (data: ContactData) => void;
}

function ContactSection({ data, editing, onChange }: ContactSectionProps) {
  const handleChange = (field: keyof ContactData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section>
      <SectionTitle icon={<Phone className="h-5 w-5" />}>Contact</SectionTitle>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {editing ? (
          <>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-sm text-gray-500">
                Email address <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.email}
                placeholder="Enter email address"
                disabled={data.declinedEmail}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1] disabled:bg-gray-100"
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="declinedEmail"
                type="checkbox"
                checked={data.declinedEmail}
                onChange={(e) => handleChange("declinedEmail", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#0052a1] focus:ring-[#0052a1]"
              />
              <Label htmlFor="declinedEmail" className="text-sm text-gray-600">
                Customer declined to provide email address
              </Label>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-500">
                Mobile phone number <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.mobilePhone}
                onChange={(e) => handleChange("mobilePhone", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-500">
                Home phone number <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.homePhone}
                onChange={(e) => handleChange("homePhone", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-500">Notifications</Label>
              <Input
                value={data.notifications}
                onChange={(e) => handleChange("notifications", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1.5 sm:col-span-2">
              <DataRow label="Email address" value={data.declinedEmail ? "Customer declined to provide email address" : data.email || "—"} required />
            </div>
            <div className="space-y-1.5">
              <DataRow label="Mobile phone number" value={data.mobilePhone} required />
            </div>
            <div />
            <div className="space-y-1.5">
              <DataRow label="Home phone number" value={data.homePhone} required />
            </div>
            <div className="space-y-1.5">
              <DataRow label="Notifications" value={data.notifications} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

interface AddressSectionProps {
  data: AddressData;
  editing: boolean;
  onChange: (data: AddressData) => void;
}

function AddressSection({ data, editing, onChange }: AddressSectionProps) {
  const handleChange = (field: keyof AddressData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section>
      <SectionTitle icon={<MapPin className="h-5 w-5" />}>Address</SectionTitle>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {editing ? (
          <>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-sm text-gray-500">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-500">Country</Label>
              <Input
                value={data.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-500">State</Label>
              <Input
                value={data.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
            <div className="space-y-1.5 sm:col-start-3">
              <Label className="text-sm text-gray-500">City</Label>
              <Input
                value={data.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="border-gray-200 text-[#002d5c] focus-visible:ring-[#0052a1]"
              />
            </div>
          </>
        ) : (
          <>
            <DataRow label="Address" value={data.address} required />
            <DataRow label="Country" value={data.country} />
            <DataRow label="State" value={data.state} />
            <DataRow label="City" value={data.city} />
          </>
        )}
      </div>
    </section>
  );
}

interface SecondaryMembershipCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onRemove: (id: string) => void;
}

function SecondaryMembershipCard({ member, onEdit, onRemove }: SecondaryMembershipCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <img
        src={member.avatarUrl}
        alt={`${member.firstName} ${member.lastName}`}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-[#002d5c]">
          {member.firstName} {member.lastName}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => onEdit(member)}
            className="font-medium text-[#0052a1] hover:underline"
          >
            Edit
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onRemove(member.id)}
            className="font-medium text-[#0052a1] hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#f5a623]" />
    </div>
  );
}

interface SecondaryMembershipsSectionProps {
  members: Member[];
  onChange: (members: Member[]) => void;
}

function SecondaryMembershipsSection({ members, onChange }: SecondaryMembershipsSectionProps) {
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [draftFirstName, setDraftFirstName] = useState("");
  const [draftLastName, setDraftLastName] = useState("");

  const handleSave = () => {
    if (!draftFirstName.trim() || !draftLastName.trim()) return;

    if (editingMember) {
      onChange(
        members.map((m) =>
          m.id === editingMember.id
            ? { ...m, firstName: draftFirstName.trim(), lastName: draftLastName.trim() }
            : m
        )
      );
    } else {
      onChange([
        ...members,
        {
          id: `sm-${Date.now()}`,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(draftFirstName + " " + draftLastName)}&background=0052a1&color=fff`,
          firstName: draftFirstName.trim(),
          lastName: draftLastName.trim(),
        },
      ]);
    }

    setDraftFirstName("");
    setDraftLastName("");
    setEditingMember(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setDraftFirstName(member.firstName);
    setDraftLastName(member.lastName);
    setIsAddDialogOpen(true);
  };

  const handleRemove = (id: string) => {
    onChange(members.filter((m) => m.id !== id));
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setDraftFirstName("");
    setDraftLastName("");
    setIsAddDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingMember(null);
    setDraftFirstName("");
    setDraftLastName("");
    setIsAddDialogOpen(false);
  };

  return (
    <section>
      <SectionTitle icon={<Users className="h-5 w-5" />}>Secondary memberships</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <SecondaryMembershipCard
            key={member.id}
            member={member}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}

        <button
          onClick={handleOpenAdd}
          className="flex min-h-[88px] items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-sm font-medium text-[#0052a1] transition-colors hover:border-[#0052a1] hover:bg-[#0052a1]/5"
        >
          <Users className="h-5 w-5" />
          Add secondary member
        </button>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#002d5c]">
                {editingMember ? "Edit secondary member" : "Add secondary member"}
              </DialogTitle>
              <DialogDescription>
                Enter the name of the secondary membership holder.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={draftFirstName}
                  onChange={(e) => setDraftFirstName(e.target.value)}
                  placeholder="First name"
                  className="border-gray-200 focus-visible:ring-[#0052a1]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={draftLastName}
                  onChange={(e) => setDraftLastName(e.target.value)}
                  placeholder="Last name"
                  className="border-gray-200 focus-visible:ring-[#0052a1]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#0052a1] hover:bg-[#003d7a]">
                {editingMember ? "Save changes" : "Add member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------

export default function NewMembershipPage() {
  const router = useRouter();

  const [personalData, setPersonalData] = useState<PersonalData>(initialPersonalData);
  const [contactData, setContactData] = useState<ContactData>(initialContactData);
  const [addressData, setAddressData] = useState<AddressData>(initialAddressData);
  const [secondaryMembers, setSecondaryMembers] = useState<Member[]>(initialSecondaryMembers);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveChanges = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    setEditing(false);
  };

  const handlePayment = () => {
    router.push("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header strip */}
      <div className="bg-[#003d7a] py-3" />

      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-[#002d5c]">New membership</h1>
          <Button
            variant="outline"
            className="w-fit border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Stepper sidebar */}
          <aside className="lg:w-48 lg:flex-shrink-0">
            <div className="sticky top-24">
              <Stepper />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-10">
            <PersonalDataSection
              data={personalData}
              editing={editing}
              onChange={setPersonalData}
            />

            <div className="border-t border-gray-200" />

            <ContactSection
              data={contactData}
              editing={editing}
              onChange={setContactData}
            />

            <div className="border-t border-gray-200" />

            <AddressSection
              data={addressData}
              editing={editing}
              onChange={setAddressData}
            />

            <div className="border-t border-gray-200" />

            <SecondaryMembershipsSection
              members={secondaryMembers}
              onChange={setSecondaryMembers}
            />
          </main>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 z-30 border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 sm:w-auto"
                onClick={editing ? handleSaveChanges : () => setEditing(true)}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <Button
              className="w-full bg-[#003d7a] text-white hover:bg-[#002d5c] sm:w-auto"
              onClick={handlePayment}
            >
              Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
