    "use client"

    import { Modal } from "@/components/ui/modal"
    import { CreateButton } from "@/components/ui/create-button"
    import { DivisionForm } from "./division-form"

    export function DivisionsHeader() {
    return (
        <div className="flex items-center justify-between">

        <div>
            <h1 className="text-2xl font-bold text-purple-900">
            Divisiones
            </h1>

            <p className="text-gray-500">
            Gestiona las divisiones de la liga
            </p>
        </div>

        <Modal
            title="Nueva división"
            trigger={
            <CreateButton>
                Nueva división
            </CreateButton>
            }
        >
            {(close) => (
            <DivisionForm onSuccess={close} />
            )}
        </Modal>

        </div>
    )
    }