"use client";

import { Phone, AlertCircle, Mail, Bell } from "lucide-react";

interface ContactData {
  email: string;
  emailDeclined?: boolean;
  mobilePhone: string;
  homePhone: string;
  notifications: string;
  mobileWarning?: boolean;
}

interface ContactSectionProps {
  data: ContactData;
}

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <section className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-2 text-[#0052a1] mb-6">
        <Phone className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Contact</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              Email address <span className="text-red-500">*</span>
            </p>
          </div>
          {data.emailDeclined ? (
            <p className="text-base text-gray-900">
              Customer declined to provide email address
            </p>
          ) : (
            <p className="text-base font-medium text-gray-900">{data.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              Mobile phone number <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-base font-medium text-gray-900">{data.mobilePhone}</p>
            {data.mobileWarning && (
              <AlertCircle className="w-5 h-5 text-[#f5a623]" aria-label="Warning" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">
                Home phone number <span className="text-red-500">*</span>
              </p>
            </div>
            <p className="text-base font-medium text-gray-900">{data.homePhone}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Notifications</p>
            </div>
            <p className="text-base font-medium text-gray-900">{data.notifications}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
