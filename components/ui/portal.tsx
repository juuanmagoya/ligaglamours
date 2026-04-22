// components/ui/portal.tsx
"use client"

import { ReactNode } from "react"
import { createPortal } from "react-dom"

type Props = {
  children: ReactNode
}

export function Portal({ children }: Props) {
  // No necesitas useState ni useEffect para esto
  // createPortal funciona directamente durante el renderizado
  if (typeof document === "undefined") return null
  
  return createPortal(children, document.body)
}