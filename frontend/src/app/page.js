'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/movies'); // Redireciona automaticamente para a listagem de filmes
  }, []);

  return null;
  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //      <main className="flex flex-col items-center justify-center min-h-screen p-4">
  //     <h1 className="text-3xl font-bold">Nanoflix</h1>
  //     <Button>Teste Shadcn</Button>
  //     </main>
  //   </div>
  // );
}
