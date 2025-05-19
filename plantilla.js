// script.js - Lógica JavaScript para la plantilla del equipo

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
  
  // Datos de jugadores con estadísticas completas
  const plantillas = {
    "Alianza Lima": [
      {
        nombre: "Paolo Guerrero",
        edad: 41,
        posicion: "Delantero",
        caracter: "Líder nato",
        estadisticas: {
          velocidad: 78,
          sprint: 75,
          disparo: 86,
          pase: 79,
          defensa: 45,
          fisico: 82
        },
        valorGeneral: 74, // Suma de estadísticas dividida para obtener promedio
        precioTransferencia: "800.000€",
        sueldo: "30.000€ mensuales",
        potencialMejora: "Bajo (debido a su edad)"
      }
    ],
    "Universitario": [
      {
        nombre: "Andy Polo",
        edad: 29,
        posicion: "Extremo Derecho",
        caracter: "Trabajador",
        estadisticas: {
          velocidad: 88,
          sprint: 89,
          disparo: 76,
          pase: 78,
          defensa: 62,
          fisico: 74
        },
        valorGeneral: 78,
        precioTransferencia: "1.200.000€",
        sueldo: "25.000€ mensuales",
        potencialMejora: "Moderado"
      }
    ],
    "Sporting Cristal": [
      {
        nombre: "Yoshimar Yotún",
        edad: 34,
        posicion: "Centrocampista",
        caracter: "Profesional",
        estadisticas: {
          velocidad: 75,
          sprint: 73,
          disparo: 76,
          pase: 85,
          defensa: 79,
          fisico: 77
        },
        valorGeneral: 77,
        precioTransferencia: "950.000€",
        sueldo: "28.000€ mensuales",
        potencialMejora: "Bajo"
      }
    ]
  };
  
  // Obtener la lista de jugadores para el club seleccionado
  const jugadores = plantillas[nombreClub] || [];
  const listaJugadores = document.getElementById("listaJugadores");
  
  // Mostrar los jugadores en la lista con sus estadísticas
  jugadores.forEach(jugador => {
    const li = document.createElement("li");
    li.className = "jugador-item";
    
    // Crear estructura HTML para mostrar jugadores con estadísticas
    li.innerHTML = `
      <h3>${jugador.nombre}</h3>
      <p><strong>Posición:</strong> ${jugador.posicion} | <strong>Edad:</strong> ${jugador.edad} años</p>
      <p><strong>Carácter:</strong> ${jugador.caracter}</p>
      <div class="estadisticas">
        <p><strong>Estadísticas:</strong></p>
        <ul class="stats-list">
          <li>Velocidad: ${jugador.estadisticas.velocidad}</li>
          <li>Sprint: ${jugador.estadisticas.sprint}</li>
          <li>Disparo: ${jugador.estadisticas.disparo}</li>
          <li>Pase: ${jugador.estadisticas.pase}</li>
          <li>Defensa: ${jugador.estadisticas.defensa}</li>
          <li>Físico: ${jugador.estadisticas.fisico}</li>
        </ul>
      </div>
      <p><strong>Valor general:</strong> ${jugador.valorGeneral}</p>
      <p><strong>Precio de transferencia:</strong> ${jugador.precioTransferencia}</p>
      <p><strong>Sueldo:</strong> ${jugador.sueldo}</p>
      <p><strong>Potencial de mejora:</strong> ${jugador.potencialMejora}</p>
    `;
    
    // Añadir botones de acción al jugador
    const botonesAccion = document.createElement("div");
    botonesAccion.className = "botones-accion";
    botonesAccion.style.display = "none"; // Inicialmente ocultos
    botonesAccion.innerHTML = `
      <button class="btn-entrenar">Entrenar</button>
      <button class="btn-prestar">Prestar</button>
      <button class="btn-vender">Vender</button>
      <button class="btn-despedir">Despedir</button>
    `;
    
    li.appendChild(botonesAccion);
    listaJugadores.appendChild(li);
    
    // Configurar eventos para los botones
    const btnEntrenar = botonesAccion.querySelector(".btn-entrenar");
    const btnPrestar = botonesAccion.querySelector(".btn-prestar");
    const btnVender = botonesAccion.querySelector(".btn-vender");
    const btnDespedir = botonesAccion.querySelector(".btn-despedir");
    
    btnEntrenar.addEventListener("click", () => {
      alert(`Entrenando a ${jugador.nombre}. Sus estadísticas mejorarán en el próximo entrenamiento.`);
    });
    
    btnPrestar.addEventListener("click", () => {
      alert(`${jugador.nombre} ha sido prestado a otro club por una temporada.`);
    });
    
    btnVender.addEventListener("click", () => {
      alert(`Has vendido a ${jugador.nombre} por ${jugador.precioTransferencia}.`);
    });
    
    btnDespedir.addEventListener("click", () => {
      alert(`Has despedido a ${jugador.nombre}. Tendrás que pagar una indemnización.`);
    });
  });
  
  // Primero, ocultar el enlace de cambiar equipo por defecto
  const cambiarEquipoLink = document.getElementById("cambiarEquipoLink");
  if (cambiarEquipoLink) {
    cambiarEquipoLink.style.display = "none";
  }
  
  // Verificar de dónde viene la llamada para determinar el comportamiento
  const origen = localStorage.getItem("origen") || "desconocido";
  const continuarBtn = document.getElementById("continuarBtn");
  
  if (origen === "seleccion_equipo") {
    // Si viene de la selección de equipo, mostrar el botón para continuar al periódico
    continuarBtn.textContent = "Continuar al periódico";
    continuarBtn.addEventListener("click", () => {
      // Limpiar el origen ya que el flujo inicial está completo
      localStorage.removeItem("origen");
      window.location.href = "periodico.html";
    });
    
    // Mostrar enlace para cambiar equipo SOLO en el flujo inicial
    if (cambiarEquipoLink) {
      cambiarEquipoLink.style.display = "block";
    }
  } else {
    // Si viene del menú principal, mostrar el botón para volver al menú
    continuarBtn.textContent = "Volver al menú principal";
    continuarBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
    
    // Asegurarse de que el enlace de cambiar equipo esté oculto
    if (cambiarEquipoLink) {
      cambiarEquipoLink.style.display = "none";
    }
    
    // Mostrar los botones de acción para cada jugador cuando viene del menú principal
    document.querySelectorAll(".botones-accion").forEach(botonera => {
      botonera.style.display = "flex";
    });
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
