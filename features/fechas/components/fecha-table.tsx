import { Fecha } from "../types/fecha.type"

import { FechaRow } from "./fecha-row"

type Props = {
  fechas: Fecha[]
}

export function FechaTable({ fechas }: Props) {

  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">

      <table className="w-full text-sm">

        <thead className="bg-purple-100 text-purple-900">

          <tr>

            <th className="p-4 text-left">
              Nombre
            </th>

            <th className="p-4 text-left">
              Creada
            </th>

            <th className="p-4 text-left">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {fechas.map((fecha) => (
            <FechaRow
              key={fecha.id}
              fecha={fecha}
            />
          ))}

        </tbody>

      </table>

    </div>
  )
}