'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Define routes where you want to HIDE the footer
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return <Footer />;
}