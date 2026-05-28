"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { MatchForm } from "./match-form"

import { Division } from "@/features/divisiones/types/division.type"
import { Team } from "@/features/equipos/types/equipo.type"
import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]
}

export function MatchesHeader({
  fechas,
  divisions,
  teams
}: Props) {

  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold text-purple-900">
          Enfrentamientos
        </h1>

        <p className="text-gray-500">
          Gestiona los enfrentamientos de la liga
        </p>

      </div>

      <Modal
        title="Nuevo enfrentamiento"
        trigger={
          <CreateButton>
            Nuevo enfrentamiento
          </CreateButton>
        }
      >
        {(close) => (
          <MatchForm
            fechas={fechas}
            divisions={divisions}
            teams={teams}
            onSuccess={close}
          />
        )}
      </Modal>

    </div>
  )
}