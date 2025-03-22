// src/app/register/page.js
"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const lastChecked = useRef({ username: "", email: "" });

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
  });

  const [error, setError] = useState("");

  const hasErrors = !!fieldErrors.username || !!fieldErrors.email;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Se o campo tinha erro e o usuário começou a digitar, remove o erro
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const checkIfExists = async (identifier, fieldName) => {
    if (!identifier.trim() || identifier === lastChecked.current[fieldName]) return;

    lastChecked.current[fieldName] = identifier;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/check`, { identifier });

      // Tudo certo, usuário não existe
      setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (err) {
      if (err.response?.status === 409) {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldName]: `${fieldName === "username" ? "Usuário" : "Email"} já está em uso.`,
        }));
      } else {
        console.error("Erro ao verificar disponibilidade:", err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) {
      setError("Corrija os erros antes de continuar.");
      return;
    }
    setError("");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData);
      router.push("/login");
    } catch (err) {
      console.error("Erro ao registrar:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Erro ao registrar usuário.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <TypographyH1 className="mb-6 text-center">Registro</TypographyH1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <Label>Nome completo</Label>
        <Input
          name="name"
          placeholder="Digite seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Label>Username</Label>
        <Input
          name="username"
          placeholder="Digite seu nome de usuário"
          value={formData.username}
          onChange={handleChange}
          onBlur={() => checkIfExists(formData.username, "username")}
          required
        />
        {fieldErrors.username && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>
        )}

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => checkIfExists(formData.email, "email")}
          required
        />
        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}

        <Label>Senha</Label>
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <TypographyP className="text-red-500 text-sm mt-2">{error}</TypographyP>}

        <Button
          type="submit"
          disabled={hasErrors}
          className={`mt-2 ${hasErrors ? "bg-gray-400 cursor-not-allowed" : ""}`}
        >
          Cadastrar
        </Button>

        <TypographyP className="mt-4 text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 underline hover:text-blue-800">
            Faça login
          </a>
        </TypographyP>
      </form>
    </div>
  );
}
