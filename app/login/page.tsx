import Image from "next/image"
import { LoginForm } from "@/features/auth/components/login-form"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-purple-950 via-purple-900 to-fuchsia-900">
      
      {/* LOGO DE FONDO - Responsive */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/imgLogoLiga.png"
          alt="Logo Liga"
          width={1200}
          height={1200}
          className="w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] h-auto opacity-10"
          priority
        />
      </div>

      {/* OVERLAY OSCURO - Opcional, puedes quitarlo si quieres más claridad */}
      <div className="absolute inset-0 bg-black/20" />

      {/* LOGIN */}
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  )
}