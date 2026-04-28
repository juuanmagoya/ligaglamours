"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { PlayerForm } from "./player-form"

type Props = {
  teams: { id: string; name: string }[]
  user: {
    role: "admin" | "leader"
    team_id?: string | null
  }
}

export function PlayersHeader({ teams, user }: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          Jugadores
        </h1>

        <p className="text-gray-500">
          Gestiona los jugadores de los equipos
        </p>
      </div>

      <Modal
        title="Nuevo jugador"
        trigger={
          <CreateButton>
            Nuevo jugador
          </CreateButton>
        }
      >
        {(close) => (
          <PlayerForm
            teams={teams}
            onSuccess={close}
            user={user}
          />
        )}
      </Modal>

    </div>
  )
}