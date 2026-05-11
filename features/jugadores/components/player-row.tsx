// features/jugadores/components/player-row.tsx
"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMemo } from "react"

import { Player } from "../types/player.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { PlayerForm } from "./player-form"
import { deletePlayerAction } from "../actions/delete-player"

type Props = {
  player: Player & {
    teams?: {
      id: string
      name: string
    }
  }
  teams: { id: string; name: string }[]
  user: {
    role: "admin" | "leader"
    team_id?: string | null
  }
}

export function PlayerRow({ player, teams, user }: Props) {
  const router = useRouter()

  async function handleDelete() {
    try {
      await deletePlayerAction(player.id)
      toast.success("Jugador eliminado")
      router.refresh()
    } catch {
      toast.error("Error eliminando jugador")
    }
  }

  const initial = useMemo(() => {
    if (!player.nickname || player.nickname.trim() === "") {
      return "?"
    }
    const firstChar = player.nickname.trim().charAt(0)
    if (/[A-Za-z]/.test(firstChar)) {
      return firstChar.toUpperCase()
    }
    return "?"
  }, [player.nickname])

  const teamName = player.teams?.name ?? teams.find((t) => t.id === player.team_id)?.name ?? "—"

  return (
    <tr className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors duration-200 group">
      
      {/* Nickname - siempre visible */}
      <td className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xs sm:text-sm font-bold text-purple-400 shrink-0">
            {initial}
          </div>
          <span className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm sm:text-base wrap-break-words">
            {player.nickname || "Sin nombre"}
          </span>
        </div>
      </td>

      {/* ID Game - oculto en móvil */}
      <td className="px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
        <code className="text-xs text-white/60 font-mono bg-white/5 px-2 py-1 rounded-md">
          {player.id_game || "No registrado"}
        </code>
      </td>

      {/* Equipo - oculto en tablet/móvil pequeño, visible en desktop */}
      <td className="px-3 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
        <span className="text-white/70 text-xs sm:text-sm">
          {teamName}
        </span>
      </td>

      {/* Acciones - siempre visible, compacto en móvil */}
      <td className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <Modal title="Editar jugador" trigger={<EditButton />}>
            {(close) => (
              <PlayerForm
                player={player}
                teams={teams}
                user={user}
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          <ConfirmDialog
            title="Eliminar jugador"
            description="Esta acción no se puede deshacer. El jugador será eliminado permanentemente."
            onConfirm={handleDelete}
          >
            <DeleteButton />
          </ConfirmDialog>
        </div>
      </td>

    </tr>
  )
}