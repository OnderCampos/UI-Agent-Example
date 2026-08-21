"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvoiceListItem } from "@/components/features/invoice";
import type { EInvoice, } from "@/types/invoice";
import { INVOICE_COUNTRY_CONFIG } from "@/types/invoice";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<EInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const params = new URLSearchParams();
        if (selectedCountry) params.set("country", selectedCountry);

        const response = await fetch(`/api/invoices?${params}`);
        const data = await response.json();

        if (data.success) {
          setInvoices(data.data.invoices || []);
        }
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvoices();
  }, [selectedCountry]);

  const filteredInvoices = invoices.filter((inv) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      inv.invoiceNumber?.toLowerCase().includes(query) ||
      inv.orderId.toLowerCase().includes(query) ||
      inv.customerName.toLowerCase().includes(query)
    );
  });

  const handleDownload = async (invoiceId: string, type: "pdf" | "xml") => {
    const invoice = invoices.find((i) => i.id === invoiceId);
    if (!invoice) return;

    window.open(`/api/invoices/${invoiceId}/download?type=${type}&country=${invoice.country}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Invoices</h1>
        <p className="text-gray-600">
          View and download your electronic invoices
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice number or order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
            />
          </div>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
          >
            <option value="">All Countries</option>
            {Object.entries(INVOICE_COUNTRY_CONFIG).map(([code, config]) => (
              <option key={code} value={code}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Invoice List */}
      {isLoading ? (
        <div className="space-y-4">
          {["skeleton-1", "skeleton-2", "skeleton-3"].map((id) => (
            <div key={id} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredInvoices.length > 0 ? (
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="relative">
              <InvoiceListItem
                invoice={invoice}
                onClick={() => {
                  // Could open a modal with full details
                }}
              />
              {/* Quick actions */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                {invoice.pdfUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(invoice.id, "pdf");
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No invoices found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || selectedCountry
              ? "Try adjusting your filters"
              : "Electronic invoices for your orders will appear here"}
          </p>
          {(searchQuery || selectedCountry) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCountry("");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 p-4 bg-[#e6f0fa] rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">About Electronic Invoices</h3>
        <p className="text-sm text-gray-600 mb-3">
          Electronic invoices (facturas electronicas) are legally valid tax documents 
          required for business purchases in most Latin American countries.
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>- Request an invoice during checkout or from your order history</li>
          <li>- Invoices are sent to your email and stored here</li>
          <li>- Download XML for tax reporting, PDF for your records</li>
        </ul>
      </div>
    </div>
  );
}
