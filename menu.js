document.addEventListener("DOMContentLoaded", () => {
  const infoUsuario = document.getElementById("infoUsuario");
  const btnContinuar = document.getElementById("btnContinuar");
  const btnNuevoJuego = document.getElementById("btnNuevoJuego");

  const equipo = localStorage.getItem("equipoSeleccionado");
  const progreso = localStorage.getItem("progreso");

  if (equipo) {
    // Si ya hay un equipo guardado, mostrar mensaje y botón de continuar
    infoUsuario.innerHTML = `
      <p><strong>Equipo:</strong> ${equipo}</p>
      <p><strong>Progreso:</strong> ${progreso ?? "Sin datos"}</p>
    `;
    btnContinuar.style.display = "inline-block";
  } else {
    infoUsuario.innerHTML = `<p>No has seleccionado un equipo aún.</p>`;
  }

  btnNuevoJuego.addEventListener("click", () => {
    // Limpiar datos anteriores y redirigir a selección de equipo
    localStorage.removeItem("equipoSeleccionado");
    localStorage.removeItem("progreso");
    window.location.href = "seleccion-equipo.html";
  });

  btnContinuar.addEventListener("click", () => {
    // Continuar al juego principal
    window.location.href = "index.html";
  });
});
