// jornadas.js
// Sistema de programación de partidos y jornadas para el simulador de fútbol

// Estructura de datos para almacenar las jornadas y partidos
const EQUIPOS_LIGA = [
  "FC Barcelona", "Real Madrid", "Atlético Madrid", "Sevilla FC",
  "Valencia CF", "Villarreal CF", "Real Sociedad", "Athletic Bilbao",
  "Real Betis", "Espanyol", "Celta Vigo", "Getafe CF",
  "Rayo Vallecano", "Osasuna", "Mallorca", "Girona FC",
  "Leganés", "Alavés", "Las Palmas", "Granada CF"
];

// Función para inicializar el calendario de liga
function inicializarCalendarioLiga(temporada = "2025-2025") {
  // Verificar si ya existe un calendario guardado
  if (localStorage.getItem("calendarioLiga")) {
    return JSON.parse(localStorage.getItem("calendarioLiga"));
  }
  
  const calendarioLiga = {
    temporada: temporada,
    fechaInicio: "2025-02-16", // Fecha típica de inicio de temporada
    fechaFin: "2025-12-24",    // Fecha típica de fin de temporada
    jornadas: []
  };
  
  // Crear jornadas (38 jornadas en una liga de 20 equipos)
  const fechaInicio = new Date(calendarioLiga.fechaInicio);
  
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
  
  // Guardar en localStorage
  localStorage.setItem("calendarioLiga", JSON.stringify(calendarioLiga));
  
  return calendarioLiga;
}

// Generar partidos para una jornada específica
function generarPartidosJornada(numeroJornada) {
  const partidos = [];
  const equipoLocal = localStorage.getItem("selectedClub") || EQUIPOS_LIGA[0];
  
  // En una liga real, habría que generar un algoritmo completo de calendario
  // Para simplificar, asignamos un rival aleatorio diferente para cada jornada
  const rivalesDisponibles = EQUIPOS_LIGA.filter(equipo => equipo !== equipoLocal);
  const rivalIndex = (numeroJornada - 1) % rivalesDisponibles.length;
  const rival = rivalesDisponibles[rivalIndex];
  
  // Alternar local/visitante
  let partido;
  if (numeroJornada % 2 === 0) {
    partido = {
      local: equipoLocal,
      visitante: rival,
      resultado: null,
      jugado: false
    };
  } else {
    partido = {
      local: rival,
      visitante: equipoLocal,
      resultado: null,
      jugado: false
    };
  }
  
  partidos.push(partido);
  
  // Añadir otros partidos de la jornada (sólo para mostrar en clasificación)
  for (let i = 0; i < 9; i++) {
    const equiposRestantes = EQUIPOS_LIGA.filter(e => 
      e !== equipoLocal && e !== rival && 
      !partidos.some(p => p.local === e || p.visitante === e)
    );
    
    if (equiposRestantes.length >= 2) {
      partidos.push({
        local: equiposRestantes[0],
        visitante: equiposRestantes[1],
        resultado: null,
        jugado: false
      });
    }
  }
  
  return partidos;
}

