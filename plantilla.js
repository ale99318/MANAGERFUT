document.addEventListener("DOMContentLoaded", () => {
  const nombreEntrenador = localStorage.getItem("coachName") || "Desconocido";
  const nombreClub = localStorage.getItem("selectedClub");

  document.getElementById("nombreEntrenador").textContent = nombreEntrenador;

  if (!nombreClub) {
    document.getElementById("nombreClub").textContent = "Ninguno (elige un equipo primero)";
    return;
  }

  document.getElementById("nombreClub").textContent = nombreClub;

  // Datos de jugadores ficticios según el equipo
  const plantillas = {
    "Alianza Lima": ["Campos", "Zambrano", "Costa", "Barcos", "Reyna"],
    "Universitario": ["Carvallo", "Riveros", "Polo", "Valera", "Urruti"],
    "Sporting Cristal": ["Solís", "Chávez", "Ignacio", "Hohberg", "Ávila"]
  };

  const jugadores = plantillas[nombreClub] || [];

  const listaJugadores = document.getElementById("listaJugadores");
  jugadores.forEach(jugador => {
    const li = document.createElement("li");
    li.textContent = jugador;
    listaJugadores.appendChild(li);
  });

  // ← Este es el nuevo código para redirigir al siguiente HTML
const continuarBtn = document.getElementById("continuarBtn");
continuarBtn.addEventListener("click", () => {
  window.location.href = "periodico.html"; // esta es la página del periódico
});
});
