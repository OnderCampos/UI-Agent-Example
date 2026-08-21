"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ticket, Loader2, CheckCircle, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { SupportTicketType, SupportTicketPriority } from "@/types/support";

const ticketFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  type: z.enum(["general", "order", "return", "technical", "billing", "membership", "feedback"]),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  orderId: z.string().optional(),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

const ticketTypes: { value: SupportTicketType; label: string }[] = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Issue" },
  { value: "return", label: "Returns & Refunds" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing Question" },
  { value: "membership", label: "Membership" },
  { value: "feedback", label: "Feedback" },
];

const priorityLevels: { value: SupportTicketPriority; label: string; description: string }[] = [
  { value: "low", label: "Low", description: "General questions, no urgency" },
  { value: "normal", label: "Normal", description: "Standard issues" },
  { value: "high", label: "High", description: "Affecting orders or account" },
  { value: "urgent", label: "Urgent", description: "Critical, needs immediate attention" },
];

interface TicketFormProps {
  className?: string;
  onSuccess?: (ticketId: string) => void;
}

export function TicketForm({ className, onSuccess }: TicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      type: "general",
      priority: "normal",
    },
  });

  const selectedType = watch("type");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TicketFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          attachmentCount: attachments.length,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to create ticket");
      }

      setTicketId(result.data.id);
      onSuccess?.(result.data.id);
    } catch (error) {
      console.error("Ticket form error:", error);
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ticketId) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Ticket Created!
        </h3>
        <p className="text-gray-600 mb-2">
          Your support ticket has been submitted successfully.
        </p>
        <p className="text-lg font-mono font-semibold text-[#0052a1] mb-6">
          Ticket #{ticketId}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          We've sent a confirmation to your email. You'll receive updates on your ticket status.
        </p>
        <Button
          onClick={() => {
            setTicketId(null);
            setAttachments([]);
            reset();
          }}
          variant="outline"
        >
          Submit Another Ticket
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Type & Priority */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Issue Type *</Label>
          <select
            id="type"
            {...register("type")}
            className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
          >
            {ticketTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority *</Label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
          >
            {priorityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label} - {level.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order ID (conditional) */}
      {(selectedType === "order" || selectedType === "return") && (
        <div className="space-y-2">
          <Label htmlFor="orderId">Order Number</Label>
          <Input
            id="orderId"
            {...register("orderId")}
            placeholder="e.g., ORD-12345"
          />
        </div>
      )}

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="Brief summary of your issue"
          className={errors.subject ? "border-red-500" : ""}
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <textarea
          id="description"
          {...register("description")}
          rows={6}
          placeholder="Please describe your issue in detail. Include any relevant information that might help us assist you better."
          className={cn(
            "w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1] resize-none",
            errors.description && "border-red-500"
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <Label>Attachments (optional)</Label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
          <input
            type="file"
            id="attachments"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="attachments"
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload files (max 5)
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Images, PDFs, or documents
            </span>
          </label>
        </div>

        {/* Attachment list */}
        {attachments.length > 0 && (
          <ul className="space-y-2 mt-2">
            {attachments.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
              >
                <span className="text-sm text-gray-600 truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        )}
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
            Creating Ticket...
          </>
        ) : (
          <>
            <Ticket className="w-4 h-4 mr-2" />
            Submit Ticket
          </>
        )}
      </Button>
    </form>
  );
}
