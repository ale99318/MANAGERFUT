// calendario.js
function renderCalendario(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Obtener la fecha actual del sistema si no hay una guardada
  let fechaActual = localStorage.getItem("fechaActual");
  if (!fechaActual) {
    // Usar la fecha actual como punto de inicio
    fechaActual = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
    localStorage.setItem("fechaActual", fechaActual);
  }
  
  const fecha = new Date(fechaActual);
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
   
  // Calcular jornada basada en la fecha (ejemplo: cada 7 días es una jornada)
  const fechaInicio = new Date("2025-01-01"); // Fecha base para calcular jornada
  const diasTranscurridos = Math.floor((fecha - fechaInicio) / (1000 * 60 * 60 * 24));
  const jornadaActual = Math.floor(diasTranscurridos / 7) + 1;
  
  container.innerHTML = `
    <div class="calendario-box">
      <h3>📅 Fecha actual: ${fechaFormateada}</h3>
      <p>Jornada: ${jornadaActual}</p>
      
      <div class="calendario-controles">
        <button id="avanzarDiaBtn">Avanzar 1 día</button>
        <button id="avanzarSemanaBtn">Avanzar 1 semana</button>
        <button id="avanzarMesBtn">Avanzar 1 mes</button>
        
        <div class="saltar-fecha">
          <label for="fechaSelector">Saltar a fecha:</label>
          <input type="date" id="fechaSelector" min="2025-01-01" max="2050-12-31" value="${fechaActual}">
          <button id="saltarFechaBtn">Ir</button>
        </div>
      </div>
      
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
  
  // Comprobar si hay partido en esta fecha
  const diaDelMes = fecha.getDate();
  if (diaDelMes % 7 === 0) { // Ejemplo: partidos cada 7 días
    if (!eventos[fechaStr]) {
      eventos[fechaStr] = [];
    }
    
    // Solo añadir el partido si no existe ya uno para esta fecha
    const tienePartido = eventos[fechaStr].some(e => e.tipo === "Partido");
    
    if (!tienePartido) {
      eventos[fechaStr].push({
        tipo: "Partido",
        descripcion: "Partido de Liga contra equipo rival"
      });
      localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
      
      // Actualizar la visualización
      mostrarEventosFecha(fecha);
    }
  }
}
