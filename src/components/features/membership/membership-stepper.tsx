"use client";

import { cn } from "@/lib/utils";

export interface MembershipStep {
  id: number;
  name: string;
  href?: string;
}

interface MembershipStepperProps {
  steps: MembershipStep[];
  currentStepId: number;
  className?: string;
}

export function MembershipStepper({
  steps,
  currentStepId,
  className,
}: MembershipStepperProps) {
  return (
    <nav className={cn("space-y-2", className)}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStepId;
        const isCompleted = step.id < currentStepId;

        return (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  isActive
                    ? "bg-[#003d7a] text-white"
                    : isCompleted
                      ? "bg-[#0052a1] text-white"
                      : "bg-gray-200 text-gray-500"
                )}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-1" />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium pt-1.5",
                isActive ? "text-[#003d7a]" : "text-gray-500"
              )}
            >
              {step.name}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
