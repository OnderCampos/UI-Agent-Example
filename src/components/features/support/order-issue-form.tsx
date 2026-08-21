"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2, CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { OrderIssueType, OrderResolution } from "@/types/support";

const orderIssueSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  issueType: z.enum(["damaged", "missing_items", "wrong_items", "late_delivery", "never_received", "quality", "other"]),
  affectedItems: z.string().optional(),
  description: z.string().min(20, "Please provide more details about the issue"),
  preferredResolution: z.enum(["refund", "replacement", "store_credit", "other"]),
});

type OrderIssueFormValues = z.infer<typeof orderIssueSchema>;

const issueTypes: { value: OrderIssueType; label: string; icon: string }[] = [
  { value: "damaged", label: "Damaged Items", icon: "📦" },
  { value: "missing_items", label: "Missing Items", icon: "❓" },
  { value: "wrong_items", label: "Wrong Items Received", icon: "🔄" },
  { value: "late_delivery", label: "Late Delivery", icon: "⏰" },
  { value: "never_received", label: "Never Received", icon: "📭" },
  { value: "quality", label: "Quality Issue", icon: "⚠️" },
  { value: "other", label: "Other", icon: "📝" },
];

const resolutionOptions: { value: OrderResolution; label: string }[] = [
  { value: "refund", label: "Full Refund" },
  { value: "replacement", label: "Replacement" },
  { value: "store_credit", label: "Store Credit" },
  { value: "other", label: "Other (specify in description)" },
];

interface OrderIssueFormProps {
  orderId?: string;
  className?: string;
  onSuccess?: () => void;
}

export function OrderIssueForm({ orderId, className, onSuccess }: OrderIssueFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderIssueFormValues>({
    resolver: zodResolver(orderIssueSchema),
    defaultValues: {
      orderId: orderId || "",
      issueType: "damaged",
      preferredResolution: "refund",
    },
  });

  const onSubmit = async (data: OrderIssueFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          priority: "high",
          subject: `Order Issue: ${data.orderId} - ${data.issueType.replace(/_/g, " ")}`,
          description: data.description,
          orderId: data.orderId,
          metadata: {
            issueType: data.issueType,
            affectedItems: data.affectedItems,
            preferredResolution: data.preferredResolution,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to submit");
      }

      setTicketNumber(result.data.id);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Order issue form error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Issue Reported!
        </h3>
        <p className="text-gray-600 mb-2">
          We've received your order issue report and will investigate promptly.
        </p>
        {ticketNumber && (
          <p className="text-lg font-mono font-semibold text-[#0052a1] mb-4">
            Ticket #{ticketNumber}
          </p>
        )}
        <p className="text-sm text-gray-500 mb-6">
          You'll receive an email with next steps within 24 hours.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setTicketNumber(null);
            reset();
          }}
          variant="outline"
        >
          Report Another Issue
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
      {/* Order ID */}
      <div className="space-y-2">
        <Label htmlFor="orderId">Order Number *</Label>
        <div className="relative">
          <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="orderId"
            {...register("orderId")}
            placeholder="e.g., ORD-12345"
            className={cn("pl-10", errors.orderId && "border-red-500")}
          />
        </div>
        {errors.orderId && (
          <p className="text-sm text-red-500">{errors.orderId.message}</p>
        )}
      </div>

      {/* Issue Type */}
      <div className="space-y-2">
        <Label>What's the issue? *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {issueTypes.map((type) => (
            <label
              key={type.value}
              className="relative cursor-pointer"
            >
              <input
                type="radio"
                {...register("issueType")}
                value={type.value}
                className="peer sr-only"
              />
              <div className="p-3 border-2 border-gray-200 rounded-lg text-center peer-checked:border-[#0052a1] peer-checked:bg-[#e6f0fa] transition-colors">
                <span className="text-2xl mb-1 block">{type.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {type.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Affected Items */}
      <div className="space-y-2">
        <Label htmlFor="affectedItems">Affected Items (optional)</Label>
        <Input
          id="affectedItems"
          {...register("affectedItems")}
          placeholder="List the specific items affected"
        />
        <p className="text-xs text-gray-500">
          If only some items are affected, please list them here
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Describe the Issue *</Label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          placeholder="Please provide details about the issue. Include any relevant information such as the condition of items, packaging, etc."
          className={cn(
            "w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1] resize-none",
            errors.description && "border-red-500"
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Preferred Resolution */}
      <div className="space-y-2">
        <Label htmlFor="preferredResolution">Preferred Resolution *</Label>
        <select
          id="preferredResolution"
          {...register("preferredResolution")}
          className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
        >
          {resolutionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Please note:</p>
          <ul className="list-disc list-inside space-y-1 text-amber-700">
            <li>Keep the original packaging if possible</li>
            <li>Take photos of any damage or issues</li>
            <li>Resolution times may vary based on the issue</li>
          </ul>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0052a1] hover:bg-[#003d7a]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Report Issue
          </>
        )}
      </Button>
    </form>
  );
}
