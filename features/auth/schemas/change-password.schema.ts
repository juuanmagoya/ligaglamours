import { z } from "zod"

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "La contraseña actual es obligatoria"),

    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña es demasiado larga"),

    confirmPassword: z
      .string()
      .min(6, "Debe confirmar la contraseña"),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Las contraseñas no coinciden",
    }
  )

export type ChangePasswordSchema =
  z.infer<typeof changePasswordSchema>