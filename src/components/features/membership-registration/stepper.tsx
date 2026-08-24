"use client";

import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  number: number;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const activeIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Membership registration progress">
      <ol className="space-y-6">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < activeIndex;

          return (
            <li key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors",
                    isActive &&
                      "bg-[#0052a1] border-[#0052a1] text-white",
                    isCompleted &&
                      "bg-[#0052a1] border-[#0052a1] text-white",
                    !isActive && !isCompleted &&
                      "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium mt-1.5",
                  isActive && "text-[#0052a1]",
                  isCompleted && "text-gray-900",
                  !isActive && !isCompleted && "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
