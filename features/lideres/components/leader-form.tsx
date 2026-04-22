"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createLeaderAction } from "../actions/create-leader"
import { updateLeaderAction } from "../actions/update-leader"

import {
  leaderSchema,
  LeaderFormValues
} from "../schemas/leader.schema"

import { Leader } from "../types/leader.type"

type Props = {
  leader?: Leader
  teams: { id: string; name: string }[]
  onSuccess?: () => void
}

export function LeaderForm({ leader, teams, onSuccess }: Props) {

  const router = useRouter()

  const form = useForm<LeaderFormValues>({
    resolver: zodResolver(leaderSchema),
    defaultValues: {
      name: leader?.name ?? "",
      email: leader?.email ?? "",
      password: "",
      team_id: leader?.team_id ?? ""
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form

  async function onSubmit(data: LeaderFormValues) {

    try {

      const formData = new FormData()

      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("team_id", data.team_id)

      if (data.password) {
        formData.append("password", data.password)
      }

      if (leader) {

        await updateLeaderAction(leader.id, formData)

        toast.success("Líder actualizado")

      } else {

        await createLeaderAction(formData)

        toast.success("Líder creado correctamente")

      }

      router.refresh()

      onSuccess?.()

    } catch {

      toast.error("Error guardando el líder")

    }

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      {/* Nombre */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Nombre
        </label>

        <input
          {...register("name")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Contraseña
        </label>

        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
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
            Seleccionar equipo
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
          ? leader
            ? "Actualizando..."
            : "Creando..."
          : leader
            ? "Actualizar líder"
            : "Crear líder"}

      </button>

    </form>
  )
}