"use client";
import React from "react";
import { ImageKitProvider } from "@imagekit/next";

export function ImageKitProviderWrapper({ children }: { children: React.ReactNode }) {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {children}
    </ImageKitProvider>
  );
}
