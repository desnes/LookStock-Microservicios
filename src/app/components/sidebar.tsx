"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Inventario", icon: "/icons/Folder.svg" },
  { href: "/dashboard/stockControl", label: "Stock", icon: "/icons/Bag.svg" },
  { href: "/dashboard/chat", label: "Chat", icon: "/icons/Chat.svg" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 h-screen sticky top-0 flex-col bg-white border-r border-slate-200">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-200">
        <Image src="/lookStock-icon.png" alt="LookStock" width={32} height={32} />
        <span className="font-nico text-blue-600 text-[20px]">LookStock</span>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={active ? "opacity-100" : "opacity-60"}
                    style={active ? { filter: "invert(35%) sepia(93%) saturate(2000%) hue-rotate(206deg)" } : undefined}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-slate-200 text-xs text-slate-400">
        © 2026 ABMODEL
      </div>
    </aside>
  );
};

export default Sidebar;
