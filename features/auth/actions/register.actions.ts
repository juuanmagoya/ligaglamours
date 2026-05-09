"use server"

import {
  registerSchema,
} from "../schemas/register.schema"

import {
  hashPassword,
} from "../utils/password"

import {
  createLeader,
  getUserByEmail,
} from "../services/register.service"

import type {
  RegisterActionResponse,
} from "../types/register.types"

export async function registerLeaderAction(
  formData: FormData
): Promise<RegisterActionResponse> {

  try {

    const values = Object.fromEntries(
      formData.entries()
    )

    const validated =
      registerSchema.safeParse(values)

    if (!validated.success) {
      return {
        error:
          validated.error.issues[0]?.message ??
          "Datos inválidos",
      }
    }

    const existingUser =
      await getUserByEmail(
        validated.data.email
      )

    if (existingUser) {
      return {
        error:
          "El email ya está registrado",
      }
    }

    const hashedPassword =
      await hashPassword(
        validated.data.password
      )

    await createLeader({
      name: validated.data.name,

      email: validated.data.email,

      password: hashedPassword,

      team_id:
        validated.data.team_id ?? null,
    })

    return {
      success: true,
      message:
        "Líder registrado correctamente",
    }

  } catch (error) {

    return {
      error:
        error instanceof Error
          ? error.message
          : "Error inesperado",
    }
  }
}