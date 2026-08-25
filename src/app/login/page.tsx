"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    // Autenticación quemada: cualquier credencial válida inicia sesión con un
    // empleado de ejemplo, sin llamar a Firebase ni al backend.
    const employee = {
      name: email.split("@")[0],
      email,
      role: "Administrador",
    };

    login(employee);
    router.push("/dashboard");
  };

  return (
    <AuthLayout title="Bienvenido de nuevo" subtitle="Inicia sesión para gestionar tu inventario">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1.5">Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1.5">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2.5 rounded-lg w-full font-medium hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>
        <p className="text-sm text-slate-500 text-center">
          ¿No tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Regístrate
          </span>
        </p>
        <p className="text-sm text-slate-500 text-center">
          <span
            onClick={() => router.push("/reset-password")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            ¿Olvidaste tu contraseña?
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
