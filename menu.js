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

  // Ejemplo de cómo vincular otros botones si los necesitas luego
  const plantillaBtn = document.getElementById("plantillaBtn");
  if (plantillaBtn) {
    plantillaBtn.addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
  }

  // Puedes agregar más botones aquí...
});

document.getElementById("avanzarFechaBtn").addEventListener("click", () => {
  let fechaActual = parseInt(localStorage.getItem("fechaActual")) || 1;
  fechaActual++;
  localStorage.setItem("fechaActual", fechaActual);
  
  // Revisar si hay jornada en esa fecha
  if (jornadas[fechaActual]) {
    // Redirigir a la página de partido
    localStorage.setItem("partidosPendientes", JSON.stringify(jornadas[fechaActual]));
    window.location.href = "partido.html";
  } else {
    // No hay jornada, solo actualizar el calendario
    document.getElementById("fechaActual").textContent = `Jornada ${fechaActual}`;
  }
});
