// src/app/login/page.js
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await login(identifier, password); // Aguarda o retorno do login
    
    if (success) {
      router.push("/movies"); // Redireciona o usuário após login bem-sucedido
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <Button type="submit" className="mt-2">Entrar</Button>
      </form>
    </div>
  );
}

