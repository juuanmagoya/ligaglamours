import { z } from "zod"

export const matchSchema = z.object({

  fecha_id: z
    .string()
    .min(1, "La fecha es obligatoria"),

  division_id: z
    .string()
    .min(1, "La división es obligatoria"),

  local_team_id: z
    .string()
    .min(1, "El equipo local es obligatorio"),

  away_team_id: z
    .string()
    .min(1, "El equipo visitante es obligatorio"),

  local_score: z
    .string()
    .optional(),

  away_score: z
    .string()
    .optional(),

  match_date: z
    .string()
    .optional()

}).refine(
  (data) =>
    data.local_team_id !==
    data.away_team_id,
  {
    message:
      "Los equipos deben ser diferentes",

    path: ["away_team_id"]
  }
)

export type MatchFormValues =
  z.infer<typeof matchSchema>