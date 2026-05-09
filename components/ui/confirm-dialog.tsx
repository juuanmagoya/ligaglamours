"use client"

import { useState, ReactNode } from "react"

type Props = {
  title: string
  description?: string
  onConfirm: () => Promise<void> | void
  children: ReactNode
}

export function ConfirmDialog({
  title,
  description,
  onConfirm,
  children
}: Props) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    try {
      setLoading(true)

      await onConfirm()

      setOpen(false)

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">

            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-gray-500 mt-2">
                {description}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-md border text-black border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                {loading ? "Eliminando..." : "Confirmar"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  )
}