// src/app/movies/page.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TypographyH1, TypographyH4 } from "@/components/ui/typography";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
        console.log('moviesResponse', response);
        setMovies(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {/* Título centralizado corretamente com maior espaçamento */}
      <TypographyH1 className="text-4xl font-bold text-center w-full">
        Filmes
      </TypographyH1>
  
      {/* Ajuste o espaçamento com mt-8 no grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {movies.map((movie) => (
          <Card key={movie.id} className="shadow-md transition-transform duration-200 hover:scale-105 flex flex-col min-h-[260px] min-w-[220px] max-h-[360px] mx-auto">
            <CardContent className="p-4 flex flex-col h-full justify-between items-center">
              {/* Reduzindo um pouco a altura máxima da imagem */}
              <AspectRatio ratio={2 / 3} className="w-full max-h-[260px]">
                <img 
                  src={movie.url_image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover rounded-md"
                />
              </AspectRatio>

              {/* Ajuste do título para alinhar no centro do card */}
              <TypographyH4 className="text-md font-medium mt-4 text-center w-full">
                {movie.title}
              </TypographyH4>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
