import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/lib/accessibility/AccessibilityContext";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { KeyboardFocusIndicator } from "@/components/accessibility/KeyboardFocusIndicator";
import { CommunicationPulseLayer } from "@/components/motion";

export const metadata: Metadata = {
  title: "AccessAI",
  description: "Accessible communication tools for deaf and hard-of-hearing users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AccessibilityProvider>
          <SkipToContent />
          <KeyboardFocusIndicator />
          <CommunicationPulseLayer />
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  );
}
