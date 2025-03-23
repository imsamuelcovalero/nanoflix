// src/app/movies/new/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useMoviesStore } from '@/store/moviesStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import axios from 'axios';

export default function NewMoviePage() {
  const router = useRouter();
  const { isAuthenticated, token, user, checkAuth } = useAuthStore();
  const { setIsLoaded } = useMoviesStore.getState();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseYear: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();

    if (!isAuthenticated) {
      router.push('/unauthorized/admin_only');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/movies');
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('releaseYear', formData.releaseYear);
    formDataToSend.append('image', imageFile); // 'image' será o nome do campo no backend

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoaded(false);
      router.push('/movies');
    } catch (err) {
      console.error('Erro ao criar filme:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao criar filme.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <TypographyH1 className="mb-6 text-center">Novo Filme</TypographyH1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
        <Label>Título</Label>
        <Input name="title" value={formData.title} onChange={handleChange} required />

        <Label>Descrição</Label>
        <Input name="description" value={formData.description} onChange={handleChange} required />

        <Label>Ano de Lançamento</Label>
        <Input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />

        <Label>Gênero</Label>
        <Input name="genre" value={formData.genre} onChange={handleChange} required />

        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} required />

        {error && <TypographyP className="text-red-500 text-sm">{error}</TypographyP>}

        <Button type="submit" className="mt-2">
          Cadastrar Filme
        </Button>
      </form>
    </div>
  );
}