// Verificar si hay partido en una fecha específica
function verificarPartidoEnFecha(fecha) {
  const calendarioLiga = JSON.parse(localStorage.getItem("calendarioLiga")) || inicializarCalendarioLiga();
  
  // Buscar si hay jornada en esta fecha
  const jornada = calendarioLiga.jornadas.find(j => j.fecha === fecha);
  
  if (jornada) {
    // Encontrar el partido del equipo del usuario
    const equipoUsuario = localStorage.getItem("selectedClub");
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

// Simular un partido programado
function simularPartido(jornadaNumero) {
  const calendarioLiga = JSON.parse(localStorage.getItem("calendarioLiga"));
  const jornada = calendarioLiga.jornadas.find(j => j.numero === jornadaNumero);
  
  if (!jornada || jornada.completada) {
    return false;
  }
  
  const equipoUsuario = localStorage.getItem("selectedClub");
  const partidoIndex = jornada.partidos.findIndex(p => 
    p.local === equipoUsuario || p.visitante === equipoUsuario
  );
  
  if (partidoIndex === -1) {
    return false;
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
  
  return {
    partido: jornada.partidos[partidoIndex],
    jornada: jornada.numero
  };
}

// Actualizar clasificación después de un partido
function actualizarClasificacion(partido) {
  // Obtener o inicializar la clasificación
  let clasificacion = JSON.parse(localStorage.getItem("clasificacion")) || inicializarClasificacion();
  
  if (partido && partido.jugado && partido.resultado) {
    const [golesLocal, golesVisitante] = partido.resultado.split('-').map(Number);
    
    // Actualizar equipo local
    const equipoLocalIndex = clasificacion.findIndex(e => e.equipo === partido.local);
    if (equipoLocalIndex !== -1) {
      clasificacion[equipoLocalIndex].partidosJugados += 1;
      clasificacion[equipoLocalIndex].golesFavor += golesLocal;
      clasificacion[equipoLocalIndex].golesContra += golesVisitante;
      
      if (golesLocal > golesVisitante) {
        clasificacion[equipoLocalIndex].ganados += 1;
        clasificacion[equipoLocalIndex].puntos += 3;
      } else if (golesLocal === golesVisitante) {
        clasificacion[equipoLocalIndex].empatados += 1;
        clasificacion[equipoLocalIndex].puntos += 1;
      } else {
        clasificacion[equipoLocalIndex].perdidos += 1;
      }
    }
    
    // Actualizar equipo visitante
    const equipoVisitanteIndex = clasificacion.findIndex(e => e.equipo === partido.visitante);
    if (equipoVisitanteIndex !== -1) {
      clasificacion[equipoVisitanteIndex].partidosJugados += 1;
      clasificacion[equipoVisitanteIndex].golesFavor += golesVisitante;
      clasificacion[equipoVisitanteIndex].golesContra += golesLocal;
      
      if (golesVisitante > golesLocal) {
        clasificacion[equipoVisitanteIndex].ganados += 1;
        clasificacion[equipoVisitanteIndex].puntos += 3;
      } else if (golesVisitante === golesLocal) {
        clasificacion[equipoVisitanteIndex].empatados += 1;
        clasificacion[equipoVisitanteIndex].puntos += 1;
      } else {
        clasificacion[equipoVisitanteIndex].perdidos += 1;
      }
    }
    
    // Ordenar por puntos
    clasificacion.sort((a, b) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos;
      }
      // Desempate por diferencia de goles
      const difA = a.golesFavor - a.golesContra;
      const difB = b.golesFavor - b.golesContra;
      return difB - difA;
    });
    
    // Actualizar posiciones
    clasificacion.forEach((equipo, index) => {
      equipo.posicion = index + 1;
    });
    
    // Guardar clasificación
    localStorage.setItem("clasificacion", JSON.stringify(clasificacion));
    
    // Actualizar posición del equipo del usuario en la UI
    const equipoUsuario = localStorage.getItem("selectedClub");
    const posicionUsuario = clasificacion.find(e => e.equipo === equipoUsuario)?.posicion || "-";
    localStorage.setItem("posicionTabla", posicionUsuario);
  }
  
  return clasificacion;
}

// Inicializar clasificación al principio de temporada
function inicializarClasificacion() {
  const clasificacion = EQUIPOS_LIGA.map(equipo => ({
    equipo: equipo,
    posicion: 0,
    puntos: 0,
    partidosJugados: 0,
    ganados: 0,
    empatados: 0,
    perdidos: 0,
    golesFavor: 0,
    golesContra: 0
  }));
  
  // Ordenar alfabéticamente al inicio
  clasificacion.sort((a, b) => a.equipo.localeCompare(b.equipo));
  clasificacion.forEach((equipo, index) => {
    equipo.posicion = index + 1;
  });
  
  localStorage.setItem("clasificacion", JSON.stringify(clasificacion));
  return clasificacion;
}

// Obtener próximo partido
function obtenerProximoPartido() {
  const calendarioLiga = JSON.parse(localStorage.getItem("calendarioLiga")) || inicializarCalendarioLiga();
  const equipoUsuario = localStorage.getItem("selectedClub");
  
  // Buscar la primera jornada no completada
  for (const jornada of calendarioLiga.jornadas) {
    if (!jornada.completada) {
      const partido = jornada.partidos.find(p => 
        (p.local === equipoUsuario || p.visitante === equipoUsuario) && !p.jugado
      );
      
      if (partido) {
        return {
          jornada: jornada.numero,
          fecha: jornada.fecha,
          partido: partido
        };
      }
    }
  }
  
  return null; // No hay próximos partidos
}
