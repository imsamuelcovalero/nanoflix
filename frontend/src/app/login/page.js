// src/app/login/page.js
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(identifier, password); // Aguarda o retorno do login

    if (success) {
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/movies";
      console.log("Redirecting to:", redirectPath);
      localStorage.removeItem("redirectAfterLogin"); // Remove o redirecionamento após o login

      router.push(redirectPath);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <TypographyH1 className="mb-6 text-center">Login</TypographyH1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <Label>Email ou Username</Label>
        <Input
          type="text"
          placeholder="Digite seu email ou username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Label>Senha</Label>
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="mt-2">
          Entrar
        </Button>

        <TypographyP className="mt-4 text-sm text-center text-gray-600">
          Ainda não tem uma conta?{" "}
          <a href="/register" className="text-blue-600 underline hover:text-blue-800">
            Cadastre-se
          </a>
        </TypographyP>
      </form>
    </div>
  );
}
