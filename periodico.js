document.addEventListener("DOMContentLoaded", () => {
  const nombreEntrenador = localStorage.getItem("coachName") || "Entrenador";
  const nombreClub = localStorage.getItem("selectedClub") || "Equipo sin nombre";
  document.getElementById("nombreEntrenador").textContent = nombreEntrenador;
  document.getElementById("nombreClub").textContent = nombreClub;
  const titulares = [
    // Críticos
    `¿${nombreEntrenador} al mando de ${nombreClub}? ¡Una apuesta arriesgada!`,
    `Las dudas rodean a ${nombreEntrenador}: ¿Está preparado para dirigir a ${nombreClub}?`,
    `Hinchas de ${nombreClub} no están convencidos con la llegada de ${nombreEntrenador}.`,
    
    // Constructivos
    `${nombreEntrenador} promete trabajo y resultados en ${nombreClub}.`,
    `Nuevo ciclo: ${nombreEntrenador} inicia su era en ${nombreClub}.`,
    `Confianza total: la directiva de ${nombreClub} respalda a ${nombreEntrenador}.`,
    // Polémicos
    `${nombreEntrenador} fue elegido entre críticas internas en ${nombreClub}.`,
    `Filtran que ${nombreEntrenador} no era la primera opción de ${nombreClub}.`,
    `¿Conflicto en puerta? ${nombreEntrenador} quiere cambios desde el primer día.`,
    // Destructivos
    `${nombreEntrenador}, ¿el peor fichaje del año para ${nombreClub}?`,
    `"No tiene nivel para el club": prensa destroza a ${nombreEntrenador}.`,
    `${nombreClub} toca fondo al anunciar a ${nombreEntrenador}.`,
    // Suaves
    `${nombreEntrenador} asume con perfil bajo pero ambición clara.`,
    `Un nuevo comienzo tranquilo para ${nombreEntrenador} en ${nombreClub}.`,
    `${nombreEntrenador} ya dirige su primera práctica en ${nombreClub}.`,
    // Amarillistas
    `¡BOMBA! ${nombreEntrenador} llega a ${nombreClub} y sacude el mercado.`,
    `¡Escándalo! ${nombreEntrenador} exige 10 cambios en ${nombreClub} apenas llega.`,
    `¡Revolución total! ${nombreEntrenador} no contará con históricos en ${nombreClub}.`
  ];
  // Escoger un titular al azar
  const titularElegido = titulares[Math.floor(Math.random() * titulares.length)];
  document.getElementById("titular").textContent = titularElegido;
  document.getElementById("continuarBtn").addEventListener("click", () => {
    window.location.href = "plantilla.html";
  });
  
});
