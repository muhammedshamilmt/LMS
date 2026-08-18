import React from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { NavigationWrapper } from "@/components/admin/NavigationWrapper";
import { UploadQueueProvider } from "@/contexts/UploadQueueContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <UploadQueueProvider>
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
      </UploadQueueProvider>
    </NavigationProvider>
  );
}
