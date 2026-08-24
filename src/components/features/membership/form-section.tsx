"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function FormSection({
  icon: Icon,
  title,
  children,
  className,
  titleClassName,
}: FormSectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      <div className="flex items-center gap-2 mb-6">
        <Icon className={cn("w-5 h-5 text-[#003d7a]", titleClassName)} />
        <h2 className={cn("text-xl font-semibold text-[#003d7a]", titleClassName)}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
