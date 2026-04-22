"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, Crown, X } from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
    ${
      pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-purple-700 hover:text-white"
    }`;

  return (
    <>
      {/* overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static
        z-50
        bg-[#1E1B2E]
        text-white
        w-64
        min-h-screen
        p-6
        transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        `}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-purple-400">
            Liga Glamour
          </h2>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* navegación */}
        <nav className="flex flex-col gap-2">

          <Link
            href="/admin/dashboard"
            className={linkClass("/admin/dashboard")}
          >
            <Home size={18} />
            Dashboard
          </Link>

          <Link
            href="/admin/equipos"
            className={linkClass("/admin/equipos")}
          >
            <Shield size={18} />
            Equipos
          </Link>

          <Link
            href="/admin/lideres"
            className={linkClass("/admin/lideres")}
          >
            <Crown size={18} />
            Líderes
          </Link>

          <Link
            href="/admin/divisiones"
            className={linkClass("/admin/divisiones")}
          >
            <Crown size={18} />
            Divisiones
          </Link>

          <Link
            href="/admin/jugadores"
            className={linkClass("/admin/jugadores")}
          >
            <Crown size={18} />
            Jugadores
          </Link>

          <Link
            href="/admin/posiciones"
            className={linkClass("/admin/posiciones")}
          >
            <Crown size={18} />
            Posiciones
          </Link>

        </nav>
      </aside>
    </>
  );
}