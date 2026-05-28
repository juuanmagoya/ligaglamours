"use client"

import { Modal } from "@/components/ui/modal"
import { CreateButton } from "@/components/ui/create-button"

import { FechaForm } from "./fecha-form"

export function FechasHeader() {

  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold text-purple-900">
          Fechas
        </h1>

        <p className="text-gray-500">
          Gestiona las fechas de la liga
        </p>

      </div>

      <Modal
        title="Nueva fecha"
        trigger={
          <CreateButton>
            Nueva fecha
          </CreateButton>
        }
      >
        {(close) => (
          <FechaForm onSuccess={close} />
        )}
      </Modal>

    </div>
  )
}