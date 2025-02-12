'use client';
import { BrowseProvider } from './context/BrowseContext';

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrowseProvider>{children}</BrowseProvider>;
}
