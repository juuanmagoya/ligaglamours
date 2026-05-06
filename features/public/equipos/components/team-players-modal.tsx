"use client"

import { TeamWithRelations } from "@/features/equipos/types/equipo.type"
import { useState, useEffect } from "react"
import { X, Copy, Check, Users, Gamepad2, Trophy } from "lucide-react"

type Props = {
  team: TeamWithRelations
  onClose: () => void
}

export function TeamPlayersModal({ team, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = team.players
      .map((p, idx) => `${idx + 1}. ${p.nickname} ${p.id_game ? `(ID: ${p.id_game})` : "(Sin ID)"}`)
      .join("\n")

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying:", error)
    }
  }

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Obtener color de división
  const getDivisionColor = () => {
    const divisionName = team.divisions?.[0]?.name || ""
    if (divisionName.includes("Primera") || divisionName.includes("1ª")) {
      return "from-yellow-500 to-amber-500"
    }
    if (divisionName.includes("Segunda") || divisionName.includes("2ª")) {
      return "from-gray-400 to-gray-500"
    }
    if (divisionName.includes("Tercera") || divisionName.includes("3ª")) {
      return "from-orange-500 to-orange-600"
    }
    if (divisionName.includes("Cuarta") || divisionName.includes("4ª")) {
      return "from-blue-500 to-blue-600"
    }
    return "from-purple-500 to-pink-500"
  }

  const divisionColor = getDivisionColor()
  const divisionName = team.divisions?.[0]?.name || "División"

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md mx-4 bg-[#1a1029] rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className={`bg-linear-to-r ${divisionColor} p-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white">{team.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Trophy className="w-3 h-3 text-yellow-300" />
                <span className="text-white/80 text-xs">{divisionName}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Body - Lista de jugadores */}
        <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Users className="w-4 h-4" />
              <span>{team.players.length} jugadores</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-medium transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar lista</span>
                </>
              )}
            </button>
          </div>

          {team.players.length > 0 ? (
            <div className="space-y-2">
              {team.players.map((p, idx) => (
                <div 
                  key={p.id}
                  className="group flex items-center justify-between p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-xs font-bold text-purple-300">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                        {p.nickname}
                      </p>
                      {p.id_game && (
                        <p className="text-white/40 text-xs font-mono">ID: {p.id_game}</p>
                      )}
                    </div>
                  </div>
                  {!p.id_game && (
                    <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                      Sin ID
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gamepad2 className="w-12 h-12 mx-auto text-white/20 mb-3" />
              <p className="text-white/40">No hay jugadores registrados</p>
              <p className="text-white/20 text-xs mt-1">Este equipo aún no tiene jugadores asignados</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-purple-500/20 bg-purple-500/5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Estilos para scrollbar personalizado */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }
      `}</style>
    </div>
  )
}