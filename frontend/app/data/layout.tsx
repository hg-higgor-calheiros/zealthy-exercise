'use client'

import { DataProvider } from "@/contexts/DataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <div className="bg-white h-screen w-screen flex flex-1 flex-col justify-center items-center text-black">
        {children}
      </div>
    </DataProvider>
  );
}