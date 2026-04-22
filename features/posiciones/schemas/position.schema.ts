import { z } from "zod"

// Schema para crear una posición (nuevo equipo en una división)
export const createPositionSchema = z.object({
  team_id: z
    .string()
    .uuid("El equipo seleccionado no es válido"),

  division_id: z
    .string()
    .uuid("La división seleccionada no es válida")
})

// Schema para actualizar resultados de una posición
export const updatePositionSchema = z.object({
  wins: z
    .number()
    .int("Las victorias deben ser un número entero")
    .min(0, "Las victorias no pueden ser negativas")
    .optional(),

  draws: z
    .number()
    .int("Los empates deben ser un número entero")
    .min(0, "Los empates no pueden ser negativos")
    .optional(),

  losses: z
    .number()
    .int("Las derrotas deben ser un número entero")
    .min(0, "Las derrotas no pueden ser negativas")
    .optional()
}).refine(
  (data) => {
    // Al menos uno de los campos debe estar presente
    return data.wins !== undefined || 
           data.draws !== undefined || 
           data.losses !== undefined;
  },
  {
    message: "Debes proporcionar al menos un resultado para actualizar (wins, draws o losses)"
  }
)

// Schema opcional para validar una posición existente completa
export const positionSchema = z.object({
  id: z.string().uuid("ID no válido"),
  team_id: z.string().uuid("ID de equipo no válido"),
  division_id: z.string().uuid("ID de división no válido"),
  played: z.number().int().min(0),
  wins: z.number().int().min(0),
  draws: z.number().int().min(0),
  losses: z.number().int().min(0),
  points: z.number().int().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

// Tipos inferidos para usar en formularios y componentes
export type CreatePositionFormValues = z.infer<typeof createPositionSchema>
export type UpdatePositionFormValues = z.infer<typeof updatePositionSchema>
export type PositionFormValues = z.infer<typeof positionSchema>