import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/Context/AuthContext';

export const metadata: Metadata = {
  title: 'Dog Finder',
  description: 'Generated by create next app',
};

// Root layout will be shared through all of the different pages/routes
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient text-secondary max-w-dvw h-screen max-h-dvh">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
