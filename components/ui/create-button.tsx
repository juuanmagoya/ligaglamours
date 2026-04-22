"use client"

import { Plus } from "lucide-react"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  onClick?: () => void
}

export function CreateButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
    >
      <Plus size={18} />

      {children && (
        <span className="text-sm font-medium">
          {children}
        </span>
      )}
    </button>
  )
}