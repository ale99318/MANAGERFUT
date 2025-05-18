// Modificación para jornadas.js
// Ajustar la función verificarPartidoEnFecha para mejorar compatibilidad con calendario

function verificarPartidoEnFecha(fecha) {
  const calendarioLiga = JSON.parse(localStorage.getItem("calendarioLiga")) || inicializarCalendarioLiga();
  
  // Buscar si hay jornada en esta fecha
  const jornada = calendarioLiga.jornadas.find(j => j.fecha === fecha);
  
  if (jornada) {
    // Encontrar el partido del equipo del usuario
    const equipoUsuario = localStorage.getItem("selectedClub") || localStorage.getItem("nombreClub");
    const partido = jornada.partidos.find(p => 
      p.local === equipoUsuario || p.visitante === equipoUsuario
    );
    
    if (partido) {
      return {
        hayPartido: true,
        jornada: jornada.numero,
        partido: partido
      };
    }
  }
  
  return { hayPartido: false };
}

// Modificar inicializarCalendarioLiga para usar fechas más realistas
// y ajustadas al calendario del juego
function inicializarCalendarioLiga(temporada = "2025-2026") {
  // Verificar si ya existe un calendario guardado
  if (localStorage.getItem("calendarioLiga")) {
    return JSON.parse(localStorage.getItem("calendarioLiga"));
  }
  
  // Usar la fecha actual del juego como punto de partida
  const fechaBaseJuego = localStorage.getItem("fechaActual") || "2025-01-01";
  const fechaInicio = new Date(fechaBaseJuego);
  
  const calendarioLiga = {
    temporada: temporada,
    fechaInicio: fechaInicio.toISOString().split('T')[0],
    fechaFin: null,  // Se calculará automáticamente
    jornadas: []
  };
  
  // Crear jornadas (38 jornadas en una liga de 20 equipos)
  // Programar un partido cada 7 días
  for (let i = 1; i <= 38; i++) {
    // Calcular fecha de la jornada (cada fin de semana)
    const fechaJornada = new Date(fechaInicio);
    fechaJornada.setDate(fechaJornada.getDate() + (i - 1) * 7);
    
    // Si cae en periodo navideño (23 dic - 5 ene), saltar esas fechas
    const mes = fechaJornada.getMonth();
    const dia = fechaJornada.getDate();
    if ((mes === 11 && dia >= 23) || (mes === 0 && dia <= 5)) {
      fechaJornada.setDate(fechaJornada.getDate() + 14); // Saltar 2 semanas
    }
    
    const jornada = {
      numero: i,
      fecha: fechaJornada.toISOString().split('T')[0],
      partidos: generarPartidosJornada(i),
      completada: false
    };
    
    calendarioLiga.jornadas.push(jornada);
  }
  
  // Establecer fecha de fin
  const ultimaJornada = calendarioLiga.jornadas[calendarioLiga.jornadas.length - 1];
  calendarioLiga.fechaFin = ultimaJornada.fecha;
  
  // Guardar en localStorage
  localStorage.setItem("calendarioLiga", JSON.stringify(calendarioLiga));
  
  return calendarioLiga;
}

// Simular un partido programado - versión mejorada
function simularPartido(jornadaNumero) {
  const calendarioLiga = JSON.parse(localStorage.getItem("calendarioLiga")) || inicializarCalendarioLiga();
  const jornada = calendarioLiga.jornadas.find(j => j.numero === jornadaNumero);
  
  if (!jornada) {
    console.error(`No se encontró la jornada ${jornadaNumero}`);
    return { error: `No se encontró la jornada ${jornadaNumero}` };
  }
  
  if (jornada.completada) {
    console.log(`La jornada ${jornadaNumero} ya está completada`);
    return { error: `La jornada ${jornadaNumero} ya está completada` };
  }
  
  const equipoUsuario = localStorage.getItem("selectedClub") || localStorage.getItem("nombreClub");
  const partidoIndex = jornada.partidos.findIndex(p => 
    p.local === equipoUsuario || p.visitante === equipoUsuario
  );
  
  if (partidoIndex === -1) {
    console.error(`No se encontró partido para ${equipoUsuario} en la jornada ${jornadaNumero}`);
    return { error: `No se encontró partido para ${equipoUsuario} en la jornada ${jornadaNumero}` };
  }
  
  // Comprobar si el partido ya fue jugado
  if (jornada.partidos[partidoIndex].jugado) {
    console.log(`El partido de la jornada ${jornadaNumero} ya fue jugado`);
    return { error: `El partido de la jornada ${jornadaNumero} ya fue jugado` };
  }
  
  // Simular resultado
  const golesLocal = Math.floor(Math.random() * 5);
  const golesVisitante = Math.floor(Math.random() * 3);
  
  jornada.partidos[partidoIndex].resultado = `${golesLocal}-${golesVisitante}`;
  jornada.partidos[partidoIndex].jugado = true;
  
  // Comprobar si todos los partidos están jugados
  const todosJugados = jornada.partidos.every(p => p.jugado);
  if (todosJugados) {
    jornada.completada = true;
  }
  
  // Actualizar clasificación
  actualizarClasificacion(jornada.partidos[partidoIndex]);
  
  // Guardar cambios
  localStorage.setItem("calendarioLiga", JSON.stringify(calendarioLiga));
  
  // Actualizar eventos del calendario
  actualizarEventoPartido(jornada.fecha, true);
  
  return {
    partido: jornada.partidos[partidoIndex],
    jornada: jornada.numero,
    resultado: {
      local: golesLocal,
      visitante: golesVisitante
    }
  };
}

// Nueva función para actualizar el estado del partido en los eventos del calendario
function actualizarEventoPartido(fechaPartido, jugado) {
  // Obtener eventos
  let eventos = JSON.parse(localStorage.getItem("eventosCalendario")) || {};
  
  // Si hay eventos para esta fecha
  if (eventos[fechaPartido]) {
    // Buscar el evento de partido y actualizarlo
    for (let i = 0; i < eventos[fechaPartido].length; i++) {
      if (eventos[fechaPartido][i].tipo === "Partido") {
        eventos[fechaPartido][i].jugado = jugado;
      }
    }
    
    // Guardar eventos actualizados
    localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
  }
}
