import { z } from "zod"

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Debe ingresar un email válido"),

  currentPassword: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export type ChangeEmailSchema =
  z.infer<typeof changeEmailSchema>