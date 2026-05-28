"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createFechaAction } from "../actions/create-fecha"
import { updateFechaAction } from "../actions/update-fecha"

import {
  fechaSchema,
  FechaFormValues
} from "../schemas/fecha-schema"

import { Fecha } from "../types/fecha.type"

type Props = {
  fecha?: Fecha
  onSuccess?: () => void
}

export function FechaForm({
  fecha,
  onSuccess
}: Props) {

  const router = useRouter()

  const form = useForm<FechaFormValues>({
    resolver: zodResolver(fechaSchema),
    defaultValues: {
      name: fecha?.name ?? ""
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form

  async function onSubmit(data: FechaFormValues) {

    try {

      const formData = new FormData()

      formData.append("name", data.name)

      if (fecha) {

        await updateFechaAction(fecha.id, formData)

        toast.success("Fecha actualizada")

      } else {

        await createFechaAction(formData)

        toast.success("Fecha creada correctamente")

      }

      router.refresh()

      onSuccess?.()

    } catch {

      toast.error("Error guardando la fecha")

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
          className="
            w-full mt-1 border border-gray-300 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />

        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}

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
          ? fecha
            ? "Actualizando..."
            : "Creando..."
          : fecha
            ? "Actualizar fecha"
            : "Crear fecha"}

      </button>

    </form>
  )
}