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
  
  // Inicializar la fecha actual si no existe
  if (!localStorage.getItem("jornadaActual")) {
    localStorage.setItem("jornadaActual", "1");
  }
  
  // Mostrar la fecha actual en el elemento fechaActual
  const fechaActualElement = document.getElementById("fechaActual");
  if (fechaActualElement) {
    const jornadaActual = localStorage.getItem("jornadaActual") || "1";
    fechaActualElement.textContent = `Jornada ${jornadaActual}`;
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
