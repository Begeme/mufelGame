export default function Stats() {
    return (
      <section className="bg-gray-900 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Estadísticas Globales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">500,000+</h3>
              <p className="text-gray-400">Jugadores Activos</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">120,000+</h3>
              <p className="text-gray-400">Partidas Jugadas</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">99%</h3>
              <p className="text-gray-400">Tiempo de Uptime del Servidor</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  