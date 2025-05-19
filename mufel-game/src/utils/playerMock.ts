// src/utils/playerMock.ts

// Utilidad para generar un hash basado en el ID del usuario
export function generateMockHash(seed: string): number {
  return [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Determina el rango a partir de los puntos (usado en rankedStats)
export function getCustomRank(points: number): string {
  if (points >= 1000) return "Leyenda Infernal";
  if (points >= 750) return "Cazador de Sombras";
  if (points >= 500) return "Explorador del Caos";
  if (points >= 250) return "Aventurero Raso";
  return "Novato";
}

// Genera datos falsos pero consistentes por usuario
export function generateMockStats(seed: string) {
  const hash = generateMockHash(seed);

  return {
    level: (hash % 50) + 1,
    played: {
      roguelike: (hash % 200) + 10,
      plataformas: (hash % 150) + 5,
    },
    globalStats: {
      expeditions: (hash % 100) + 20,
      bestTime: `${3 + (hash % 3)}:${10 + (hash % 50)}`,
      highestKills: (hash % 60) + 10,
    },
    matchHistory: [
      {
        outcome: "Victoria",
        playtime: `${4 + (hash % 2)}:${20 + (hash % 30)}`,
        kills: (hash % 60),
        rooms: (hash % 10) + 5,
      },
      {
        outcome: "Derrota",
        playtime: `${3 + (hash % 2)}:${10 + (hash % 50)}`,
        kills: (hash % 40),
        rooms: (hash % 8) + 4,
      },
      {
        outcome: "Victoria",
        playtime: `${5 + (hash % 2)}:${15 + (hash % 20)}`,
        kills: (hash % 50),
        rooms: (hash % 10) + 6,
      },
    ],
  };
}

// Combina Supabase + Mock en un solo objeto listo para renderizar
export function getFullPlayerData(
  userId: string,
  username: string,
  avatar: string = "/img/logo-mufel.jpeg",
  points: number = 0
) {
  const mock = generateMockStats(userId);

  return {
    player: {
      avatar: avatar || "/img/logo-mufel.jpeg",
      username,
      level: mock.level,
    },
    rankedStats: {
      rank: getCustomRank(points),
      expeditions: mock.globalStats.expeditions,
      defeats: Math.floor(mock.globalStats.expeditions * 0.3),
    },
    matchHistory: mock.matchHistory,
    globalStats: {
      ...mock.globalStats,
      points,
    },
  };
}
