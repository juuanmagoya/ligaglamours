"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { toggleLeaderStatusAction } from "../actions/toggle-leader-status"

type Props = {
  leaderId: string
  status: "active" | "inactive"
}

export function ToggleStatusButton({ leaderId, status }: Props) {

  const router = useRouter()

  const isActive = status === "active"

  async function handleToggle() {

    try {

      await toggleLeaderStatusAction(leaderId)

      toast.success(
        isActive
          ? "Líder desactivado"
          : "Líder activado"
      )

      router.refresh()

    } catch {

      toast.error("Error actualizando estado")

    }

  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleToggle}
    >
      {isActive ? "Desactivar" : "Activar"}
    </Button>
  )
}