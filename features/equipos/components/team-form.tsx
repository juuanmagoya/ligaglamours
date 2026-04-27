"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { slugify } from "@/lib/slugify"

import { createTeamAction } from "../actions/create-team"
import { updateTeamAction } from "../actions/update-team"
import { uploadTeamLogo } from "../utils/upload-logo"
import { compressImage } from "@/lib/utils/image"

import {
  teamSchema,
  TeamFormValues
} from "../schemas/equipo.schema"

import { Team } from "../types/equipo.type"
import { useSession } from "next-auth/react"

type Props = {
  team?: Team
  divisions: { id: string; name: string }[]
  onSuccess?: () => void
}

export function TeamForm({ team, divisions, onSuccess }: Props) {

  const router = useRouter()
  const { data: session } = useSession()

  const role = session?.user?.role

  const isLeader = role === "leader"

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team?.name ?? "",
      slug: team?.slug ?? "",
      logo_url: team?.logo_url ?? "",
      description: team?.description ?? "",
      division_id: team?.division_id ?? ""
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

  // generar slug automático SOLO si es creación y admin
  useEffect(() => {
    if (!team && name && !isLeader) {
      setValue("slug", slugify(name))
    }
  }, [name, setValue, team, isLeader])

  async function onSubmit(
    data: TeamFormValues,
    e?: React.BaseSyntheticEvent
  ) {
    try {

      const formData = new FormData()

      // 🔒 ADMIN puede mandar todo
      if (!isLeader) {
        formData.append("name", data.name)
        formData.append("slug", data.slug)
        formData.append("division_id", data.division_id)
      }

      const formEl = e?.target as HTMLFormElement
      const fileInput = formEl.querySelector(
        'input[name="logo"]'
      ) as HTMLInputElement | null

      const file = fileInput?.files?.[0] ?? null

      let logo_url: string | null = null

      if (file) {
        const compressedFile = await compressImage(file)
        logo_url = await uploadTeamLogo(compressedFile)
      }

      if (logo_url) {
        formData.append("logo_url", logo_url)
      } else if (team?.logo_url) {
        formData.append("logo_url", team.logo_url)
      }

      // 🔒 Leader solo puede esto
      if (data.description) {
        formData.append("description", data.description)
      }

      if (team) {
        await updateTeamAction(team.id, formData)
        toast.success("Equipo actualizado")
      } else {
        await createTeamAction(formData)
        toast.success("Equipo creado correctamente")
      }

      router.refresh()
      onSuccess?.()

    } catch (error: unknown) {

      const message =
        error instanceof Error
          ? error.message
          : "Error guardando el equipo"

      toast.error(message)
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
          disabled={isLeader}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
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
          disabled={isLeader}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
        />

        {errors.slug && (
          <p className="text-sm text-red-500 mt-1">
            {errors.slug.message}
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
          disabled={isLeader}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
        >
          <option value="">Seleccionar división</option>

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

      {/* Logo */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Logo
        </label>

        <input
          type="file"
          name="logo"
          accept="image/*"
          className="w-full mt-1"
        />
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
          ? team
            ? "Actualizando..."
            : "Creando..."
          : team
            ? "Actualizar equipo"
            : "Crear equipo"}

      </button>

    </form>
  )
}