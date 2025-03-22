// src/app/unauthorized/[reason]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { reason } = useParams();
  const [countdown, setCountdown] = useState(5);

  const getMessage = () => {
    switch (reason) {
      case 'admin_only':
        return 'Apenas administradores têm permissão para acessar esta página.';
      case 'review_only':
        return 'Você precisa estar logado para enviar um review.';
      default:
        return 'Você precisa estar logado para acessar esta página.';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/login');
    }
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <TypographyH1>Acesso Negado</TypographyH1>
      <TypographyP className="mt-4 max-w-md">{getMessage()}</TypographyP>
      <TypographyP className="mt-2 text-gray-500">
        Redirecionando para a página de login em <strong>{countdown}</strong> segundos...
      </TypographyP>
      <Button className="mt-6" onClick={() => router.push('/login')}>
        Ir para o Login agora
      </Button>
    </div>
  );
}
