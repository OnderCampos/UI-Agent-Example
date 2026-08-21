"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { EInvoiceCountry } from "@/types/invoice";
import { TAX_ID_TYPES, INVOICE_COUNTRY_CONFIG } from "@/types/invoice";

const invoiceFormSchema = z.object({
  country: z.enum(["MX", "CR", "PA", "CO", "CL", "PE"]),
  taxIdType: z.string().min(1, "Tax ID type is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email required"),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  // Mexico-specific
  usoCfdi: z.string().optional(),
  regimenFiscal: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface InvoiceFormProps {
  orderId: string;
  defaultCountry?: EInvoiceCountry;
  onSubmit: (data: InvoiceFormValues) => Promise<void>;
  className?: string;
}

export function InvoiceForm({
  orderId,
  defaultCountry = "CR",
  onSubmit,
  className,
}: InvoiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [taxIdValidation, setTaxIdValidation] = useState<{
    valid: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      country: defaultCountry,
    },
  });

  const selectedCountry = watch("country") as EInvoiceCountry;
  const selectedTaxIdType = watch("taxIdType");
  const taxId = watch("taxId");

  // Get available tax ID types for selected country
  const taxIdTypes = TAX_ID_TYPES[selectedCountry] || [];
  const countryConfig = INVOICE_COUNTRY_CONFIG[selectedCountry];

  // Set default tax ID type when country changes
  useEffect(() => {
    if (taxIdTypes.length > 0 && !selectedTaxIdType) {
      setValue("taxIdType", taxIdTypes[0].code);
    }
  }, [selectedCountry, taxIdTypes, selectedTaxIdType, setValue]);

  // Validate tax ID
  const validateTaxId = async () => {
    if (!taxId || !selectedTaxIdType) return;

    setIsValidating(true);
    try {
      const response = await fetch("/api/invoices/validate-tax-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry,
          taxId,
          taxIdType: selectedTaxIdType,
        }),
      });

      const result = await response.json();
      setTaxIdValidation({
        valid: result.data?.valid || false,
        message: result.data?.message,
      });
    } catch {
      setTaxIdValidation({ valid: false, message: "Validation failed" });
    } finally {
      setIsValidating(false);
    }
  };

  const handleFormSubmit = async (data: InvoiceFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn("space-y-6", className)}
    >
      {/* Country Selection */}
      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <select
          id="country"
          {...register("country")}
          className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
        >
          {Object.entries(INVOICE_COUNTRY_CONFIG).map(([code, config]) => (
            <option key={code} value={code}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tax ID Type & Number */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="taxIdType">ID Type *</Label>
          <select
            id="taxIdType"
            {...register("taxIdType")}
            className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
          >
            {taxIdTypes.map((type) => (
              <option key={type.code} value={type.code}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID *</Label>
          <div className="relative">
            <Input
              id="taxId"
              {...register("taxId")}
              onBlur={validateTaxId}
              placeholder={taxIdTypes[0]?.name || "Enter tax ID"}
              className={cn(
                errors.taxId && "border-red-500",
                taxIdValidation?.valid === true && "border-green-500",
                taxIdValidation?.valid === false && "border-red-500"
              )}
            />
            {isValidating && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
            )}
            {!isValidating && taxIdValidation?.valid === true && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
            {!isValidating && taxIdValidation?.valid === false && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          {taxIdValidation?.message && (
            <p className={cn(
              "text-sm",
              taxIdValidation.valid ? "text-green-600" : "text-red-500"
            )}>
              {taxIdValidation.message}
            </p>
          )}
          {errors.taxId && (
            <p className="text-sm text-red-500">{errors.taxId.message}</p>
          )}
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Full Name / Business Name *</Label>
          <Input
            id="customerName"
            {...register("customerName")}
            className={errors.customerName ? "border-red-500" : ""}
          />
          {errors.customerName && (
            <p className="text-sm text-red-500">{errors.customerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email *</Label>
          <Input
            id="customerEmail"
            type="email"
            {...register("customerEmail")}
            className={errors.customerEmail ? "border-red-500" : ""}
          />
          {errors.customerEmail && (
            <p className="text-sm text-red-500">{errors.customerEmail.message}</p>
          )}
        </div>
      </div>

      {/* Address (conditional based on country) */}
      {countryConfig?.requiresAddress && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Billing Address</h3>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" {...register("street")} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" {...register("state")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" {...register("postalCode")} />
            </div>
          </div>
        </div>
      )}

      {/* Mexico-specific fields */}
      {selectedCountry === "MX" && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">CFDI Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usoCfdi">Uso del CFDI</Label>
              <select
                id="usoCfdi"
                {...register("usoCfdi")}
                className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
              >
                <option value="G03">G03 - Gastos en general</option>
                <option value="G01">G01 - Adquisicion de mercancias</option>
                <option value="P01">P01 - Por definir</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regimenFiscal">Regimen Fiscal</Label>
              <select
                id="regimenFiscal"
                {...register("regimenFiscal")}
                className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
              >
                <option value="601">601 - General de Ley PM</option>
                <option value="612">612 - Personas Fisicas con AE y Prof</option>
                <option value="626">626 - RESICO</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || taxIdValidation?.valid === false}
        className="w-full bg-[#0052a1] hover:bg-[#003d7a]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Invoice...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Invoice will be sent to the email address provided
      </p>
    </form>
  );
}
