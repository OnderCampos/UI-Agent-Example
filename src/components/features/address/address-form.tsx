"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { UserAddress } from "@/types/user";

const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  isDefaultShipping: z.boolean(),
  isDefaultBilling: z.boolean(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: UserAddress;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const countries = [
  { code: "CR", name: "Costa Rica" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "SV", name: "El Salvador" },
  { code: "NI", name: "Nicaragua" },
  { code: "PA", name: "Panama" },
  { code: "CO", name: "Colombia" },
  { code: "DO", name: "Dominican Republic" },
  { code: "JM", name: "Jamaica" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "US", name: "United States" },
];

export function AddressForm({ 
  address, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: address?.label || "",
      firstName: address?.firstName || "",
      lastName: address?.lastName || "",
      streetAddress: address?.streetAddress || "",
      streetAddress2: address?.streetAddress2 || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "CR",
      phone: address?.phone || "",
      isDefaultShipping: address?.isDefaultShipping || false,
      isDefaultBilling: address?.isDefaultBilling || false,
    },
  });

  const isDefaultShipping = watch("isDefaultShipping");
  const isDefaultBilling = watch("isDefaultBilling");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Label (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="label" className="text-gray-700">
          Address Label <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <Input
          id="label"
          placeholder="e.g., Home, Work, Mom's House"
          {...register("label")}
          className="h-11 border-gray-300"
        />
      </div>

      {/* Name Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={`h-11 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={`h-11 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="streetAddress" className="text-gray-700">
          Street Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="streetAddress"
          placeholder="123 Main St"
          {...register("streetAddress")}
          className={`h-11 ${errors.streetAddress ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.streetAddress && (
          <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
        )}
      </div>

      {/* Street Address Line 2 */}
      <div className="space-y-2">
        <Label htmlFor="streetAddress2" className="text-gray-700">
          Apt, Suite, Unit <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <Input
          id="streetAddress2"
          placeholder="Apt 4B"
          {...register("streetAddress2")}
          className="h-11 border-gray-300"
        />
      </div>

      {/* City, State, Postal Code */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-gray-700">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            {...register("city")}
            className={`h-11 ${errors.city ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-gray-700">
            State/Province <span className="text-red-500">*</span>
          </Label>
          <Input
            id="state"
            {...register("state")}
            className={`h-11 ${errors.state ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-gray-700">
            Postal Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            className={`h-11 ${errors.postalCode ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country" className="text-gray-700">
          Country <span className="text-red-500">*</span>
        </Label>
        <select
          id="country"
          {...register("country")}
          className={`w-full h-11 px-3 rounded-md border bg-background text-sm ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700">
          Phone Number <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+506 1234-5678"
          {...register("phone")}
          className="h-11 border-gray-300"
        />
      </div>

      {/* Default Address Options */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="isDefaultShipping"
            checked={isDefaultShipping}
            onCheckedChange={(checked) => setValue("isDefaultShipping", checked as boolean)}
            className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
          />
          <Label
            htmlFor="isDefaultShipping"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Set as default shipping address
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="isDefaultBilling"
            checked={isDefaultBilling}
            onCheckedChange={(checked) => setValue("isDefaultBilling", checked as boolean)}
            className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
          />
          <Label
            htmlFor="isDefaultBilling"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Set as default billing address
          </Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          className="bg-[#0052a1] hover:bg-[#003d7a]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : address ? (
            "Update Address"
          ) : (
            "Add Address"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
