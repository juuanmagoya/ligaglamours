"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Shield,
  Crown,
  X,
  LogOut,
  Users,
  UserCircle, // 👈 Agrega este icono
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const role = session?.user?.role;

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
    ${
      pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-purple-700 hover:text-white"
    }`;

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/equipos", label: "Equipos", icon: Shield },
    { href: "/admin/lideres", label: "Líderes", icon: Crown },
    { href: "/admin/divisiones", label: "Divisiones", icon: Crown },
    { href: "/admin/jugadores", label: "Jugadores", icon: Users },
    { href: "/admin/posiciones", label: "Posiciones", icon: Crown },
  ];

  const leaderLinks = [
    { href: "/lider/equipo", label: "Mi Equipo", icon: Shield },
    { href: "/lider/jugadores", label: "Mis Jugadores", icon: Users },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "leader"
      ? leaderLinks
      : [];

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

        {/* 👤 USER INFO */}
        <div className="mb-6 p-3 rounded-lg bg-purple-900/40 border border-purple-700">
          <p className="text-sm font-semibold">
            {status === "loading"
              ? "Cargando..."
              : session?.user?.name || "Usuario"}
          </p>
          <p className="text-xs text-purple-300 capitalize">
            {status === "loading"
              ? "..."
              : role || "rol"}
          </p>
          {/* 👇 Agrega el email del usuario */}
          <p className="text-xs text-purple-300/70 mt-1 truncate">
            {session?.user?.email || ""}
          </p>
        </div>

        {/* 🔗 NAV */}
        <nav className="flex flex-col gap-2 flex-1">
          {status === "loading" ? (
            <p className="text-gray-400 text-sm px-3">Cargando menú...</p>
          ) : (
            links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })
          )}
        </nav>

        {/* 👇 SECCIÓN DE CUENTA (NUEVA) */}
        {status !== "loading" && (
          <div className="mt-6 pt-4 border-t border-purple-700/50">
            <Link
              href="/admin/cuenta"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-colors"
            >
              <UserCircle size={18} />
              Mi Cuenta
            </Link>
          </div>
        )}

        {/* 🚪 LOGOUT */}
        {status !== "loading" && (
          <div className="mt-2">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        )}
      </aside>
    </>
  );
}