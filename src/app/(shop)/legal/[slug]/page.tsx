import { notFound } from "next/navigation";
import { LegalPageContent, LegalPageNavigation, TableOfContents } from "@/components/features/content";
import type { LegalPage } from "@/types/content";
import type { Metadata } from "next";

// Mock legal pages - in production, this would come from Contentful
const legalPages: Record<string, LegalPage> = {
  "terms-of-service": {
    id: "1",
    slug: "terms-of-service",
    title: "Terms of Service",
    effectiveDate: "2024-01-01",
    version: "2.1",
    updatedAt: "2024-01-15T00:00:00Z",
    seo: {
      title: "Terms of Service | PriceSmart",
      description: "Read our terms of service and conditions of use.",
    },
    content: {
      raw: null,
      html: `
        <h2 id="introduction">1. Introduction</h2>
        <p>Welcome to PriceSmart. These Terms of Service ("Terms") govern your use of our website, mobile application, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.</p>
        
        <h2 id="membership">2. Membership</h2>
        <p>PriceSmart operates on a membership basis. To make purchases, you must be an active member in good standing. Membership is non-transferable and may be cancelled by PriceSmart at any time for violation of these Terms.</p>
        
        <h3 id="membership-types">2.1 Types of Membership</h3>
        <p>We offer several membership tiers, including Diamond (Individual) and Business memberships. Each tier has its own benefits and pricing structure, which are detailed on our membership page.</p>
        
        <h2 id="purchases">3. Purchases and Payments</h2>
        <p>All purchases made through our Services are subject to product availability. Prices are subject to change without notice. We reserve the right to limit quantities on any order.</p>
        
        <h3 id="payment-methods">3.1 Payment Methods</h3>
        <p>We accept major credit cards, debit cards, the PriceSmart Credit Card, and other payment methods as indicated during checkout. All payments are processed securely.</p>
        
        <h2 id="returns">4. Returns and Refunds</h2>
        <p>We offer a 30-day return policy on most items. Items must be returned in their original condition and packaging. Some items, including perishables and personalized products, cannot be returned.</p>
        
        <h2 id="privacy">5. Privacy</h2>
        <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our Services, to understand our practices.</p>
        
        <h2 id="intellectual-property">6. Intellectual Property</h2>
        <p>All content on our Services, including text, graphics, logos, and software, is the property of PriceSmart or its content suppliers and is protected by intellectual property laws.</p>
        
        <h2 id="limitation">7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, PriceSmart shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services.</p>
        
        <h2 id="changes">8. Changes to Terms</h2>
        <p>We may modify these Terms at any time. We will notify you of significant changes by posting a notice on our website. Your continued use of our Services after changes constitutes acceptance of the modified Terms.</p>
        
        <h2 id="contact">9. Contact Information</h2>
        <p>If you have questions about these Terms, please contact us at legal@pricesmart.com or through our Contact page.</p>
      `,
    },
  },
  "privacy-policy": {
    id: "2",
    slug: "privacy-policy",
    title: "Privacy Policy",
    effectiveDate: "2024-01-01",
    version: "3.0",
    updatedAt: "2024-01-10T00:00:00Z",
    seo: {
      title: "Privacy Policy | PriceSmart",
      description: "Learn how we collect, use, and protect your personal information.",
    },
    content: {
      raw: null,
      html: `
        <h2 id="overview">1. Overview</h2>
        <p>This Privacy Policy explains how PriceSmart collects, uses, discloses, and protects your personal information when you use our Services.</p>
        
        <h2 id="information-collected">2. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information.</p>
        
        <h3 id="automatic-collection">2.1 Information Collected Automatically</h3>
        <p>When you use our Services, we automatically collect certain information, including your IP address, browser type, device information, and browsing behavior.</p>
        
        <h2 id="use-of-information">3. How We Use Your Information</h2>
        <p>We use the information we collect to provide and improve our Services, process transactions, communicate with you, and personalize your experience.</p>
        
        <h2 id="sharing">4. Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with service providers who help us operate our business, when required by law, or with your consent.</p>
        
        <h2 id="security">5. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h2 id="your-rights">6. Your Rights</h2>
        <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or port your data.</p>
        
        <h2 id="cookies">7. Cookies and Tracking</h2>
        <p>We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage your cookie preferences through your browser settings.</p>
        
        <h2 id="contact-privacy">8. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or our privacy practices, please contact our Privacy Team at privacy@pricesmart.com.</p>
      `,
    },
  },
  "cookie-policy": {
    id: "3",
    slug: "cookie-policy",
    title: "Cookie Policy",
    effectiveDate: "2024-01-01",
    version: "1.2",
    updatedAt: "2024-01-05T00:00:00Z",
    seo: {
      title: "Cookie Policy | PriceSmart",
      description: "Understand how we use cookies and similar technologies.",
    },
    content: {
      raw: null,
      html: `
        <h2 id="what-are-cookies">1. What Are Cookies</h2>
        <p>Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>
        
        <h2 id="types-of-cookies">2. Types of Cookies We Use</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
        </ul>
        
        <h2 id="managing-cookies">3. Managing Cookies</h2>
        <p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
        
        <h2 id="third-party-cookies">4. Third-Party Cookies</h2>
        <p>Some cookies on our website are placed by third-party service providers, such as analytics and advertising partners. These cookies are subject to the respective third party's privacy policy.</p>
        
        <h2 id="updates">5. Updates to This Policy</h2>
        <p>We may update this Cookie Policy from time to time. The updated version will be indicated by an updated "Last revised" date.</p>
      `,
    },
  },
};

const allLegalPages = Object.values(legalPages).map((p) => ({
  slug: p.slug,
  title: p.title,
}));

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug];
  
  if (!page) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export default async function LegalPageRoute({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = legalPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-[#0052a1]">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{page.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            <aside className="space-y-6">
              <LegalPageNavigation pages={allLegalPages} currentSlug={slug} />
              <TableOfContents content={page.content.html} />
            </aside>

            {/* Main Content */}
            <main className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12">
              <LegalPageContent page={page} />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
