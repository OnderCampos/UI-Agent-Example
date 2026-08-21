"use client";

import { Check } from "lucide-react";

interface CheckoutProgressProps {
  currentStep: "shipping" | "payment" | "review";
}

const steps = [
  { id: "shipping", name: "Shipping", number: 1 },
  { id: "payment", name: "Payment", number: 2 },
  { id: "review", name: "Review", number: 3 },
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-[#0052a1] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block ${
                    isCurrent ? "text-[#0052a1]" : isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-3 ${
                    index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
