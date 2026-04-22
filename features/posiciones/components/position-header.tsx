"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { CreatePositionForm } from "./create-position-form"

type Props = {
  teams: { id: string; name: string }[]
  divisions: { id: string; name: string }[]
}

export function PositionsHeader({ teams, divisions }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          Tabla de Posiciones
        </h1>
        <p className="text-gray-500">
          Gestiona las posiciones y resultados de los equipos por división
        </p>
      </div>

      <Modal
        title="Nueva posición"
        trigger={<CreateButton>Nueva posición</CreateButton>}
      >
        {(close) => (
          <CreatePositionForm
            teams={teams}
            divisions={divisions}
            onSuccess={close}
            onCancel={close}
          />
        )}
      </Modal>
    </div>
  )
}