"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { slugify } from "@/lib/slugify"
import { createDivisionAction } from "../actions/create-division"
import { updateDivisionAction } from "../actions/update-division"
import {
  divisionSchema,
  DivisionFormValues
} from "../schemas/division-schema"
import { Division } from "../types/division.type"


type Props = {
  division?: Division
  onSuccess?: () => void
}

export function DivisionForm({ division, onSuccess }: Props) {
  const router = useRouter()

  const form = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: division?.name ?? "",
      slug: division?.slug ?? "",
      description: division?.description ?? ""
    }
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = form

  const name = watch("name")

  // generar slug automático
useEffect(() => {
  if (!division && name) {
    setValue("slug", slugify(name))
  }
}, [name, setValue, division])

async function onSubmit(data: DivisionFormValues) {
  try {

    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("slug", data.slug)

    if (data.description) {
      formData.append("description", data.description)
    }

    if (division) {

      await updateDivisionAction(division.id, formData)

      toast.success("División actualizada")

    } else {

      await createDivisionAction(formData)

      toast.success("División creada correctamente")

    }

    router.refresh()

    onSuccess?.()

  } catch {

    toast.error("Error guardando la división")

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

      {/* Slug */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Slug
        </label>

        <input
          {...register("slug")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {errors.slug && (
          <p className="text-sm text-red-500 mt-1">
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Descripción
        </label>

        <textarea
          {...register("description")}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-600 text-white py-2 rounded-md
        hover:bg-purple-700 transition disabled:opacity-50"
      >
        {isSubmitting
        ? division
          ? "Actualizando..."
          : "Creando..."
        : division
          ? "Actualizar división"
          : "Crear división"}
      </button>
    </form>
  )
}