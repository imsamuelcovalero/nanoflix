// src/store/moviesStore.js

"use client";

import { create } from "zustand";
import axios from "axios";

export const useMoviesStore = create((set) => ({
  movies: [],
  isLoaded: false,

  setMovies: (movies) => set({ movies, isLoaded: true }),

  fetchMovies: async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
      set({ movies: response.data, isLoaded: true });
    } catch (error) {
      console.error("Erro ao buscar filmes:", error.message);
    }
  },

  getMovieById: (id) => {
    return useMoviesStore.getState().movies.find((movie) => movie.id === Number(id)) || null;
  },
}));
