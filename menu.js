// menu.js - Archivo principal para el menú del juego

// Datos del entrenador y club (pueden cargarse desde localStorage)
let datosEntrenador = {
  nombre: localStorage.getItem("nombreEntrenador") || "Carlos Ancelotti",
  club: localStorage.getItem("nombreClub") || "Rayo Vallecano",
  // Otros datos que puedas necesitar
};

// Función para inicializar el menú principal
function inicializarMenu() {
  console.log("Inicializando menú principal...");
  
  // Mostrar nombre del entrenador y club
  document.getElementById("coachNameDisplay").textContent = datosEntrenador.nombre;
  document.getElementById("clubDisplay").textContent = datosEntrenador.club;
  
  // Guardar datos en localStorage si no existen
  if (!localStorage.getItem("nombreEntrenador")) {
    localStorage.setItem("nombreEntrenador", datosEntrenador.nombre);
  }
  
  if (!localStorage.getItem("nombreClub")) {
    localStorage.setItem("nombreClub", datosEntrenador.club);
  }
  
  // Inicializar y mostrar el calendario
  renderCalendario("calendarioContainer");
  
  // Añadir event listeners a los botones del menú
  configurarBotones();
}

// Función para configurar los botones del menú
function configurarBotones() {
  // Botón de Plantilla
  document.getElementById("plantillaBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Plantilla");
    window.location.href = "plantilla.html";
  });
  
  // Botón de Estrategia
  document.getElementById("estrategiaBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Estrategia");
    window.location.href = "estrategia.html";
  });
  
  // Botón de Canteras
  document.getElementById("canterasBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Canteras");
    window.location.href = "canteras.html";
  });
  
  // Botón de Solicitar Jugador
  document.getElementById("solicitarJugadorBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Solicitar Jugador");
    window.location.href = "solicitar-jugador.html";
  });
  
  // Botón de Estadísticas
  document.getElementById("estadisticasBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Estadísticas");
    window.location.href = "estadisticas.html";
  });
  
  // Botón de Traspasos
  document.getElementById("traspasoBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Traspasos");
    window.location.href = "traspasos.html";
  });
  
  // Botón de Jugar Partido
  document.getElementById("partidoBtn").addEventListener("click", function() {
    // Verificar si hay un partido para jugar hoy
    const fechaActual = localStorage.getItem("fechaActual");
    if (!fechaActual) {
      return alert("No hay fecha establecida en el sistema");
    }
    
    const infoPartido = verificarPartidoEnFecha(fechaActual);
    
    if (infoPartido.hayPartido && !infoPartido.partido.jugado) {
      console.log("Navegando a la pantalla de Partido");
      window.location.href = "partido.html";
    } else if (infoPartido.hayPartido && infoPartido.partido.jugado) {
      alert("El partido de hoy ya se ha jugado.");
    } else {
      // Buscar el próximo partido
      const proximoPartido = obtenerProximoPartido();
      if (proximoPartido) {
        alert(`No hay partido programado para hoy. El próximo partido es el ${new Date(proximoPartido.fecha).toLocaleDateString('es-ES')}`);
      } else {
        alert("No hay partidos programados en el futuro.");
      }
    }
  });
  
  // Botón de Periódico
  document.getElementById("periodicoBtn").addEventListener("click", function() {
    console.log("Navegando a la pantalla de Periódico");
    window.location.href = "periodico.html";
  });
}

// Función para verificar si los archivos necesarios están cargados
function verificarDependencias() {
  // Verificar si las funciones de calendario y jornadas están disponibles
  if (typeof renderCalendario !== 'function') {
    console.error("Error: No se ha cargado el archivo calendario.js");
    mostrarError("No se pudo cargar el calendario. Verifica que los archivos necesarios estén incluidos.");
    return false;
  }
  
  if (typeof inicializarCalendarioLiga !== 'function') {
    console.error("Error: No se ha cargado correctamente la función inicializarCalendarioLiga");
    mostrarError("No se pudo inicializar el calendario de liga. Verifica que los archivos necesarios estén incluidos.");
    return false;
  }
  
  return true;
}

// Función para mostrar errores en la pantalla
function mostrarError(mensaje) {
  const container = document.querySelector(".container");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = mensaje;
  errorDiv.style.backgroundColor = "#ffcccc";
  errorDiv.style.color = "#cc0000";
  errorDiv.style.padding = "10px";
  errorDiv.style.borderRadius = "5px";
  errorDiv.style.margin = "10px 0";
  
  container.insertBefore(errorDiv, container.firstChild);
}

// Inicializar cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado completamente");
  
  // Verificar dependencias antes de inicializar
  if (verificarDependencias()) {
    inicializarMenu();
  }
});

// También se puede llamar manualmente si ya está cargado el DOM
if (document.readyState === "complete" || document.readyState === "interactive") {
  console.log("DOM ya estaba cargado. Inicializando...");
  
  // Verificar dependencias antes de inicializar
  if (verificarDependencias()) {
    inicializarMenu();
  }
}
