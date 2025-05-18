// Modificación para calendario.js
function mostrarEventosFecha(fecha) {
  const eventosContainer = document.getElementById("eventosFecha");
  if (!eventosContainer) return;
  
  // Formatear fecha para búsqueda de eventos
  const fechaStr = fecha.toISOString().split('T')[0];
  
  // Obtener eventos de localStorage o inicializar si no existen
  let eventos = JSON.parse(localStorage.getItem("eventosCalendario")) || {};
  
  // Comprobar si hay partido en esta fecha usando la función de jornadas.js
  const infoPartido = verificarPartidoEnFecha(fechaStr);
  
  // Si hay un partido programado para esta fecha y no está ya en los eventos, añadirlo
  if (infoPartido.hayPartido) {
    if (!eventos[fechaStr]) {
      eventos[fechaStr] = [];
    }
    
    // Comprobar si ya existe un evento de partido para esta fecha
    const tienePartido = eventos[fechaStr].some(e => e.tipo === "Partido");
    
    if (!tienePartido) {
      // Crear descripción según si es local o visitante
      const equipoUsuario = localStorage.getItem("selectedClub") || localStorage.getItem("nombreClub");
      const esLocal = infoPartido.partido.local === equipoUsuario;
      const rival = esLocal ? infoPartido.partido.visitante : infoPartido.partido.local;
      const descripcion = `Jornada ${infoPartido.jornada}: ${esLocal ? 'LOCAL' : 'VISITANTE'} contra ${rival}`;
      
      // Añadir evento de partido
      eventos[fechaStr].push({
        tipo: "Partido",
        descripcion: descripcion,
        jugado: infoPartido.partido.jugado
      });
      
      // Guardar en localStorage
      localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
    } else {
      // Actualizar estado del partido si es necesario
      for (let i = 0; i < eventos[fechaStr].length; i++) {
        if (eventos[fechaStr][i].tipo === "Partido") {
          eventos[fechaStr][i].jugado = infoPartido.partido.jugado;
        }
      }
      localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
    }
  }
  
  // Mostrar eventos para esta fecha
  if (eventos[fechaStr] && eventos[fechaStr].length > 0) {
    let eventosHTML = '<h4>Eventos para hoy:</h4><ul>';
    eventos[fechaStr].forEach(evento => {
      // Si es un partido, mostrarlo de forma destacada
      if (evento.tipo === "Partido") {
        const estadoPartido = evento.jugado ? 
          '<span style="color: #888;">[JUGADO]</span>' : 
          '<span style="color: #ff6600; font-weight: bold;">[PENDIENTE DE JUGAR]</span>';
        
        eventosHTML += `<li class="evento-partido">${evento.tipo}: ${evento.descripcion} ${estadoPartido}</li>`;
      } else {
        eventosHTML += `<li>${evento.tipo}: ${evento.descripcion}</li>`;
      }
    });
    eventosHTML += '</ul>';
    eventosContainer.innerHTML = eventosHTML;
    
    // Si hay un partido pendiente, mostrar notificación
    const partidoPendiente = eventos[fechaStr].some(e => e.tipo === "Partido" && !e.jugado);
    if (partidoPendiente) {
      mostrarNotificacionPartido();
    }
  } else {
    eventosContainer.innerHTML = '<p>No hay eventos programados para este día.</p>';
  }
}

// Función para mostrar notificación de partido pendiente
function mostrarNotificacionPartido() {
  // Comprobar si existe un contenedor para la notificación, si no, crearlo
  let notificacionContainer = document.getElementById("notificacionPartido");
  if (!notificacionContainer) {
    notificacionContainer = document.createElement("div");
    notificacionContainer.id = "notificacionPartido";
    notificacionContainer.style.backgroundColor = "#ffcc00";
    notificacionContainer.style.color = "#000";
    notificacionContainer.style.padding = "10px";
    notificacionContainer.style.borderRadius = "5px";
    notificacionContainer.style.margin = "10px 0";
    notificacionContainer.style.textAlign = "center";
    notificacionContainer.style.fontWeight = "bold";
    
    // Insertar antes del calendario o al principio del contenedor principal
    const calendarioContainer = document.getElementById("calendarioContainer");
    if (calendarioContainer) {
      calendarioContainer.parentNode.insertBefore(notificacionContainer, calendarioContainer);
    } else {
      document.querySelector(".container").insertBefore(notificacionContainer, document.querySelector(".container").firstChild);
    }
  }
  
  // Actualizar mensaje
  notificacionContainer.innerHTML = '⚽ ¡TIENES UN PARTIDO PENDIENTE PARA HOY! ⚽<br>Pulsa el botón "Jugar Partido" para disputarlo.';
  
  // Destacar visualmente el botón de jugar partido
  const partidoBtn = document.getElementById("partidoBtn");
  if (partidoBtn) {
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

// Modificación para avanzarFecha para asegurar que se verifica si hay partido
function avanzarFecha(cantidad, unidad) {
  const fechaActual = new Date(localStorage.getItem("fechaActual"));
  
  if (unidad === 'dia') {
    fechaActual.setDate(fechaActual.getDate() + cantidad);
  } else if (unidad === 'mes') {
    fechaActual.setMonth(fechaActual.getMonth() + cantidad);
  }
  
  // Asegurarse que no exceda el año 2050
  const fechaMaxima = new Date('2050-12-31');
  if (fechaActual > fechaMaxima) {
    fechaActual.setTime(fechaMaxima.getTime());
  }
  
  const nuevaFechaStr = fechaActual.toISOString().split('T')[0];
  localStorage.setItem("fechaActual", nuevaFechaStr);
  
  // Verificar si hay un partido en la nueva fecha
  const infoPartido = verificarPartidoEnFecha(nuevaFechaStr);
  if (infoPartido.hayPartido && !infoPartido.partido.jugado) {
    alert(`¡Tienes un partido programado para hoy (Jornada ${infoPartido.jornada})!\nDebes usar el botón "Jugar Partido" para disputarlo.`);
  }
  
  renderCalendario("calendarioContainer");
}
