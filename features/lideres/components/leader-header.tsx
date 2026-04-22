"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { LeaderForm } from "./leader-form"

type Props = {
  teams: { id: string; name: string }[]
}

export function LeadersHeader({ teams }: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          Líderes
        </h1>

        <p className="text-gray-500">
          Gestiona los líderes de los equipos
        </p>
      </div>

      <Modal
        title="Nuevo líder"
        trigger={
          <CreateButton>
            Nuevo líder
          </CreateButton>
        }
      >
        {(close) => (
          <LeaderForm
            teams={teams}
            onSuccess={close}
          />
        )}
      </Modal>

    </div>
  )
}