"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Flujo quemado: no depende de Firebase, solo simula el envío del enlace.
    if (!email) {
      setError("Ingresa tu correo electrónico.");
      setMessage("");
      return;
    }

    setMessage("Se ha enviado un enlace para restablecer tu contraseña.");
    setError("");
  };

  return (
    <AuthLayout title="Restablecer contraseña" subtitle="Te enviaremos un enlace para recuperar el acceso a tu cuenta">
      <form onSubmit={handleResetPassword} className="space-y-4">
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
        {message && <p className="text-emerald-600 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-lg w-full font-medium hover:bg-blue-700 transition">
          Restablecer contraseña
        </button>
        <p className="text-sm text-slate-500 text-center">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => router.push("/login")} className="text-blue-600 hover:underline cursor-pointer font-medium">
            Iniciar sesión
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
