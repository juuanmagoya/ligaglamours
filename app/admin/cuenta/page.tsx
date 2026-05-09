import { redirect } from "next/navigation"

import { AccountForm } from "@/features/auth/components/account-form"
import { ChangeEmailForm } from "@/features/auth/components/change-email-form"
import { ChangePasswordForm } from "@/features/auth/components/change-password-form"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function MyAccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Mi cuenta
        </h1>

        <p className="text-muted-foreground">
          Administra tu información personal
        </p>
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Perfil
        </h2>

        <AccountForm user={user} />
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Cambiar email
        </h2>

        <ChangeEmailForm
          userId={user.id}
          currentEmail={user.email}
        />
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Cambiar contraseña
        </h2>

        <ChangePasswordForm
          userId={user.id}
        />
      </div>a
    </div>
  )
}