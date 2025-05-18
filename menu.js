// calendario.js
function renderCalendario(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Obtener la fecha actual del sistema si no hay una guardada
  let fechaActual = localStorage.getItem("fechaActual");
  if (!fechaActual) {
    // Usar la fecha de inicio de temporada como punto de inicio
    fechaActual = "2025-08-16"; // Típica fecha de inicio de temporada
    localStorage.setItem("fechaActual", fechaActual);
  }
  
  const fecha = new Date(fechaActual);
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
  
  // Convertir la fecha actual a formato YYYY-MM-DD para comparar con las jornadas
  const fechaStr = fecha.toISOString().split('T')[0];
  
  // Inicializar calendario de liga si no existe
  if (!localStorage.getItem("calendarioLiga")) {
    inicializarCalendarioLiga();
  }
  
  // Verificar si hay partido en esta fecha
  const infoPartido = verificarPartidoEnFecha(fechaStr);
  
  let contenidoPartido = '';
  if (infoPartido.hayPartido) {
    const partido = infoPartido.partido;
    contenidoPartido = `
      <div class="partido-programado">
        <h4>🏆 Partido de la Jornada ${infoPartido.jornada}</h4>
        <div class="equipos-partido">
          <span class="equipo-local">${partido.local}</span>
          <span class="vs">VS</span>
          <span class="equipo-visitante">${partido.visitante}</span>
        </div>
        ${partido.jugado ? 
          `<div class="resultado">Resultado: <strong>${partido.resultado}</strong></div>` : 
          `<button id="jugarPartidoBtn" data-jornada="${infoPartido.jornada}">Jugar Partido</button>`
        }
      </div>
    `;
  }
  
  // Encontrar próximo partido
  const proximoPartido = obtenerProximoPartido();
  let contenidoProximoPartido = '';
  
  if (proximoPartido && proximoPartido.fecha !== fechaStr) {
    const diasRestantes = Math.ceil((new Date(proximoPartido.fecha) - fecha) / (1000 * 60 * 60 * 24));
    contenidoProximoPartido = `
      <div class="proximo-partido">
        <h4>📅 Próximo partido: Jornada ${proximoPartido.jornada}</h4>
        <p>${proximoPartido.partido.local} vs ${proximoPartido.partido.visitante}</p>
        <p>Fecha: ${new Date(proximoPartido.fecha).toLocaleDateString('es-ES', opciones)}</p>
        <p>Faltan ${diasRestantes} días</p>
        <button id="avanzarHastaPartidoBtn" data-fecha="${proximoPartido.fecha}">
          Avanzar hasta el partido
        </button>
      </div>
    `;
  }
  
  container.innerHTML = `
    <div class="calendario-box">
      <h3>📅 Fecha actual: ${fechaFormateada}</h3>
      
      <div class="calendario-controles">
        <button id="avanzarDiaBtn">Avanzar 1 día</button>
        <button id="avanzarSemanaBtn">Avanzar 1 semana</button>
        <button id="avanzarMesBtn">Avanzar 1 mes</button>
        
        <div class="saltar-fecha">
          <label for="fechaSelector">Saltar a fecha:</label>
          <input type="date" id="fechaSelector" min="2025-01-01" max="2050-12-31" value="${fechaStr}">
          <button id="saltarFechaBtn">Ir</button>
        </div>
      </div>
      
      ${contenidoPartido}
      ${contenidoProximoPartido}
      
      <div id="eventosFecha" class="eventos-fecha">
        <!-- Aquí se mostrarán los eventos de la fecha actual -->
      </div>
    </div>
  `;
  
  // Actualizar el elemento fechaActual en la interfaz principal
  const fechaActualElement = document.getElementById("fechaActual");
  if (fechaActualElement) {
    fechaActualElement.textContent = fechaFormateada;
  }
  
  // Actualizar la posición en la tabla
  const posicionTablaElement = document.getElementById("posicionTabla");
  if (posicionTablaElement) {
    const posicion = localStorage.getItem("posicionTabla") || "-";
    posicionTablaElement.textContent = posicion;
  }
  
  // Mostrar eventos para esta fecha
  mostrarEventosFecha(fecha);
  
  // Añadir listeners a los botones
  document.getElementById("avanzarDiaBtn").addEventListener("click", () => {
    avanzarFecha(1, 'dia');
  });
  
  document.getElementById("avanzarSemanaBtn").addEventListener("click", () => {
    avanzarFecha(7, 'dia');
  });
  
  document.getElementById("avanzarMesBtn").addEventListener("click", () => {
    avanzarFecha(1, 'mes');
  });
  
  document.getElementById("saltarFechaBtn").addEventListener("click", () => {
    const nuevaFecha = document.getElementById("fechaSelector").value;
    if (nuevaFecha) {
      localStorage.setItem("fechaActual", nuevaFecha);
      renderCalendario(containerId);
    }
  });
  
  // Botón para jugar partido si hay uno en esta fecha
  const jugarPartidoBtn = document.getElementById("jugarPartidoBtn");
  if (jugarPartidoBtn) {
    jugarPartidoBtn.addEventListener("click", () => {
      const jornadaNumero = parseInt(jugarPartidoBtn.getAttribute("data-jornada"));
      const resultado = simularPartido(jornadaNumero);
      
      if (resultado) {
        renderCalendario(containerId); // Actualizar para mostrar resultado
      }
    });
  }
  
  // Botón para avanzar hasta el próximo partido
  const avanzarHastaPartidoBtn = document.getElementById("avanzarHastaPartidoBtn");
  if (avanzarHastaPartidoBtn) {
    avanzarHastaPartidoBtn.addEventListener("click", () => {
      const fechaPartido = avanzarHastaPartidoBtn.getAttribute("data-fecha");
      if (fechaPartido) {
        localStorage.setItem("fechaActual", fechaPartido);
        renderCalendario(containerId);
      }
    });
  }
}

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
  
  localStorage.setItem("fechaActual", fechaActual.toISOString().split('T')[0]);
  renderCalendario("calendarioContainer");
}

