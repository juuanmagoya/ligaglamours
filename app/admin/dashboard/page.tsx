import { Shield, Crown, Users, Trophy } from "lucide-react";

export default function DashboardPage() {

  const stats = [
    {
      title: "Total Equipos",
      value: 24,
      icon: Shield,
    },
    {
      title: "Total Líderes",
      value: 24,
      icon: Crown,
    },
    {
      title: "Total Jugadores",
      value: 180,
      icon: Users,
    },
  ];

  const divisiones = [
    { title: "Primera División", value: 12 },
    { title: "Segunda División", value: 12 },
    { title: "Tercera División", value: 12 },
    { title: "Cuarta División", value: 10 },
  ];

  return (
    <div className="space-y-8">

      {/* título */}
      <div>
        <h1 className="text-2xl font-bold text-purple-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Estadísticas generales de la liga
        </p>
      </div>

      {/* métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-purple-200 p-6 rounded-xl shadow-sm border border-purple-300 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <p className="text-3xl font-bold text-purple-800 mt-1">
                    {stat.value}
                  </p>
                </div>

                <div className="bg-purple-100 p-3 rounded-lg">
                  <Icon className="text-purple-800" size={22} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* divisiones */}
      <div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Equipos por División
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {divisiones.map((division, index) => (
            <div
              key={index}
              className="bg-purple-200 p-6 rounded-xl shadow-sm border border-purple-300 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {division.title}
                  </p>

                  <p className="text-3xl font-bold text-purple-700 mt-1">
                    {division.value}
                  </p>
                </div>

                <div className="bg-purple-100 p-3 rounded-lg">
                  <Trophy className="text-purple-800" size={22} />
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}