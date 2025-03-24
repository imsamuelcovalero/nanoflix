// src/store/authStore.js
'use client';

import { create } from 'zustand';
import axios from 'axios';

let hasCheckedAuth = false;

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (identifier, password) => {
    try {
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        identifier,
        password,
      });

      set({ user: res.data, token: res.data.token, isAuthenticated: true });
      localStorage.setItem('nanoflix-token', res.data.token);

      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      return false;
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('nanoflix-token');
  },

  checkAuth: async () => {
    if (hasCheckedAuth) return; // <-- Impede chamadas múltiplas
    hasCheckedAuth = true;

    const storedToken = localStorage.getItem('nanoflix-token');
    if (storedToken) {
      set({ token: storedToken, isAuthenticated: true });

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/login/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        set({ user: res.data });
      } catch (err) {
        console.error('Erro ao recuperar usuário com token:', err.message);
        // Remove token inválido
        localStorage.removeItem('nanoflix-token');
        set({ token: null, user: null, isAuthenticated: false });
      }
    }
  },
}));
