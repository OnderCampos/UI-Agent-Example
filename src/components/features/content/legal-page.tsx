"use client";

import { useState } from "react";
import { Calendar, FileText, ChevronDown, Printer, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LegalPage } from "@/types/content";

interface LegalPageContentProps {
  page: LegalPage;
  className?: string;
}

export function LegalPageContent({ page, className }: LegalPageContentProps) {
  return (
    <article className={cn("max-w-4xl mx-auto", className)}>
      {/* Header */}
      <header className="mb-8 pb-8 border-b">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {page.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Effective: {formatDate(page.effectiveDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Version {page.version}</span>
          </div>
        </div>
      </header>

      {/* Actions */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadAsText(page)}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      {/* Content */}
      <div
        className="prose prose-gray max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-[#0052a1] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: page.content.html }}
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t text-sm text-gray-500">
        <p>Last updated: {formatDate(page.updatedAt)}</p>
        <p className="mt-2">
          If you have questions about this document, please{" "}
          <a href="/contact" className="text-[#0052a1] hover:underline">
            contact us
          </a>
          .
        </p>
      </footer>
    </article>
  );
}

interface LegalPageNavigationProps {
  pages: { slug: string; title: string }[];
  currentSlug: string;
  className?: string;
}

export function LegalPageNavigation({ 
  pages, 
  currentSlug,
  className 
}: LegalPageNavigationProps) {
  return (
    <nav className={cn("bg-white rounded-xl border border-gray-200 p-4", className)}>
      <h3 className="font-semibold text-gray-900 mb-3 px-3">Legal Documents</h3>
      <ul className="space-y-1">
        {pages.map((page) => (
          <li key={page.slug}>
            <a
              href={`/legal/${page.slug}`}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition-colors",
                page.slug === currentSlug
                  ? "bg-[#e6f0fa] text-[#0052a1] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Extract headings from HTML content
  const headings = extractHeadings(content);
  
  if (headings.length === 0) return null;

  return (
    <div className={cn("bg-gray-50 rounded-xl p-4", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="font-semibold text-gray-900">Table of Contents</h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && (
        <ul className="mt-3 space-y-2">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className="text-sm text-gray-600 hover:text-[#0052a1] transition-colors"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Helper functions
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function extractHeadings(html: string): { text: string; level: number; id: string }[] {
  const headings: { text: string; level: number; id: string }[] = [];
  const regex = /<h([2-4])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    headings.push({ text, level, id });
  }
  
  return headings;
}

function downloadAsText(page: LegalPage): void {
  const text = page.content.html.replace(/<[^>]*>/g, "\n");
  const blob = new Blob([`${page.title}\n\n${text}`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${page.slug}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
