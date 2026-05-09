import { z } from "zod"

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),
})

export type UpdateProfileSchema =
  z.infer<typeof updateProfileSchema>