"use client"

import { useState, useTransition } from "react"

import {
  changeEmailAction,
  changePasswordAction,
  updateProfileAction,
} from "../actions/account.actions"

export function useAccount() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [isPending, startTransition] =
    useTransition()

  async function handleUpdateProfile(
    userId: string,
    formData: FormData
  ) {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const result =
        await updateProfileAction(
          userId,
          formData
        )

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess(
        result.message ??
          "Perfil actualizado"
      )
    })
  }

  async function handleChangeEmail(
    userId: string,
    formData: FormData
  ) {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const result =
        await changeEmailAction(
          userId,
          formData
        )

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess(
        result.message ??
          "Email actualizado"
      )
    })
  }

  async function handleChangePassword(
    userId: string,
    formData: FormData
  ) {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const result =
        await changePasswordAction(
          userId,
          formData
        )

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess(
        result.message ??
          "Contraseña actualizada"
      )
    })
  }

  return {
    error,
    success,
    isPending,

    handleUpdateProfile,
    handleChangeEmail,
    handleChangePassword,
  }
}