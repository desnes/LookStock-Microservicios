"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

const titles: Record<string, string> = {
  "/dashboard": "Inventario",
  "/dashboard/stockControl": "Control de stock",
  "/dashboard/chat": "Chat",
};

const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const title = titles[pathname] || "LookStock";
  const initials = (user?.name || "?").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
          <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-medium text-slate-800">{user?.name || "Invitado"}</p>
            <p className="text-xs text-slate-400">{user?.role || "—"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-blue-600 hover:text-white transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Topbar;
