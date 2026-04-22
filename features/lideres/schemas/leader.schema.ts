import { z } from "zod"

export const leaderSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: z
    .string()
    .email("Debe ser un email válido"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  team_id: z
    .string()
    .uuid("El equipo seleccionado no es válido")
})

export type LeaderFormValues = z.infer<typeof leaderSchema>