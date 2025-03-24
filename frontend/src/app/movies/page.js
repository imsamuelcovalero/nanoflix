// src/app/movies/page.js
'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useMoviesStore } from '@/store/moviesStore';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { TypographyH1, TypographyH4 } from '@/components/ui/typography';
import PageContainer from '@/components/ui/PageContainer';
import Link from 'next/link';

export default function MoviesPage() {
  const { movies, setMovies, isLoaded } = useMoviesStore();

  useEffect(() => {
    async function fetchMovies() {
      if (isLoaded) return; // Se já carregou, evita nova requisição

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
        console.log('moviesResponse', response);
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error.message);
      }
    }

    fetchMovies();
  }, [isLoaded, setMovies]);

  return (
    <PageContainer>
      <TypographyH1 className="text-4xl font-bold text-center w-full">Filmes</TypographyH1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref className="cursor-pointer">
            <Card className="shadow-md transition-transform duration-200 hover:scale-105 flex flex-col min-h-[260px] min-w-[220px] max-h-[360px] mx-auto">
              <CardContent className="p-4 flex flex-col h-full justify-between items-center">
                <AspectRatio ratio={2 / 3} className="w-full max-h-[260px]">
                  <img
                    src={movie.url_image}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </AspectRatio>

                <TypographyH4 className="text-md font-medium mt-4 text-center w-full">
                  {movie.title}
                </TypographyH4>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
