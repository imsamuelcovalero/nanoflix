// src/app/movies/page.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Filmes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 shadow">
            <img src={movie.url_image} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
