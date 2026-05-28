"use client"

import { useMemo } from "react"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
  matchSchema,
  MatchFormValues
} from "../schemas/match-schema"

import { Match } from "../types/match.type"

import { createMatchAction } from "../actions/create-match"

import { updateMatchAction } from "../actions/update-match"

import { Division } from "@/features/divisiones/types/division.type"

import { Team } from "@/features/equipos/types/equipo.type"

import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  match?: Match

  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]

  onSuccess?: () => void
}

export function MatchForm({
  match,
  fechas,
  divisions,
  teams,
  onSuccess
}: Props) {

  const router = useRouter()

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),

    defaultValues: {

      fecha_id:
        match?.fecha_id ?? "",

      division_id:
        match?.division_id ?? "",

      local_team_id:
        match?.local_team_id ?? "",

      away_team_id:
        match?.away_team_id ?? "",

      local_score:
        match?.local_score !== null &&
        match?.local_score !== undefined
          ? String(match.local_score)
          : undefined,

      away_score:
        match?.away_score !== null &&
        match?.away_score !== undefined
          ? String(match.away_score)
          : undefined,

      match_date:
        match?.match_date
          ? new Date(match.match_date)
              .toISOString()
              .slice(0, 16)
          : ""

    }
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = form

  const selectedDivision =
    watch("division_id")

  // 🔥 filtrar equipos por división
  const filteredTeams =
    useMemo(() => {

      if (!selectedDivision) {
        return teams
      }

      return teams.filter(
        (team) =>
          team.division_id ===
          selectedDivision
      )

    }, [teams, selectedDivision])

  async function onSubmit(
    data: MatchFormValues
  ) {

    try {

      const formData = new FormData()

      formData.append(
        "fecha_id",
        data.fecha_id
      )

      formData.append(
        "division_id",
        data.division_id
      )

      formData.append(
        "local_team_id",
        data.local_team_id
      )

      formData.append(
        "away_team_id",
        data.away_team_id
      )

      // 🔥 scores opcionales
      if (
        data.local_score &&
        data.local_score !== ""
      ) {

        formData.append(
          "local_score",
          data.local_score
        )

      }

      if (
        data.away_score &&
        data.away_score !== ""
      ) {

        formData.append(
          "away_score",
          data.away_score
        )

      }

      // 🔥 fecha opcional
      if (data.match_date) {

        formData.append(
          "match_date",
          data.match_date
        )

      }

      if (match) {

        await updateMatchAction(
          match.id,
          formData
        )

        toast.success(
          "Enfrentamiento actualizado"
        )

      } else {

        await createMatchAction(
          formData
        )

        toast.success(
          "Enfrentamiento creado"
        )

      }

      router.refresh()

      onSuccess?.()

    } catch {

      toast.error(
        "Error guardando enfrentamiento"
      )

    }

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      {/* Fecha */}
      <div>

        <label className="text-sm font-medium text-gray-700">
          Fecha
        </label>

        <select
          {...register("fecha_id")}
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        >

          <option value="">
            Seleccionar fecha
          </option>

          {fechas.map((fecha) => (
            <option
              key={fecha.id}
              value={fecha.id}
            >
              {fecha.name}
            </option>
          ))}

        </select>

        {errors.fecha_id && (
          <p className="text-sm text-red-500 mt-1">
            {errors.fecha_id.message}
          </p>
        )}

      </div>

      {/* División */}
      <div>

        <label className="text-sm font-medium text-gray-700">
          División
        </label>

        <select
          {...register("division_id")}
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        >

          <option value="">
            Seleccionar división
          </option>

          {divisions.map((division) => (
            <option
              key={division.id}
              value={division.id}
            >
              {division.name}
            </option>
          ))}

        </select>

        {errors.division_id && (
          <p className="text-sm text-red-500 mt-1">
            {errors.division_id.message}
          </p>
        )}

      </div>

      {/* Equipo local */}
      <div>

        <label className="text-sm font-medium text-gray-700">
          Equipo local
        </label>

        <select
          {...register("local_team_id")}
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        >

          <option value="">
            Seleccionar equipo
          </option>

          {filteredTeams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              {team.name}
            </option>
          ))}

        </select>

      </div>

      {/* Equipo visitante */}
      <div>

        <label className="text-sm font-medium text-gray-700">
          Equipo visitante
        </label>

        <select
          {...register("away_team_id")}
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        >

          <option value="">
            Seleccionar equipo
          </option>

          {filteredTeams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              {team.name}
            </option>
          ))}

        </select>

        {errors.away_team_id && (
          <p className="text-sm text-red-500 mt-1">
            {errors.away_team_id.message}
          </p>
        )}

      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="text-sm font-medium text-gray-700">
            Score local
          </label>

          <input
            type="number"
            {...register("local_score")}
            className="
              w-full mt-1 border border-gray-300 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />

        </div>

        <div>

          <label className="text-sm font-medium text-gray-700">
            Score visitante
          </label>

          <input
            type="number"
            {...register("away_score")}
            className="
              w-full mt-1 border border-gray-300 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />

        </div>

      </div>

      {/* Fecha del partido */}
      <div>

        <label className="text-sm font-medium text-gray-700">
          Fecha del partido
        </label>

        <input
          type="datetime-local"
          {...register("match_date")}
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full bg-purple-600 text-white py-2 rounded-md
          hover:bg-purple-700 transition disabled:opacity-50
        "
      >

        {isSubmitting
          ? match
            ? "Actualizando..."
            : "Creando..."
          : match
            ? "Actualizar enfrentamiento"
            : "Crear enfrentamiento"}

      </button>

    </form>
  )
}