import { Division } from "../types/division.type"
import { DivisionRow } from "./division-row"

type Props = {
  divisions: Division[]
}

export function DivisionTable({ divisions }: Props) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">
      <table className="w-full text-sm">
        <thead className="bg-purple-100 text-purple-900">
            <tr>
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left hidden md:table-cell">Slug</th>
                <th className="p-4 text-left ">Descripción</th>
                <th className="p-4 text-left">Acciones</th>
            </tr>
        </thead>

        <tbody>
          {divisions.map((division) => (
            <DivisionRow key={division.id} division={division} />
          ))}
        </tbody>
      </table>
    </div>
  )
}