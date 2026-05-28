import { getFechas } from "@/features/fechas/services/fecha.service"

import { FechasHeader } from "@/features/fechas/components/fecha-header"
import { FechaTable } from "@/features/fechas/components/fecha-table"

export default async function FechasPage() {

  const fechas = await getFechas()

  return (
    <div className="p-6 space-y-6">

      <FechasHeader />

      <FechaTable
        fechas={fechas}
      />

    </div>
  )
}