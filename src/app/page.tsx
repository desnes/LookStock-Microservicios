"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup"); // Redirige a la página de registro
  }, [router]);

  return null; // No se muestra nada porque la redirección es inmediata
}
