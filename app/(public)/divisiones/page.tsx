import { Navbar } from "@/features/public/home/components/navbar"
import { getPositions } from "@/features/posiciones/services/position.service"
import { DivisionsView } from "@/features/public/divisiones/components/divisions-view"
import { PositionWithRelations } from "@/features/posiciones/types/position.type"

// 🔥 Agrega esto - Revalida cada 60 segundos
export const revalidate = 60

export default async function DivisionesPage() {
  let positions: PositionWithRelations[] = []

  try {
    positions = await getPositions()
  } catch (error) {
    console.error("Error fetching positions:", error)
  }

  return (
    <>
      <Navbar />
      <DivisionsView positions={positions} />
    </>
  )
}