function renderCalendario(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let jornadaActual = parseInt(localStorage.getItem("jornadaActual") || "1");

  container.innerHTML = `
    <div class="calendario-box">
      <h3>🗓️ Jornada Actual: ${jornadaActual}</h3>
      <button id="avanzarFechaBtn">Avanzar Jornada</button>
    </div>
  `;

  const avanzarBtn = document.getElementById("avanzarFechaBtn");
  if (avanzarBtn) {
    avanzarBtn.addEventListener("click", () => {
      jornadaActual++;
      localStorage.setItem("jornadaActual", jornadaActual);
      renderCalendario(containerId); // Volver a dibujar con nuevo valor
    });
  }
}
