import React from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { NavigationWrapper } from "@/components/admin/NavigationWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <NavigationWrapper>
        {children}
      </NavigationWrapper>
    </NavigationProvider>
  );
}
