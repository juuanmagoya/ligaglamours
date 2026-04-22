"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createPlayerAction } from "../actions/create-player"
import { updatePlayerAction } from "../actions/update-player"

import {
  playerSchema,
  PlayerFormValues
} from "../schemas/player.schema"

import { Player } from "../types/player.type"

type Props = {
  player?: Player
  teams: { id: string; name: string }[]
  onSuccess?: () => void
}

export function PlayerForm({ player, teams, onSuccess }: Props) {

  const router = useRouter()

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      nickname: player?.nickname ?? "",
      id_game: player?.id_game ?? "",
      team_id: player?.team_id ?? ""
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form

  async function onSubmit(data: PlayerFormValues) {

    try {

      const formData = new FormData()

      formData.append("nickname", data.nickname)
      formData.append("id_game", data.id_game)

      if (data.team_id) {
        formData.append("team_id", data.team_id)
      }

      if (player) {

        await updatePlayerAction(player.id, formData)

        toast.success("Jugador actualizado")

      } else {

        await createPlayerAction(formData)

        toast.success("Jugador creado correctamente")

      }

      router.refresh()

      onSuccess?.()

    } catch {

      toast.error("Error guardando el jugador")

    }

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      {/* Nickname */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Nickname
        </label>

        <input
          {...register("nickname")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.nickname && (
          <p className="text-sm text-red-500 mt-1">
            {errors.nickname.message}
          </p>
        )}
      </div>

      {/* ID Game */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          ID Game
        </label>

        <input
          {...register("id_game")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.id_game && (
          <p className="text-sm text-red-500 mt-1">
            {errors.id_game.message}
          </p>
        )}
      </div>

      {/* Equipo */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Equipo
        </label>

        <select
          {...register("team_id")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        >

          <option value="">
            Sin equipo
          </option>

          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              {team.name}
            </option>
          ))}

        </select>

        {errors.team_id && (
          <p className="text-sm text-red-500 mt-1">
            {errors.team_id.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-600 text-white py-2 rounded-md
        hover:bg-purple-700 transition disabled:opacity-50"
      >

        {isSubmitting
          ? player
            ? "Actualizando..."
            : "Creando..."
          : player
            ? "Actualizar jugador"
            : "Crear jugador"}

      </button>

    </form>
  )
}