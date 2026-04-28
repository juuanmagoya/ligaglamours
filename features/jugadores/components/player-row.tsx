"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Player } from "../types/player.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { PlayerForm } from "./player-form"
import { deletePlayerAction } from "../actions/delete-player"

type Props = {
  player: Player
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

  const teamName =
    teams.find((t) => t.id === player.team_id)?.name ?? "—"

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">

      {/* Nickname */}
      <td className="p-4 font-medium text-gray-800">
        {player.nickname}
      </td>

      {/* ID Game */}
      <td className="p-4 text-gray-600">
        {player.id_game}
      </td>

      {/* Equipo */}
      <td className="p-4 text-gray-600 hidden md:table-cell">
        {teamName}
      </td>

      {/* Acciones */}
      <td className="p-4">
        <div className="flex items-center gap-2">

          {/* Editar */}
          <Modal
            title="Editar jugador"
            trigger={<EditButton />}
          >
            {(close) => (
              <PlayerForm
                player={player}
                teams={teams}
                user={user} // 🔥 CLAVE
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar jugador"
            description="Esta acción no se puede deshacer"
            onConfirm={handleDelete}
          >
            <DeleteButton />
          </ConfirmDialog>

        </div>
      </td>

    </tr>
  )
}