// calendario.js
function renderCalendario(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let jornadaActual = parseInt(localStorage.getItem("jornadaActual") || "1");
  
  container.innerHTML = `
    <div class="calendario-box">
      <h3>🗓️ Jornada Actual: ${jornadaActual}</h3>
      <button id="avanzarJornadaBtn">Avanzar Jornada</button>
    </div>
  `;
  
  const avanzarBtn = document.getElementById("avanzarJornadaBtn");
  if (avanzarBtn) {
    avanzarBtn.addEventListener("click", () => {
      jornadaActual++;
      localStorage.setItem("jornadaActual", jornadaActual);
      renderCalendario(containerId); // Volver a dibujar con nuevo valor
      
      // Actualizar también el elemento fechaActual
      const fechaActualElement = document.getElementById("fechaActual");
      if (fechaActualElement) {
        fechaActualElement.textContent = `Jornada ${jornadaActual}`;
      }
    });
  }
}
