"use client";

export default function Lore() {
  return (
    <section className="bg-gray-900 text-white py-20 text-center flex flex-col items-center">
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold">La Historia de Mufel</h2>
        <p className="mt-4 text-lg text-gray-300">
          En lo más profundo del infierno, donde las llamas nunca se apagan y
          las sombras cobran vida, nació{" "}
          <span className="text-yellow-500 font-bold">Mufel</span>, hijo del
          despiadado soberano de los condenados. Criado en la oscuridad y
          forjado en la batalla, su destino parecía estar escrito: gobernar a
          los caídos y extender el dominio del inframundo. Sin embargo, su
          padre, temiendo su potencial, lo desterró, expulsándolo hacia el mundo
          de los mortales.
        </p>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-500">
            El Viaje de Regreso
          </h3>
          <p className="mt-2 text-gray-300">
            Ahora, sin su poder demoníaco completo, Mufel deberá abrirse camino
            a través de diferentes mundos, enfrentándose a hordas de criaturas
            que intentarán impedir su regreso. Cada paso lo acercará más a su
            destino, cada batalla lo hará más fuerte, y cada enemigo derrotado
            le revelará un fragmento de su verdadero poder.
          </p>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-500">
            Dos Caminos, Un Solo Destino
          </h3>
          <p className="mt-2 text-gray-300">
            Mufel puede escoger dos rutas en su travesía:
          </p>
          <ul className="text-gray-300 mt-4 space-y-3 text-left list-disc list-inside">
            <li>
              🏆{" "}
              <span className="font-bold text-yellow-400">
                Modo Plataformas:
              </span>{" "}
              Un camino de precisión y reflejos, donde deberá sortear abismos,
              trampas y estructuras inestables mientras avanza con determinación
              hacia su objetivo.
            </li>
            <li>
              ⚔️{" "}
              <span className="font-bold text-yellow-400">Modo Roguelike:</span>{" "}
              Un desafío impredecible donde cada mazmorra es única, con enemigos
              cada vez más feroces y poderes ocultos que lo acercarán, paso a
              paso, a la confrontación final con su padre.
            </li>
          </ul>
        </div>

        <p className="mt-8 text-lg text-gray-300 italic">
          &quot;El infierno no es solo un lugar... es el reflejo de aquellos que se
          atreven a desafiarlo. ¿Tendrás el valor de recuperar lo que es tuyo?&quot;
        </p>
      </div>
    </section>
  );
}
