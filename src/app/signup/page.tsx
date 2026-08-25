"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";

const inputClass =
  "border border-slate-200 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Registro quemado: no depende de Firebase ni del backend, solo valida
    // que los campos estén completos para simular un alta exitosa.
    if (!name || !phone || !role || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  return (
    <AuthLayout title="Comenzar con LookStock" subtitle="Crea tu cuenta para empezar a gestionar tu inventario">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1.5">Nombre</label>
          <input type="text" placeholder="Ana Torres" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1.5">Teléfono</label>
            <input type="text" placeholder="55 1234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1.5">Rol</label>
            <input type="text" placeholder="Administrador" value={role} onChange={(e) => setRole(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1.5">Correo electrónico</label>
          <input type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1.5">Contraseña</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-lg w-full font-medium hover:bg-blue-700 transition">
          Registrarse
        </button>
        <p className="text-sm text-slate-500 text-center">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => router.push("/login")} className="text-blue-600 hover:underline cursor-pointer font-medium">
            Inicia sesión
          </span>
        </p>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm text-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">¡Registro exitoso!</h2>
            <p className="text-sm text-slate-500 mb-5">Tu cuenta ha sido creada con éxito. Puedes iniciar sesión ahora.</p>
            <button onClick={closeModal} className="bg-blue-600 text-white p-2.5 rounded-lg w-full font-medium hover:bg-blue-700 transition">
              Ir al login
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default SignUp;
