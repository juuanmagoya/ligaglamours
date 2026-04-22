import { getDivisions } from "@/features/divisiones/services/divisions.service"
import { DivisionTable } from "@/features/divisiones/components/division-table"
import { DivisionsHeader } from "@/features/divisiones/components/divisions-header"

export default async function DivisionesPage() {

  const divisions = await getDivisions()

  return (
    <div className="p-6 space-y-6">

      <DivisionsHeader />

      <DivisionTable divisions={divisions} />

    </div>
  )
}