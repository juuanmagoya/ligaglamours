"use server"

import {
  changeEmailSchema,
} from "../schemas/change-email.schema"

import {
  changePasswordSchema,
} from "../schemas/change-password.schema"

import {
  updateProfileSchema,
} from "../schemas/update-profile.schema"

import {
  comparePassword,
  hashPassword,
} from "../utils/password"

import {
  getUserByEmail,
  getUserById,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "../services/account.service"

import type {
  AccountActionResponse,
} from "../types/account.types"

export async function updateProfileAction(
  userId: string,
  formData: FormData
): Promise<AccountActionResponse> {
  try {
    const values = Object.fromEntries(
      formData.entries()
    )

    const validated =
      updateProfileSchema.safeParse(values)

    if (!validated.success) {
      return {
        error:
          validated.error.issues[0]?.message ??
          "Datos inválidos",
      }
    }

    await updateUserName(
      userId,
      validated.data.name
    )

    return {
      success: true,
      message:
        "Nombre actualizado correctamente",
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

export async function changeEmailAction(
  userId: string,
  formData: FormData
): Promise<AccountActionResponse> {
  try {
    const values = Object.fromEntries(
      formData.entries()
    )

    const validated =
      changeEmailSchema.safeParse(values)

    if (!validated.success) {
      return {
        error:
          validated.error.issues[0]?.message ??
          "Datos inválidos",
      }
    }

    const user = await getUserById(userId)

    if (!user) {
      return {
        error: "Usuario no encontrado",
      }
    }

    const emailExists =
      await getUserByEmail(
        validated.data.newEmail
      )

    if (
      emailExists &&
      emailExists.id !== userId
    ) {
      return {
        error:
          "El email ya está en uso",
      }
    }

    const isValidPassword =
      await comparePassword(
        validated.data.currentPassword,
        user.password
      )

    if (!isValidPassword) {
      return {
        error:
          "Contraseña incorrecta",
      }
    }

    await updateUserEmail(
      userId,
      validated.data.newEmail
    )

    return {
      success: true,
      message:
        "Email actualizado correctamente",
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

export async function changePasswordAction(
  userId: string,
  formData: FormData
): Promise<AccountActionResponse> {
  try {
    const values = Object.fromEntries(
      formData.entries()
    )

    const validated =
      changePasswordSchema.safeParse(values)

    if (!validated.success) {
      return {
        error:
          validated.error.issues[0]?.message ??
          "Datos inválidos",
      }
    }

    const user = await getUserById(userId)

    if (!user) {
      return {
        error: "Usuario no encontrado",
      }
    }

    const isValidPassword =
      await comparePassword(
        validated.data.currentPassword,
        user.password
      )

    if (!isValidPassword) {
      return {
        error:
          "La contraseña actual es incorrecta",
      }
    }

    const hashedPassword =
      await hashPassword(
        validated.data.newPassword
      )

    await updateUserPassword(
      userId,
      hashedPassword
    )

    return {
      success: true,
      message:
        "Contraseña actualizada correctamente",
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