function mostrarEventosFecha(fecha) {
  const eventosContainer = document.getElementById("eventosFecha");
  if (!eventosContainer) return;
  
  // Formatear fecha para búsqueda de eventos
  const fechaStr = fecha.toISOString().split('T')[0];
  
  // Obtener eventos de localStorage o inicializar si no existen
  let eventos = JSON.parse(localStorage.getItem("eventosCalendario")) || {};
  
  // Verificar si hay un partido para esta fecha
  const infoPartido = verificarPartidoEnFecha(fechaStr);
  
  // Si hay un partido en esta fecha, añadirlo como evento si no existe ya
  if (infoPartido.hayPartido) {
    if (!eventos[fechaStr]) {
      eventos[fechaStr] = [];
    }
    
    // Verificar si el evento del partido ya existe
    const tieneEventoPartido = eventos[fechaStr].some(e => e.tipo === "Partido");
    
    if (!tieneEventoPartido) {
      const partido = infoPartido.partido;
      eventos[fechaStr].push({
        tipo: "Partido",
        descripcion: `Jornada ${infoPartido.jornada}: ${partido.local} vs ${partido.visitante}`
      });
      localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
    }
  }
  
  // Mostrar eventos para esta fecha
  if (eventos[fechaStr] && eventos[fechaStr].length > 0) {
    let eventosHTML = '<h4>Eventos para hoy:</h4><ul>';
    eventos[fechaStr].forEach(evento => {
      eventosHTML += `<li>${evento.tipo}: ${evento.descripcion}</li>`;
    });
    eventosHTML += '</ul>';
    eventosContainer.innerHTML = eventosHTML;
  } else {
    eventosContainer.innerHTML = '<p>No hay eventos programados para este día.</p>';
  }
}
