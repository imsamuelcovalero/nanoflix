// src/app/layout.js
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import '@/styles/tailwind.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function RootLayout({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <html suppressHydrationWarning lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
