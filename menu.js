// menu.js
document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos guardados
  const savedCoachName = localStorage.getItem("coachName");
  const savedClub = localStorage.getItem("selectedClub");
  
  // Redirigir si falta información
  if (!savedCoachName) {
    window.location.href = "main.html";
    return;
  }
  
  if (!savedClub) {
    window.location.href = "seleccion-equipo.html";
    return;
  }
  
  // Mostrar información del entrenador y club
  const coachNameDisplay = document.getElementById("coachNameDisplay");
  const clubDisplay = document.getElementById("clubDisplay");
  
  if (coachNameDisplay) {
    coachNameDisplay.textContent = savedCoachName;
  }
  
  if (clubDisplay) {
    clubDisplay.textContent = savedClub;
  }
  
  // Inicializar la fecha si no existe
  if (!localStorage.getItem("fechaActual")) {
    // Establecer fecha inicial del juego (por ejemplo, 1 de enero de 2025)
    const fechaInicial = "2025-01-01";
    localStorage.setItem("fechaActual", fechaInicial);
    
    // Inicializar eventos del calendario si no existen
    if (!localStorage.getItem("eventosCalendario")) {
      // Crear algunos eventos iniciales para el calendario
      const eventosIniciales = {
        "2025-01-01": [
          { tipo: "Inicio", descripcion: "¡Comienzo de temporada!" }
        ],
        "2025-01-07": [
          { tipo: "Partido", descripcion: "Primera jornada de liga" }
        ]
      };
      localStorage.setItem("eventosCalendario", JSON.stringify(eventosIniciales));
    }
    
    // Inicializar la posición en la tabla
    localStorage.setItem("posicionTabla", "10");
  }
  
  // Mostrar la posición en la tabla
  const posicionTablaElement = document.getElementById("posicionTabla");
  if (posicionTablaElement) {
    const posicion = localStorage.getItem("posicionTabla") || "-";
    posicionTablaElement.textContent = posicion;
  }
  
  // Navegación de botones
  const assignNavigation = (id, target) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = target;
      });
    }
  };
  
  assignNavigation("plantillaBtn", "plantilla.html");
  assignNavigation("estrategiaBtn", "estrategia.html");
  assignNavigation("canterasBtn", "canteras.html");
  assignNavigation("solicitarJugadorBtn", "fichajes.html");
  assignNavigation("estadisticasBtn", "estadisticas.html");
  assignNavigation("traspasoBtn", "traspasos.html");
  assignNavigation("partidoBtn", "partido.html");
  assignNavigation("periodicoBtn", "periodico.html");
  
  // Renderizar el calendario
  renderCalendario("calendarioContainer");
});
