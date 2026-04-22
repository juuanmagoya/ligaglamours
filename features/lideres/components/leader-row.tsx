"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Leader } from "../types/leader.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

import { LeaderForm } from "./leader-form"

import { deleteLeaderAction } from "../actions/delete-leader"
import { toggleLeaderStatusAction } from "../actions/toggle-leader-status"

type Props = {
  leader: Leader
  teams: { id: string; name: string }[]
}

export function LeaderRow({ leader, teams }: Props) {

  const router = useRouter()

  async function handleDelete() {
    try {

      await deleteLeaderAction(leader.id)

      toast.success("Líder eliminado")

      router.refresh()

    } catch {

      toast.error("Error eliminando líder")

    }
  }

  async function handleToggleStatus() {
    try {

      await toggleLeaderStatusAction(leader.id)

      toast.success(
        leader.status === "active"
          ? "Líder desactivado"
          : "Líder activado"
      )

      router.refresh()

    } catch {

      toast.error("Error actualizando estado")

    }
  }

  const teamName =
    teams.find((t) => t.id === leader.team_id)?.name ?? "—"

  const statusColor =
    leader.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600"

  const statusText =
    leader.status === "active"
      ? "Activo"
      : "Inactivo"

  const toggleText =
    leader.status === "active"
      ? "Desactivar"
      : "Activar"

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">

      {/* Nombre */}
      <td className="p-4 font-medium text-gray-800">
        {leader.name}
      </td>

      {/* Email */}
      <td className="p-4 text-gray-600 hidden md:table-cell">
        {leader.email}
      </td>

      {/* Equipo */}
      <td className="p-4 text-gray-600 hidden md:table-cell">
        {teamName}
      </td>

      {/* Estado */}
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}
        >
          {statusText}
        </span>
      </td>

      {/* Acciones */}
      <td className="p-4">
        <div className="flex items-center gap-2">

          {/* Activar / Desactivar */}
          <ConfirmDialog
            title={`${toggleText} líder`}
            description={`¿Seguro que quieres ${toggleText.toLowerCase()} este líder?`}
            onConfirm={handleToggleStatus}
          >
            <Button
              size="sm"
              variant="outline"
            >
              {toggleText}
            </Button>
          </ConfirmDialog>

          {/* Editar */}
          <Modal
            title="Editar líder"
            trigger={<EditButton />}
          >
            {(close) => (
              <LeaderForm
                leader={leader}
                teams={teams}
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar líder"
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