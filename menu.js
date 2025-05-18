// Modificación para menu.js
// Mejorar la función para manejar el botón de jugar partido

// Función mejorada para configurar el botón de Jugar Partido
function configurarBotonPartido() {
  const partidoBtn = document.getElementById("partidoBtn");
  if (!partidoBtn) return;
  
  partidoBtn.addEventListener("click", function() {
    // Verificar si hay un partido para jugar hoy
    const fechaActual = localStorage.getItem("fechaActual");
    if (!fechaActual) {
      return alert("No hay fecha establecida en el sistema");
    }
    
    const infoPartido = verificarPartidoEnFecha(fechaActual);
    
    if (infoPartido.hayPartido) {
      if (!infoPartido.partido.jugado) {
        // Hay partido pendiente para hoy
        console.log("Navegando a la pantalla de Partido");
        
        // Almacenar información del partido actual para la pantalla de partido
        localStorage.setItem("partidoActual", JSON.stringify({
          jornada: infoPartido.jornada,
          fecha: fechaActual,
          equipoLocal: infoPartido.partido.local,
          equipoVisitante: infoPartido.partido.visitante
        }));
        
        window.location.href = "partido.html";
      } else {
        // El partido ya se jugó
        const resultado = infoPartido.partido.resultado;
        alert(`El partido de hoy (Jornada ${infoPartido.jornada}) ya se ha jugado.\nResultado: ${infoPartido.partido.local} ${resultado} ${infoPartido.partido.visitante}`);
      }
    } else {
      // No hay partido hoy, buscar el próximo
      const proximoPartido = obtenerProximoPartido();
      
      if (proximoPartido) {
        const fechaPartido = new Date(proximoPartido.fecha);
        const fechaFormateada = fechaPartido.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Preguntar si quiere avanzar hasta esa fecha
        if (confirm(`No hay partido programado para hoy.\nEl próximo partido es el ${fechaFormateada} (Jornada ${proximoPartido.jornada}).\n\n¿Quieres avanzar automáticamente hasta esa fecha?`)) {
          // Avanzar hasta la fecha del próximo partido
          localStorage.setItem("fechaActual", proximoPartido.fecha);
          // Recargar la página para que se actualice todo
          window.location.reload();
        }
      } else {
        alert("No hay partidos programados en el futuro.");
      }
    }
  });
  
  // Verificar si hay partido hoy al cargar la página
  const fechaActual = localStorage.getItem("fechaActual");
  if (fechaActual) {
    const infoPartido = verificarPartidoEnFecha(fechaActual);
    
    if (infoPartido.hayPartido && !infoPartido.partido.jugado) {
      // Destacar visualmente el botón
      partidoBtn.style.animation = "pulsar 1.5s infinite";
      
      // Añadir estilo CSS para la animación si no existe
      if (!document.getElementById("pulsarAnimacion")) {
        const estilo = document.createElement("style");
        estilo.id = "pulsarAnimacion";
        estilo.innerHTML = `
          @keyframes pulsar {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 102, 0, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 102, 0, 0); }
          }
        `;
        document.head.appendChild(estilo);
      }
    }
  }
}

// Función actualizada para configurar botones
function configurarBotones() {
  // ... [Mantener el resto del código original] ...
  
  // Reemplazar la configuración original del botón de Jugar Partido
  // con la nueva función mejorada
  configurarBotonPartido();
  
  // ... [Mantener el resto del código original] ...
}

// Modificar la función de inicialización del menú
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
  
  // Asegurarse de que se establezca selectedClub también
  // (esto es importante para la integración con jornadas.js)
  if (!localStorage.getItem("selectedClub")) {
    localStorage.setItem("selectedClub", datosEntrenador.club);
  }
  
  // Inicializar calendario de liga si no existe
  if (!localStorage.getItem("calendarioLiga")) {
    inicializarCalendarioLiga();
  }
  
  // Inicializar y mostrar el calendario
  renderCalendario("calendarioContainer");
  
  // Añadir event listeners a los botones del menú
  configurarBotones();
  
  // Comprobar si hay partido hoy y mostrar notificación
  const fechaActual = localStorage.getItem("fechaActual");
  if (fechaActual) {
    const infoPartido = verificarPartidoEnFecha(fechaActual);
    if (infoPartido.hayPartido && !infoPartido.partido.jugado) {
      mostrarNotificacionPartido();
    }
  }
}
