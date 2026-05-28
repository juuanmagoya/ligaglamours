import { z } from "zod"

export const fechaSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
})

export type FechaFormValues = z.infer<typeof fechaSchema>