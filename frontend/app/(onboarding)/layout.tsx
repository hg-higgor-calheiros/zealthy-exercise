'use client'

import Header from "@/components/shared/Header";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <OnboardingProvider>
            <Header light />
            <div className="bg-white h-screen w-screen flex flex-1 flex-col justify-center items-center text-black">
              {children}
            </div>
        </OnboardingProvider>
  );
}
