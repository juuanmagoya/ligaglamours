// components/ui/modal.tsx
"use client"

import { ReactNode, useState } from "react"
import { X } from "lucide-react"
import { Portal } from "./portal"

type Props = {
  title: string
  children: (close: () => void) => ReactNode
  trigger: ReactNode
}

export function Modal({ title, children, trigger }: Props) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {trigger}
      </div>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4 shrink-0 bg-white">
                <h2 className="text-lg font-semibold text-purple-900">
                  {title}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {children(() => setOpen(false))}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}