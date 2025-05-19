document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos guardados del entrenador y club
  const savedCoachName = localStorage.getItem("coachName");
  const savedClub = localStorage.getItem("selectedClub");

  // Redirecciones si falta algo
  if (!savedCoachName) {
    window.location.href = "main.html";
    return;
  }

  if (!savedClub) {
    window.location.href = "seleccion-equipo.html";
    return;
  }

  // Mostrar datos en pantalla
  const coachNameDisplay = document.getElementById("coachNameDisplay");
  const clubDisplay = document.getElementById("clubDisplay");
  const fechaDisplay = document.getElementById("fechaDisplay");
  const posicionDisplay = document.getElementById("posicionDisplay");
  const proximoPartido = document.getElementById("proximoPartido");

  if (coachNameDisplay) coachNameDisplay.textContent = savedCoachName;
  if (clubDisplay) clubDisplay.textContent = savedClub;

  // Ejemplo básico de fecha y posición
  const jornada = localStorage.getItem("jornadaActual") || "Jornada 1";
  if (fechaDisplay) fechaDisplay.textContent = jornada;

  const posicion = localStorage.getItem("posicionTabla") || "-";
  if (posicionDisplay) posicionDisplay.textContent = posicion;

  // Mostrar próximo partido simulado
  const rival = "Alianza Lima"; // Puedes cambiarlo por lógica futura
  if (proximoPartido) {
    proximoPartido.textContent = `${savedClub} vs ${rival}`;
  }

  // Botones del menú
  document.getElementById("plantillaBtn")?.addEventListener("click", () => {
    window.location.href = "plantilla.html";
  });

  document.getElementById("estrategiaBtn")?.addEventListener("click", () => {
    window.location.href = "estrategia.html";
  });

  document.getElementById("canterasBtn")?.addEventListener("click", () => {
    window.location.href = "canteras.html";
  });

  document.getElementById("estadisticasBtn")?.addEventListener("click", () => {
    window.location.href = "estadisticas.html";
  });

  document.getElementById("jugarPartidoBtn")?.addEventListener("click", () => {
    window.location.href = "partido.html";
  });
});
