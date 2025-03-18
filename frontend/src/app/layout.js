"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import "@/styles/tailwind.css";

export default function RootLayout({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
