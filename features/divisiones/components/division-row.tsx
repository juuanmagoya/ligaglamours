"use client";

import { Division } from "../types/division.type"

import { EditButton } from "@/components/ui/edit-button"
import { DeleteButton } from "@/components/ui/delete-button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Modal } from "@/components/ui/modal"

import { DivisionForm } from "../components/division-form"

import { deleteDivisionAction } from "../actions/delete-division"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
  division: Division
}

export function DivisionRow({ division }: Props) {

  const router = useRouter()

  async function handleDelete() {
    try {

      await deleteDivisionAction(division.id)

      toast.success("División eliminada")

      router.refresh()

    } catch {

      toast.error("Error eliminando división")

    }
  }

  return (
    <tr className="border-t border-purple-100 hover:bg-purple-50 transition">

      <td className="p-4 font-medium text-gray-800">
        {division.name}
      </td>

      <td className="p-4 text-gray-600 hidden md:table-cell">
        {division.slug}
      </td>

      <td className="p-4 text-gray-600">
        {division.description}
      </td>

      <td className="p-4">
        <div className="flex items-center gap-2">

          {/* Editar */}
          <Modal
            title="Editar división"
            trigger={<EditButton />}
          >
            {(close) => (
              <DivisionForm
                division={division}
                onSuccess={() => {
                  close()
                  router.refresh()
                }}
              />
            )}
          </Modal>

          {/* Eliminar */}
          <ConfirmDialog
            title="Eliminar división"
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