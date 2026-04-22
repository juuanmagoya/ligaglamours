"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Team } from "../types/equipo.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { TeamForm } from "./team-form"

import { deleteTeamAction } from "../actions/delete-team"

type Props = {
  team: Team
  divisions: { id: string; name: string }[]
}

export function TeamRow({ team, divisions }: Props) {

  const router = useRouter()

  async function handleDelete() {
    try {

      await deleteTeamAction(team.id)

      toast.success("Equipo eliminado")

      router.refresh()

    } catch {

      toast.error("Error eliminando equipo")

    }
  }

  const divisionName =
    divisions.find((d) => d.id === team.division_id)?.name ?? "—"

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">

      {/* Logo */}
      <td className="p-4">
        {team.logo_url ? (
          <Image
            src={team.logo_url}
            alt={team.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center text-xs text-purple-600">
            N/A
          </div>
        )}
      </td>

      {/* Nombre */}
      <td className="p-4 font-medium text-gray-800">
        {team.name}
      </td>

      {/* División */}
      <td className="p-4 text-gray-600 hidden md:table-cell">
        {divisionName}
      </td>

      {/* Descripción */}
      <td className="p-4 text-gray-600 hidden lg:table-cell">
        {team.description}
      </td>

      {/* Acciones */}
      <td className="p-4">
        <div className="flex items-center gap-2">

          {/* Editar */}
          <Modal
            title="Editar equipo"
            trigger={<EditButton />}
          >
            {(close) => (
              <TeamForm
                team={team}
                divisions={divisions}
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar equipo"
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