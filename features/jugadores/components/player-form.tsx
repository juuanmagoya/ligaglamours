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
  user: {
    role: "admin" | "leader"
    team_id?: string | null
  }
  onSuccess?: () => void // 🔥 FALTABA
}

function isWeekend() {
  const day = new Date().getDay()
  return day === 0 || day === 6 || day === 5 || day === 1 || day === 2 // 0 = domingo, 6 = sábado, 5 = viernes, 1 = lunes, 2 = martes
}

export function PlayerForm({ player, teams, user, onSuccess }: Props) {

  const router = useRouter()

  const canEdit = user.role === "admin" || isWeekend()

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

    if (!canEdit) {
      toast.error("Solo pueden crear o modificar jugadores los fines de semana.")
      return
    }

    try {

      const formData = new FormData()

      formData.append("nickname", data.nickname)
      formData.append("id_game", data.id_game)

      // 🔥 SOLO ADMIN ENVÍA TEAM
      if (user.role === "admin" && data.team_id) {
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

      {/* 🚨 MENSAJE */}
      {!canEdit && user.role === "leader" && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm">
          Solo pueden crear o modificar jugadores los fines de semana.
        </div>
      )}

      {/* Nickname */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Nickname
        </label>

        <input
          {...register("nickname")}
          disabled={!canEdit}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
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
          disabled={!canEdit}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />

        {errors.id_game && (
          <p className="text-sm text-red-500 mt-1">
            {errors.id_game.message}
          </p>
        )}
      </div>

      {/* 🔥 SOLO ADMIN VE SELECT */}
      {user.role === "admin" && (
        <div>
          <label className="text-sm font-medium text-gray-700">
            Equipo
          </label>

          <select
            {...register("team_id")}
            disabled={!canEdit}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >

            <option value="">
              Sin equipo
            </option>

            {teams.map((team) => (
              <option key={team.id} value={team.id}>
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
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting || !canEdit}
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