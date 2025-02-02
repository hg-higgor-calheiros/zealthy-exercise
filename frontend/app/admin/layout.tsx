'use client'

import Header from "@/components/shared/Header";
import { AdminProvider } from "@/contexts/AdminContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
        <Header />
          <div className="bg-white h-screen w-screen flex flex-1 flex-col justify-center items-center text-black">
            {children}
          </div>
    </AdminProvider>
  );
}
