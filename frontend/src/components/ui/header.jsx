// src/components/ui/header.jsx
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from './button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  console.log('user:', user);

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-black text-white py-4 px-6 shadow flex items-center justify-between">
      <Link href="/movies" className="text-lg font-bold">
        🎬 Nanoflix
      </Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm">
              👋 {user?.name ? `Olá, ${user.name.split(' ')[0]}` : 'Carregando...'}
            </span>
            {user?.role === 'admin' && (
              <Button variant="outline" onClick={() => router.push('/movies/new')}>
                ➕ Novo Filme
              </Button>
            )}
            <Button variant="destructive" onClick={handleLogout}>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              className="text-black bg-white hover:bg-gray-100"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button onClick={() => router.push('/register')}>Registrar</Button>
          </>
        )}
      </div>
    </header>
  );
}
