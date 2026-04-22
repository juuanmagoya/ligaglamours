import { z } from "zod"

export const teamSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres"),

  logo_url: z
    .string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .optional(),

  division_id: z
    .string()
    .uuid("La división seleccionada no es válida")
})

export type TeamFormValues = z.infer<typeof teamSchema>