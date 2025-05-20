document.addEventListener("DOMContentLoaded", () => { 
  // Obtener datos del localStorage
  const nombreEntrenador = localStorage.getItem("coachName") || "Desconocido";
  const nombreClub = localStorage.getItem("selectedClub");
  
  // Mostrar información del entrenador
  document.getElementById("nombreEntrenador").textContent = nombreEntrenador;
  
  // Verificar si hay un club seleccionado
  if (!nombreClub) {
    document.getElementById("nombreClub").textContent = "Ninguno (elige un equipo primero)";
    // Redirigir a la página de selección de equipo si no hay equipo seleccionado
    setTimeout(() => {
      window.location.href = "seleccion-equipo.html";
    }, 2000);
    return;
  }
  
  // Mostrar el nombre del club
  document.getElementById("nombreClub").textContent = nombreClub;
  
  // Datos de jugadores ficticios según el equipo
  const plantillas = {
    "Alianza Lima": ["Campos", "Zambrano", "Costa", "Barcos", "Reyna"],
    "Universitario": ["Carvallo", "Riveros", "Polo", "Valera", "Urruti"],
    "Sporting Cristal": ["Solís", "Chávez", "Ignacio", "Hohberg", "Ávila"]
  };
  
  // Obtener la lista de jugadores para el club seleccionado
  const jugadores = plantillas[nombreClub] || [];
  const listaJugadores = document.getElementById("listaJugadores");
  
  // Mostrar los jugadores en la lista
  jugadores.forEach(jugador => {
    const li = document.createElement("li");
    li.textContent = jugador;
    listaJugadores.appendChild(li);
  });
  
  // Verificar de dónde viene la llamada para determinar el comportamiento
  const origen = localStorage.getItem("origen") || "desconocido";
  const continuarBtn = document.getElementById("continuarBtn");
  const cambiarEquipoLink = document.getElementById("cambiarEquipoLink");
  
  if (origen === "seleccion_equipo") {
    // Si viene de la selección de equipo, mostrar el botón para continuar al periódico
    continuarBtn.textContent = "Continuar al periódico";
    continuarBtn.addEventListener("click", () => {
      // Limpiar el origen ya que el flujo inicial está completo
      localStorage.removeItem("origen");
      window.location.href = "periodico.html";
    });
    
    // Mostrar enlace para cambiar equipo solo en el flujo inicial
    if (cambiarEquipoLink) {
      cambiarEquipoLink.style.display = "block";
    }
  } else {
    // Si viene del menú principal, mostrar el botón para volver al menú
    continuarBtn.textContent = "Volver al menú principal";
    continuarBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
    
    // Ocultar enlace para cambiar equipo cuando se accede desde el menú
    if (cambiarEquipoLink) {
      cambiarEquipoLink.style.display = "none";
    }
  }
  
  // Añadir botón para gestionar la plantilla (independientemente del origen)
  const gestionarBtn = document.getElementById("gestionarBtn");
  if (gestionarBtn) {
    gestionarBtn.addEventListener("click", () => {
      // Aquí puedes agregar lógica para gestionar la plantilla
      alert("Funcionalidad de gestión de plantilla en desarrollo");
    });
  }
});
