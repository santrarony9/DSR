"use client";
import { usePathname } from "next/navigation";

export default function PublicWrapper({ 
  children,
  header,
  footer,
  whatsapp,
  scrollToTop
}: { 
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
  scrollToTop: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="min-h-screen">{children}</main>
      {footer}
      {whatsapp}
      {scrollToTop}
    </>
  );
}
