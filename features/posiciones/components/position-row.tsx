"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Position } from "../types/position.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { UpdatePositionForm } from "./update-position-form"
import { deletePositionAction } from "../actions/delete-position"

type Props = {
  position: Position
  teams: { id: string; name: string }[]
  divisions: { id: string; name: string }[]
}

export function PositionRow({ position, teams, divisions }: Props) {

  const router = useRouter()

  async function handleDelete() {
    try {
      await deletePositionAction(position.id)
      toast.success("Posición eliminada correctamente")
      router.refresh()
    } catch {
      toast.error("Error eliminando la posición")
    }
  }

  const teamName = teams.find((t) => t.id === position.team_id)?.name ?? "—"
  const divisionName = divisions.find((d) => d.id === position.division_id)?.name ?? "—"

  const getPointsClass = () => {
    if (position.points >= 30) return "text-green-600 font-bold"
    if (position.points >= 20) return "text-blue-600 font-semibold"
    if (position.points <= 10) return "text-red-500"
    return "text-gray-800"
  }

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">
      <td className="p-4 font-bold text-purple-800 text-center">—</td>
      <td className="p-4 font-medium text-gray-800">{teamName}</td>
      <td className="p-4 text-gray-600 hidden md:table-cell">{divisionName}</td>
      <td className="p-4 text-center text-gray-700">{position.played}</td>
      <td className="p-4 text-center text-green-600 font-medium">{position.wins}</td>
      <td className="p-4 text-center text-yellow-600 font-medium">{position.draws}</td>
      <td className="p-4 text-center text-red-600 font-medium">{position.losses}</td>
      <td className={`p-4 text-center font-bold ${getPointsClass()}`}>{position.points}</td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          {/* Editar */}
          <Modal
            title="Actualizar resultados"
            trigger={<EditButton />}
          >
            {(close) => (
              <UpdatePositionForm
                position={position}
                teams={teams}
                divisions={divisions}
                onSuccess={close}
                onCancel={close}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar posición"
            description={`¿Estás seguro de eliminar la posición de ${teamName}? Esta acción no se puede deshacer.`}
            onConfirm={handleDelete}
          >
            <DeleteButton />
          </ConfirmDialog>
        </div>
      </td>
    </tr>
  )
}