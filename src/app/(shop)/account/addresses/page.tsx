"use client";

import { useState, useEffect } from "react";
import { Plus, MapPin, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddressForm, AddressCard, type AddressFormData } from "@/components/features/address";
import { useToast } from "@/hooks/use-toast";
import type { UserAddress } from "@/types/user";

// Mock addresses for demo
const mockAddresses: UserAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main Street",
    streetAddress2: "Apt 4B",
    city: "San Jose",
    state: "San Jose",
    postalCode: "10101",
    country: "CR",
    phone: "+506 8888-1234",
    isDefault: true,
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr-2",
    label: "Work",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "456 Business Ave",
    city: "Escazu",
    state: "San Jose",
    postalCode: "10201",
    country: "CR",
    phone: "+506 2222-5678",
    isDefault: false,
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

export default function AddressesPage() {
  const { toast } = useToast();
  
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  // Load addresses
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        // In real app, fetch from API
        // const res = await fetch("/api/user/addresses");
        // const data = await res.json();
        // setAddresses(data.data);
        
        // For demo, use mock data
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAddresses(mockAddresses);
      } catch (_err) {
        toast({
          variant: "destructive",
          title: "Failed to load addresses",
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, [toast]);

  const handleAddAddress = async (data: AddressFormData) => {
    setIsSaving(true);

    try {
      // In real app, call API
      // await fetch("/api/user/addresses", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // For demo, add to local state
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newAddress: UserAddress = {
        id: `addr-${Date.now()}`,
        ...data,
        isDefault: data.isDefaultShipping || data.isDefaultBilling,
      };

      // Update default flags on other addresses if needed
      let updatedAddresses = [...addresses];
      if (data.isDefaultShipping) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefaultShipping: false,
        }));
      }
      if (data.isDefaultBilling) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefaultBilling: false,
        }));
      }

      setAddresses([...updatedAddresses, newAddress]);
      setShowForm(false);

      toast({
        title: "Address added",
        description: "Your new address has been saved.",
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to add address",
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAddress = async (data: AddressFormData) => {
    if (!editingAddress) return;
    
    setIsSaving(true);

    try {
      // In real app, call API
      // await fetch(`/api/user/addresses/${editingAddress.id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // For demo, update local state
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let updatedAddresses = addresses.map((addr) => {
        if (addr.id === editingAddress.id) {
          return {
            ...addr,
            ...data,
            isDefault: data.isDefaultShipping || data.isDefaultBilling,
          };
        }
        // Update default flags on other addresses if needed
        if (data.isDefaultShipping && addr.isDefaultShipping) {
          return { ...addr, isDefaultShipping: false };
        }
        if (data.isDefaultBilling && addr.isDefaultBilling) {
          return { ...addr, isDefaultBilling: false };
        }
        return addr;
      });

      setAddresses(updatedAddresses);
      setEditingAddress(null);

      toast({
        title: "Address updated",
        description: "Your address has been updated.",
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to update address",
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    setIsDeleting(addressId);

    try {
      // In real app, call API
      // await fetch(`/api/user/addresses/${addressId}`, {
      //   method: "DELETE",
      // });

      // For demo, remove from local state
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAddresses(addresses.filter((addr) => addr.id !== addressId));

      toast({
        title: "Address deleted",
        description: "The address has been removed.",
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to delete address",
        description: "Please try again.",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSetDefault = async (addressId: string, type: "shipping" | "billing") => {
    try {
      // In real app, call API
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const key = type === "shipping" ? "isDefaultShipping" : "isDefaultBilling";
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          [key]: addr.id === addressId,
          isDefault: addr.id === addressId ? true : addr.isDefault,
        }))
      );

      toast({
        title: `Default ${type} updated`,
        description: `Address set as default ${type} address.`,
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to update default",
        description: "Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
          <p className="text-gray-600">Manage your shipping and billing addresses</p>
        </div>
        {!showForm && !editingAddress && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#0052a1] hover:bg-[#003d7a]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(showForm || editingAddress) && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>
          <AddressForm
            address={editingAddress || undefined}
            onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
            onCancel={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
            isLoading={isSaving}
          />
        </div>
      )}

      {/* Address List */}
      {!showForm && !editingAddress && (
        <>
          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No addresses yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add your first address for faster checkout
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-[#0052a1] hover:bg-[#003d7a]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={(addr) => setEditingAddress(addr)}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefault}
                  isDeleting={isDeleting === address.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
