document.addEventListener("DOMContentLoaded", function() {
  // Cargar datos del localStorage
  var nombreEntrenador = localStorage.getItem("coachName") || "Entrenador";
  var nombreClub = localStorage.getItem("selectedClub") || "Equipo sin nombre";
  var fechaActual = localStorage.getItem("fechaActual") || "Jornada 1";
  var posicionTabla = localStorage.getItem("posicionTabla") || "Por determinar";
  
  // Mostrar información en la página
  document.getElementById("nombreEntrenador").textContent = nombreEntrenador;
  document.getElementById("nombreClub").textContent = nombreClub;
  document.getElementById("fechaActual").textContent = fechaActual;
  document.getElementById("posicionTabla").textContent = posicionTabla;
  
  // Configurar los botones del menú
  document.getElementById("avanzarFechaBtn").addEventListener("click", function() {
    console.log("Avanzar fecha clickeado");
    // Aquí puedes implementar la lógica para avanzar la fecha
    // Por ejemplo:
    var fechaNum = parseInt(fechaActual.split(" ")[1]) || 1;
    fechaNum++;
    localStorage.setItem("fechaActual", "Jornada " + fechaNum);
    alert("¡Has avanzado a la Jornada " + fechaNum + "!");
    location.reload(); // Recargar para mostrar la nueva fecha
  });
  
  document.getElementById("plantillaBtn").addEventListener("click", function() {
    console.log("Plantilla clickeado");
    window.location.href = "plantilla.html";
  });
  
  document.getElementById("estrategiaBtn").addEventListener("click", function() {
    console.log("Estrategia clickeado");
    window.location.href = "estrategia.html";
  });
  
  document.getElementById("canterasBtn").addEventListener("click", function() {
    console.log("Canteras clickeado");
    window.location.href = "canteras.html";
  });
  
  document.getElementById("solicitarJugadorBtn").addEventListener("click", function() {
    console.log("Solicitar jugador clickeado");
    window.location.href = "solicitar_jugador.html";
  });
  
  console.log("Menu.js cargado correctamente");
});
