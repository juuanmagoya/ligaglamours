"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6 bg-purple-50 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}