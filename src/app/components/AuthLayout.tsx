import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <Image src="/lookStock-icon.png" alt="LookStock" width={40} height={40} />
          <span className="font-nico text-[26px]">LookStock</span>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-snug mb-3">
            Eficiencia y control para tu inventario de moda.
          </h2>
          <p className="text-blue-100 max-w-md">
            Gestiona productos, movimientos de stock y comunicación de tu equipo en un solo lugar.
          </p>
        </div>
        <p className="text-sm text-blue-200">© 2026 ABMODEL</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Image src="/lookStock-icon.png" alt="LookStock" width={32} height={32} />
            <span className="font-nico text-blue-600 text-[22px]">LookStock</span>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-800 mb-1">{title}</h1>
            <p className="text-sm text-slate-500 mb-6">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
