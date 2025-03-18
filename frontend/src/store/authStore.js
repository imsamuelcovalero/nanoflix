// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (identifier, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { identifier, password });
      set({ user: res.data, token: res.data.token, isAuthenticated: true });
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
  },

  checkAuth: () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      set({ token: storedToken, isAuthenticated: true });
    }
  },
}));
