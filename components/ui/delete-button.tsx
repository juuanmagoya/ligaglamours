"use client"

import { Trash2 } from "lucide-react"

type Props = {
  onClick?: () => void
}

export function DeleteButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Eliminar"
      className="flex items-center justify-center gap-2 h-9 px-2 sm:px-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      <Trash2 size={16} />

      <span className="hidden sm:inline text-sm font-medium">
        Eliminar
      </span>
    </button>
  )
}