"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, KeyRound, Shield, RefreshCw } from "lucide-react"

import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../schemas/change-password.schema"

import {
  ChangePasswordFormProps,
} from "../types/account.types"

import { useAccount } from "../hooks/use-account"

export function ChangePasswordForm({
  userId,
}: ChangePasswordFormProps) {
  const {
    error,
    success,
    isPending,
    handleChangePassword,
  } = useAccount()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  })

  async function onSubmit(data: ChangePasswordSchema) {
    const formData = new FormData()
    formData.append("currentPassword", data.currentPassword)
    formData.append("newPassword", data.newPassword)
    formData.append("confirmPassword", data.confirmPassword)
    await handleChangePassword(userId, formData)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Contraseña actual
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            {...register("currentPassword")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span className="text-xs">⚠️</span> {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 my-2" />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nueva contraseña
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            {...register("newPassword")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Nueva contraseña"
          />
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span className="text-xs">⚠️</span> {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirmar nueva contraseña
        </label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Confirmar contraseña"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span className="text-xs">⚠️</span> {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-600 flex items-center gap-2">
          <span>🔒</span> La contraseña debe tener al menos 6 caracteres
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <span>❌</span> {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
          <span>✅</span> {success}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        {isPending ? "Actualizando..." : "Cambiar contraseña"}
      </button>
    </form>
  )
}