// Para menu.html
document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos guardados
  const savedCoachName = localStorage.getItem("coachName");
  const savedClub = localStorage.getItem("selectedClub");
  
  // Si no hay nombre de entrenador, redirigir al inicio
  if (!savedCoachName) {
    window.location.href = "main.html";
    return;
  }
  
  // Si no hay club seleccionado, redirigir a la selección de equipo
  if (!savedClub) {
    window.location.href = "seleccion-equipo.html";
    return;
  }
  
  // Mostrar información del entrenador y club en la página
  const nombreEntrenador = document.getElementById("nombreEntrenador");
  const nombreClub = document.getElementById("nombreClub");
  
  if (nombreEntrenador) {
    nombreEntrenador.textContent = savedCoachName;
  }
  
  if (nombreClub) {
    nombreClub.textContent = savedClub;
  }
  
  // Configurar botones del menú
  const plantillaBtn = document.getElementById("plantillaBtn");
  if (plantillaBtn) {
    plantillaBtn.addEventListener("click", () => {
      localStorage.removeItem("origen"); // Limpiar origen para la plantilla
      window.location.href = "plantilla.html";
    });
  }
  
  const periodicoBtn = document.getElementById("periodicoBtn");
  if (periodicoBtn) {
    periodicoBtn.addEventListener("click", () => {
      window.location.href = "periodico.html";
    });
  }
  
  const partidoBtn = document.getElementById("partidoBtn");
  if (partidoBtn) {
    partidoBtn.addEventListener("click", () => {
      window.location.href = "partido.html";
    });
  }
  
  const entrenamientoBtn = document.getElementById("entrenamientoBtn");
  if (entrenamientoBtn) {
    entrenamientoBtn.addEventListener("click", () => {
      window.location.href = "entrenamiento.html";
    });
  }
  
  const traspasoBtn = document.getElementById("traspasoBtn");
  if (traspasoBtn) {
    traspasoBtn.addEventListener("click", () => {
      window.location.href = "traspasos.html";
    });
  }
  
  const estadisticasBtn = document.getElementById("estadisticasBtn");
  if (estadisticasBtn) {
    estadisticasBtn.addEventListener("click", () => {
      window.location.href = "estadisticas.html";
    });
  }
});
