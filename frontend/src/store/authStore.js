// src/store/authStore.js
"use client";

import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (identifier, password) => {
    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { identifier, password });

      set({ user: res.data, token: res.data.token, isAuthenticated: true });
      localStorage.setItem("nanoflix-token", res.data.token);

      return true; // Indica que o login foi bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
      return false; // Indica falha no login
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("nanoflix-token");
  },

  checkAuth: () => {
    const storedToken = localStorage.getItem("nanoflix-token");
    if (storedToken) {
      set({ token: storedToken, isAuthenticated: true });
    }
  },
}));
