 
// Para seleccion-equipo.html
document.addEventListener("DOMContentLoaded", () => {
  // Referencia a elementos del DOM
  const seleccionSection = document.getElementById("seleccion-section");
  const confirmacionSection = document.getElementById("confirmacion-section");
  
  // Obtener nombre del entrenador y club guardados
  const savedCoachName = localStorage.getItem("coachName");
  const savedClub = localStorage.getItem("selectedClub");
  
  // Si no hay nombre de entrenador, redirigir al inicio
  if (!savedCoachName) {
    window.location.href = "main.html";
    return;
  }
  
  // Si ya hay un club seleccionado, redirigir al menú principal
  if (savedClub) {
    window.location.href = "menu.html";
    return;
  }
  
  // Función para seleccionar un equipo
  window.selectTeam = function(equipo) {
    // Guardar selección en localStorage
    localStorage.setItem("selectedClub", equipo);
    
    // Establecer el origen para que plantillas.js sepa de dónde viene la llamada
    localStorage.setItem("origen", "seleccion_equipo");
    
    // Mostrar confirmación
    if (seleccionSection && confirmacionSection) {
      seleccionSection.style.display = "none";
      confirmacionSection.style.display = "block";
      
      const confirmacionMensaje = document.getElementById("confirmacionMensaje");
      if (confirmacionMensaje) {
        confirmacionMensaje.textContent = `Has elegido a ${equipo}.`;
      }
    }
  };
  
  // Botón para continuar a la plantilla
  const continuarBtn = document.getElementById("continuarBtn");
  if (continuarBtn) {
    continuarBtn.addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
  }
});
