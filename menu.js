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
