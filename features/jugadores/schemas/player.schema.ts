import { z } from "zod"

export const playerSchema = z.object({

  nickname: z
    .string()
    .min(2, "El nickname debe tener al menos 2 caracteres"),

  id_game: z
    .string()
    .min(2, "El ID Game es obligatorio"),

  team_id: z
    .string()
    .uuid("El equipo seleccionado no es válido")
    .optional()
    .or(z.literal(""))

})

export type PlayerFormValues = z.infer<typeof playerSchema>