    "use client";

    import { Menu } from "lucide-react";

    export default function Topbar({
    setSidebarOpen,
    }: {
    setSidebarOpen: (value: boolean) => void;
    }) {
    return (
        <header className="flex items-center justify-between bg-white border-b border-purple-100 px-6 h-16">

        {/* botón mobile */}
        <button
            className="md:hidden text-gray-600 hover:text-purple-600 transition-colors"
            onClick={() => setSidebarOpen(true)}
        >
            <Menu size={22} />
        </button>

        {/* título */}
        <h1 className="font-semibold text-purple-700">
            Liga Glamour Admin
        </h1>

        {/* usuario */}
        <div className="text-sm text-gray-600 font-medium">
            Admin
        </div>

        </header>
    );
    }