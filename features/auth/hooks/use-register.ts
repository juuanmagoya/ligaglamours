"use client"

import { useState } from "react"

import {
  registerLeaderAction,
} from "../actions/register.actions"

export function useRegister() {

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  const [isPending, setIsPending] =
    useState(false)

  async function handleRegister(
    formData: FormData
  ) {

    try {

      setError("")
      setSuccess("")
      setIsPending(true)

      const result =
        await registerLeaderAction(
          formData
        )

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess(
        result.message ??
        "Usuario registrado"
      )

    } finally {

      setIsPending(false)
    }
  }

  return {
    error,
    success,
    isPending,
    handleRegister,
  }
}