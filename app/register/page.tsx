import { supabase }
from "@/lib/supabase/client"

import { RegisterLeaderForm }
from "@/features/auth/components/register-leader-form"

export default async function RegisterPage() {

  const { data: teams, error } =
    await supabase
      .from("teams")
      .select(`
        id,
        name
      `)
      .order("name")

  if (error) {
    throw new Error(
      "Error al cargar equipos"
    )
  }

  return (
    <div
      className="
        flex min-h-screen items-center
        justify-center p-6
      "
    >

      <div
        className="
          w-full max-w-2xl
          rounded-2xl border p-8
          shadow-sm
        "
      >

        <div className="mb-8">
          <h1
            className="
              text-3xl font-bold
            "
          >
            Crear cuenta
          </h1>

          <p
            className="
              text-muted-foreground mt-2
            "
          >
            Registre un nuevo usuario
            líder para acceder al sistema
          </p>
        </div>

        <RegisterLeaderForm
          teams={teams ?? []}
        />

      </div>
    </div>
  )
}