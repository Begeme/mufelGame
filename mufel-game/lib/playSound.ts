export const playChatSound = () => {
    const enabled = localStorage.getItem("soundEnabled") === "true";
    if (!enabled) {
      console.log("🔇 Sonido desactivado desde localStorage");
      return;
    }
  
    const audio = new Audio("/sounds/chat-sound.mp3");
    audio.volume = 0.4;
    audio.play().catch((e) => console.error("Error al reproducir sonido", e));
  };