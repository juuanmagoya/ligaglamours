"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { TeamForm } from "./team-form"

type Props = {
  divisions: { id: string; name: string }[]
}

export function TeamsHeader({ divisions }: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          Equipos
        </h1>

        <p className="text-gray-500">
          Gestiona los equipos de la liga
        </p>
      </div>

      <Modal
        title="Nuevo equipo"
        trigger={
          <CreateButton>
            Nuevo equipo
          </CreateButton>
        }
      >
        {(close) => (
          <TeamForm
            divisions={divisions}
            onSuccess={close}
          />
        )}
      </Modal>

    </div>
  )
}