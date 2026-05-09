import { z } from "zod"

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(
        3,
        "El nombre debe tener al menos 3 caracteres"
      )
      .max(
        100,
        "El nombre es demasiado largo"
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(
        "Debe ingresar un email válido"
      ),

    password: z
      .string()
      .min(
        6,
        "La contraseña debe tener al menos 6 caracteres"
      )
      .max(
        100,
        "La contraseña es demasiado larga"
      ),

    confirmPassword: z
      .string()
      .min(
        6,
        "Debe confirmar la contraseña"
      ),

    team_id: z
      .string()
      .uuid("Equipo inválido")
      .nullable()
      .optional(),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message:
        "Las contraseñas no coinciden",
    }
  )

export type RegisterSchema =
  z.infer<typeof registerSchema>