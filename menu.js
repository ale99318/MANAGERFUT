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

  // Ejemplo de avance de fecha (ajústalo según lógica real)
  const avanzarFechaBtn = document.getElementById("avanzarFechaBtn");
  if (avanzarFechaBtn) {
    avanzarFechaBtn.addEventListener("click", () => {
      alert("¡Has avanzado una jornada!");
      // Aquí podrías actualizar la fecha actual en localStorage y mostrarla.
    });
  }
document.addEventListener("DOMContentLoaded", () => {
  // ...tu código actual...

  // Mostrar calendario
  renderCalendario("calendarioContainer");
}); 
});
