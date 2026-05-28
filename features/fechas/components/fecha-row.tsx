"use client";

import { Fecha } from "../types/fecha.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { FechaForm } from "../components/fecha-form"

import { deleteFechaAction } from "../actions/delete-fecha"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
  fecha: Fecha
}

export function FechaRow({ fecha }: Props) {

  const router = useRouter()

  async function handleDelete() {

    try {

      await deleteFechaAction(fecha.id)

      toast.success("Fecha eliminada")

      router.refresh()

    } catch {

      toast.error("Error eliminando fecha")

    }

  }

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">

      <td className="p-4 font-medium text-gray-800">
        {fecha.name}
      </td>

      <td className="p-4 text-gray-600">
        {new Date(fecha.created_at).toLocaleDateString()}
      </td>

      <td className="p-4">

        <div className="flex items-center gap-2">

          {/* Editar */}
          <Modal
            title="Editar fecha"
            trigger={<EditButton />}
          >
            {(close) => (
              <FechaForm
                fecha={fecha}
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar fecha"
            description="Esta acción no se puede deshacer"
            onConfirm={handleDelete}
          >
            <DeleteButton />
          </ConfirmDialog>

        </div>

      </td>

    </tr>
  )
}