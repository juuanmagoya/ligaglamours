export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-600 to-purple-900 text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Liga Glamour
        </h1>

        <p className="text-lg md:text-xl text-purple-200 max-w-xl">
          Competencia profesional de esports donde los mejores equipos
          compiten por la gloria.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/teams"
            className="bg-white text-purple-700 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Ver equipos
          </a>

          <a
            href="/login"
            className="border border-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-purple-700 transition"
          >
            Panel
          </a>
        </div>
      </section>

      {/* INFO */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">
            Sobre la liga
          </h2>

          <p>
            Liga Glamour reúne equipos competitivos con sus respectivos líderes
            y jugadores. Cada equipo gestiona su plantilla y compite en un entorno
            organizado y profesional.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-purple-200 py-6 text-sm">
        © {new Date().getFullYear()} Liga Glamour. Todos los derechos reservados.
      </footer>

    </main>
  )
}