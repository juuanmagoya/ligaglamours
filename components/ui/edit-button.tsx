"use client"

import { Pencil } from "lucide-react"

type Props = {
  onClick?: () => void
}

export function EditButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Editar"
      className="flex items-center justify-center h-9 px-3 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
    >
      <Pencil size={16} />
      <span className="hidden sm:inline text-sm font-medium">
        Editar
      </span>
    </button>
  )
}