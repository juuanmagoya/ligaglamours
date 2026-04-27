"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1">

        {/* TOPBAR */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* MAIN */}
        <main className="p-6 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}