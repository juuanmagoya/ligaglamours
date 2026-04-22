"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { updatePositionAction } from "../actions/update-position"
import { updatePositionSchema, UpdatePositionFormValues } from "../schemas/position.schema"
import { Position } from "../types/position.type"

type Props = {
  position: Position
  teams: { id: string; name: string }[]
  divisions: { id: string; name: string }[]
  onSuccess?: () => void
  onCancel?: () => void
}

export function UpdatePositionForm({ position, teams, divisions, onSuccess, onCancel }: Props) {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdatePositionFormValues>({
    resolver: zodResolver(updatePositionSchema),
    defaultValues: {
      wins: position.wins,
      draws: position.draws,
      losses: position.losses
    }
  })

  async function onSubmit(data: UpdatePositionFormValues) {
    try {
      const formData = new FormData()
      
      if (data.wins !== undefined) formData.append("wins", data.wins.toString())
      if (data.draws !== undefined) formData.append("draws", data.draws.toString())
      if (data.losses !== undefined) formData.append("losses", data.losses.toString())

      await updatePositionAction(position.id, formData)
      
      toast.success("Resultados actualizados correctamente")
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("Error actualizando los resultados")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Información actual */}
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Equipo:</span>{" "}
          {teams.find(t => t.id === position.team_id)?.name || position.team_id}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">División:</span>{" "}
          {divisions.find(d => d.id === position.division_id)?.name || position.division_id}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Estadísticas actuales:</span>{" "}
          PJ: {position.played} | PG: {position.wins} | PE: {position.draws} | PP: {position.losses} | PTS: {position.points}
        </p>
      </div>

      {/* Wins */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Victorias
        </label>
        <input
          type="number"
          {...register("wins", { valueAsNumber: true })}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0"
        />
        {errors.wins && (
          <p className="text-sm text-red-500 mt-1">{errors.wins.message}</p>
        )}
      </div>

      {/* Draws */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Empates
        </label>
        <input
          type="number"
          {...register("draws", { valueAsNumber: true })}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0"
        />
        {errors.draws && (
          <p className="text-sm text-red-500 mt-1">{errors.draws.message}</p>
        )}
      </div>

      {/* Losses */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Derrotas
        </label>
        <input
          type="number"
          {...register("losses", { valueAsNumber: true })}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0"
        />
        {errors.losses && (
          <p className="text-sm text-red-500 mt-1">{errors.losses.message}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4 pb-2 mt-4 border-t sticky bottom-0 bg-white">
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
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  )
}