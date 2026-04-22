"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createPositionAction } from "../actions/create-position"
import { createPositionSchema, CreatePositionFormValues } from "../schemas/position.schema"

type Props = {
  teams: { id: string; name: string }[]
  divisions: { id: string; name: string }[]
  onSuccess?: () => void
  onCancel?: () => void
}

export function CreatePositionForm({ teams, divisions, onSuccess, onCancel }: Props) {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreatePositionFormValues>({
    resolver: zodResolver(createPositionSchema),
    defaultValues: {
      team_id: "",
      division_id: ""
    }
  })

  async function onSubmit(data: CreatePositionFormValues) {
    try {
      const formData = new FormData()
      formData.append("team_id", data.team_id)
      formData.append("division_id", data.division_id)

      await createPositionAction(formData)
      
      toast.success("Posición creada correctamente")
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("Error creando la posición")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Team */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Equipo
        </label>
        <select
          {...register("team_id")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Seleccionar equipo</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team_id && (
          <p className="text-sm text-red-500 mt-1">{errors.team_id.message}</p>
        )}
      </div>

      {/* Division */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          División
        </label>
        <select
          {...register("division_id")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Seleccionar división</option>
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
        {errors.division_id && (
          <p className="text-sm text-red-500 mt-1">{errors.division_id.message}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md
          hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 text-white py-2 rounded-md
          hover:bg-purple-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creando..." : "Crear posición"}
        </button>
      </div>
    </form>
  )
}