"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { Match } from "../types/match.type"

import { deleteMatchAction } from "../actions/delete-match"

import { MatchForm } from "./match-form"

import { Modal } from "@/components/ui/modal"

import { EditButton } from "@/components/ui/edit-button"

import { DeleteButton } from "@/components/ui/delete-button"

import { ConfirmDialog } from "@/components/ui/confirm-dialog"

import { Division } from "@/features/divisiones/types/division.type"

import { Team } from "@/features/equipos/types/equipo.type"

import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  match: Match

  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]
}

export function MatchRow({
  match,
  fechas,
  divisions,
  teams
}: Props) {

  const router = useRouter()

  async function handleDelete() {

    try {

      await deleteMatchAction(match.id)

      toast.success(
        "Enfrentamiento eliminado"
      )

      router.refresh()

    } catch {

      toast.error(
        "Error eliminando enfrentamiento"
      )

    }

  }

  return (
    <tr className="
      border-t border-purple-100
      hover:bg-white/60 transition
    ">

      {/* Enfrentamiento */}
      <td className="p-4">

        <div className="
          flex items-center gap-2
          font-medium text-gray-800
        ">

          <span>
            {match.local_team?.name}
          </span>

          <span className="
            text-gray-400 font-bold
          ">
            VS
          </span>

          <span>
            {match.away_team?.name}
          </span>

        </div>

      </td>

      {/* Resultado */}
      <td className="
        p-4 text-gray-700
        font-semibold
      ">

        {match.local_score !== null &&
        match.away_score !== null
          ? `${match.local_score} - ${match.away_score}`
          : "Pendiente"}

      </td>

      {/* Fecha partido */}
      <td className="
        p-4 text-gray-600
        hidden lg:table-cell
      ">

        {match.match_date
          ? new Date(
              match.match_date
            ).toLocaleString()
          : "-"}

      </td>

      {/* Acciones */}
      <td className="p-4">

        <div className="
          flex items-center gap-2
        ">

          {/* Editar */}
          <Modal
            title="Editar enfrentamiento"
            trigger={<EditButton />}
          >

            {(close) => (

              <MatchForm
                match={match}

                fechas={fechas}
                divisions={divisions}
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
            title="Eliminar enfrentamiento"
            description="
              Esta acción no se puede deshacer
            "
            onConfirm={handleDelete}
          >

            <DeleteButton />

          </ConfirmDialog>

        </div>

      </td>

    </tr>
  )
}