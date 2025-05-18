// menu.js - Script para la página de menú principal

document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos guardados del localStorage
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
  const coachNameDisplay = document.getElementById("coachNameDisplay");
  const clubDisplay = document.getElementById("clubDisplay");
  
  if (coachNameDisplay) {
    coachNameDisplay.textContent = savedCoachName;
  } else {
    console.error("Elemento con ID 'coachNameDisplay' no encontrado");
  }
  
  if (clubDisplay) {
    clubDisplay.textContent = savedClub;
  } else {
    console.error("Elemento con ID 'clubDisplay' no encontrado");
  }
  
  // Inicializar la fecha actual si no existe
  if (!localStorage.getItem("fechaActual")) {
    localStorage.setItem("fechaActual", "1");
  }
  
  // Mostrar la fecha actual en la página
  const fechaActualDisplay = document.getElementById("fechaActual");
  if (fechaActualDisplay) {
    fechaActualDisplay.textContent = `Jornada ${localStorage.getItem("fechaActual")}`;
  }
  
  // Configurar botones de navegación
  configureNavigationButtons();
});

function configureNavigationButtons() {
  // Botón de plantilla
  const plantillaBtn = document.getElementById("plantillaBtn");
  if (plantillaBtn) {
    plantillaBtn.addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
  }
  
  // Botón de avanzar fecha
  const avanzarFechaBtn = document.getElementById("avanzarFechaBtn");
  if (avanzarFechaBtn) {
    avanzarFechaBtn.addEventListener("click", () => {
      let fechaActual = parseInt(localStorage.getItem("fechaActual")) || 1;
      fechaActual++;
      localStorage.setItem("fechaActual", fechaActual);
      
      // Actualizar la visualización de la fecha
      const fechaActualDisplay = document.getElementById("fechaActual");
      if (fechaActualDisplay) {
        fechaActualDisplay.textContent = `Jornada ${fechaActual}`;
      }
      
      // Revisar si hay jornada en esa fecha
      // Nota: 'jornadas' debe estar definido en otro archivo o se debe cargar desde algún lugar
      const jornadas = JSON.parse(localStorage.getItem("jornadas")) || {};
      
      if (jornadas[fechaActual]) {
        // Redirigir a la página de partido
        localStorage.setItem("partidosPendientes", JSON.stringify(jornadas[fechaActual]));
        window.location.href = "partido.html";
      }
    });
  }
  
  // Botón para ir a la tabla de clasificación
  const clasificacionBtn = document.getElementById("clasificacionBtn");
  if (clasificacionBtn) {
    clasificacionBtn.addEventListener("click", () => {
      window.location.href = "clasificacion.html";
    });
  }
  
  // Botón para ir a la gestión de entrenamientos
  const entrenamientoBtn = document.getElementById("entrenamientoBtn");
  if (entrenamientoBtn) {
    entrenamientoBtn.addEventListener("click", () => {
      window.location.href = "entrenamiento.html";
    });
  }
  
  // Botón para guardar partida
  const guardarBtn = document.getElementById("guardarBtn");
  if (guardarBtn) {
    guardarBtn.addEventListener("click", () => {
      // Implementar lógica para guardar el estado del juego
      alert("Partida guardada correctamente");
    });
  }
  
  // Botón para salir
  const salirBtn = document.getElementById("salirBtn");
  if (salirBtn) {
    salirBtn.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas salir? Los cambios no guardados se perderán.")) {
        window.location.href = "main.html";
      }
    });
  }
}
