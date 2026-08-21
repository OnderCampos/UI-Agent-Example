"use client";

import { FileText, Download, ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EInvoice, EInvoiceStatus } from "@/types/invoice";
import { INVOICE_COUNTRY_CONFIG } from "@/types/invoice";

interface InvoiceCardProps {
  invoice: EInvoice;
  onDownloadPdf?: (invoiceId: string) => void;
  onDownloadXml?: (invoiceId: string) => void;
  className?: string;
}

const statusConfig: Record<EInvoiceStatus, { label: string; color: string; icon: React.ElementType }> = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700", icon: FileText },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700", icon: Clock },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-500", icon: XCircle },
};

export function InvoiceCard({
  invoice,
  onDownloadPdf,
  onDownloadXml,
  className,
}: InvoiceCardProps) {
  const status = statusConfig[invoice.status];
  const StatusIcon = status.icon;
  const countryName = INVOICE_COUNTRY_CONFIG[invoice.country]?.name || invoice.country;

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#0052a1]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {invoice.invoiceNumber || invoice.id}
            </h3>
            <p className="text-sm text-gray-500">
              Order #{invoice.orderId}
            </p>
          </div>
        </div>
        <span className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
          status.color
        )}>
          <StatusIcon className="w-4 h-4" />
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Country</span>
            <p className="font-medium">{countryName}</p>
          </div>
          <div>
            <span className="text-gray-500">Issue Date</span>
            <p className="font-medium">
              {new Date(invoice.issueDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Tax ID</span>
            <p className="font-medium font-mono">{invoice.customerTaxId}</p>
          </div>
          <div>
            <span className="text-gray-500">Customer</span>
            <p className="font-medium truncate">{invoice.customerName}</p>
          </div>
        </div>

        {/* Fiscal Info */}
        {invoice.fiscalFolio && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-500 block mb-1">Fiscal Folio</span>
            <p className="font-mono text-sm break-all">{invoice.fiscalFolio}</p>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-sm text-gray-500">Total</span>
            <p className="text-xl font-bold text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: invoice.currency,
              }).format(invoice.total)}
            </p>
          </div>

          {/* Download Actions */}
          <div className="flex gap-2">
            {invoice.pdfUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownloadPdf?.(invoice.id)}
              >
                <Download className="w-4 h-4 mr-1" />
                PDF
              </Button>
            )}
            {invoice.xmlUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownloadXml?.(invoice.id)}
              >
                <Download className="w-4 h-4 mr-1" />
                XML
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface InvoiceListItemProps {
  invoice: EInvoice;
  onClick?: () => void;
  className?: string;
}

export function InvoiceListItem({ invoice, onClick, className }: InvoiceListItemProps) {
  const status = statusConfig[invoice.status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all text-left",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5 text-[#0052a1]" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900 truncate">
            {invoice.invoiceNumber || invoice.id}
          </h4>
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
            status.color
          )}>
            {status.label}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(invoice.issueDate).toLocaleDateString()} - Order #{invoice.orderId}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="font-semibold text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: invoice.currency,
          }).format(invoice.total)}
        </p>
        <p className="text-xs text-gray-500">{invoice.country}</p>
      </div>

      <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
    </button>
  );
}
