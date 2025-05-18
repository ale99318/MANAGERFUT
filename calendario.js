// calendario.js
document.addEventListener("DOMContentLoaded", () => {
  const fechaActual = parseInt(localStorage.getItem("fechaActual")) || 1;
  document.getElementById("fechaActual").textContent = `Jornada ${fechaActual}`;
});
