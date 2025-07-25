
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/styles/template.css'; // Import template styles
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ClientThemeInitializer from '@/components/layout/ClientThemeInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ZuTaRa - Global Design & Architecture Freelancing Platform',
  description: 'ZuTaRa connects talented designers and architects with exciting projects worldwide. Showcase expertise, collaborate globally, build your international career.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientThemeInitializer />
        <AuthProvider>
          <div className="template-body-wrapper"> {/* Wrapper for template styles */}
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
