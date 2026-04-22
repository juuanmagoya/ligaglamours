import { z } from "zod"

export const divisionSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres"),

  description: z
    .string()
    .optional()
})

export type DivisionFormValues = z.infer<typeof divisionSchema>