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
  const coachNameDisplay = document.getElementById("coachNameDisplay");
  const clubDisplay = document.getElementById("clubDisplay");
  
  if (coachNameDisplay) {
    coachNameDisplay.textContent = savedCoachName;
  }
  
  if (clubDisplay) {
    clubDisplay.textContent = savedClub;
  }
  
  // Configurar los botones del menú
  
  // Botón para ir a la plantilla
  const plantillaBtn = document.getElementById("plantillaBtn");
  if (plantillaBtn) {
    plantillaBtn.addEventListener("click", () => {
      // Limpiar cualquier valor de origen anterior
      localStorage.removeItem("origen");
      window.location.href = "plantilla.html";
    });
  }
  
  // Otros botones del menú
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
  
  // Aquí puedes agregar más botones y funcionalidades del menú
});
