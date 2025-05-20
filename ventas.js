document.addEventListener("DOMContentLoaded", () => {
  // Recuperar la información del jugador en venta desde localStorage
  const jugadorData = localStorage.getItem("jugadorEnVenta");
  
  // Obtener elementos del DOM
  const contenidoVentas = document.getElementById("contenidoVentas");
  const nombreJugadorElement = document.getElementById("nombreJugador");
  const infoJugadorElement = document.getElementById("infoJugador");
  const ofertasElement = document.getElementById("ofertas");
  
  // Verificar si hay datos del jugador
  if (!jugadorData) {
    mostrarMensajeError();
    return;
  }
  
  // Parsear los datos del jugador
  const jugador = JSON.parse(jugadorData);
  
  // Mostrar información del jugador
  mostrarInfoJugador(jugador);
  
  // Generar y mostrar ofertas
  const ofertas = generarOfertas(jugador);
  mostrarOfertas(jugador, ofertas);
  
  // Agregar botón para volver a la plantilla
  agregarBotonVolver();
  
  // FUNCIONES AUXILIARES
  
  // Función para mostrar mensaje de error cuando no hay datos
  function mostrarMensajeError() {
    contenidoVentas.innerHTML = `
      <div class="error-message">
        <p>No hay información del jugador. Selecciona un jugador para vender desde la plantilla.</p>
      </div>
      <button id="volverPlantilla" class="btn-volver">Volver a la plantilla</button>
    `;
    
    document.getElementById("volverPlantilla").addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
  }
  
  // Función para mostrar la información del jugador
  function mostrarInfoJugador(jugador) {
    if (nombreJugadorElement) {
      nombreJugadorElement.textContent = jugador.nombre;
    }
    
    if (infoJugadorElement) {
      infoJugadorElement.innerHTML = `
        <p><strong>Posición:</strong> ${jugador.posicion}</p>
        <p><strong>Edad:</strong> ${jugador.edad} años</p>
        <p><strong>Club actual:</strong> ${jugador.club}</p>
        <p><strong>Valor general:</strong> ${jugador.valorGeneral}</p>
        <p><strong>Precio base:</strong> ${jugador.precioTransferencia}</p>
      `;
    }
  }
  
  // Función para generar ofertas basadas en el jugador
  function generarOfertas(jugador) {
    const ofertas = [];
    
    // Convertir el precio de transferencia a número (eliminar el símbolo € y los puntos)
    const precioBase = parseInt(jugador.precioTransferencia.replace(/[€.]/g, ""));
    
    // Factor de multiplicación según la edad
    let factorEdad = 1;
    if (jugador.edad > 35) {
      factorEdad = 0.5; // 50% del valor para jugadores mayores de 35
    } else if (jugador.edad > 30) {
      factorEdad = 0.8; // 80% del valor para jugadores entre 30 y 35
    } else if (jugador.edad < 25) {
      factorEdad = 1.5; // 150% del valor para jugadores menores de 25
    }
    
    // Factor según valoración general
    let factorValoracion = jugador.valorGeneral / 70;
    
    // Lista de equipos interesados según la posición
    const equiposInteresados = {
      "Delantero": ["Barcelona SC", "Emelec", "Independiente del Valle", "Flamengo", "River Plate"],
      "Extremo Derecho": ["Palmeiras", "América", "Boca Juniors", "Santos FC", "Colo-Colo"],
      "Centrocampista": ["São Paulo", "Nacional", "Peñarol", "Atletico Mineiro", "Independiente"],
      "Defensa": ["LDU Quito", "Cerro Porteño", "Olimpia", "Corinthians", "Racing Club"]
    };
    
    // Equipos interesados según la posición o equipos genéricos si no hay específicos
    const posiblesEquipos = equiposInteresados[jugador.posicion] || 
                          ["Barcelona SC", "Emelec", "Flamengo", "River Plate", "Boca Juniors"];
    
    // Determinar número de ofertas según la edad y valoración
    let numOfertas = 2; // Valor predeterminado: 2 ofertas
    
    if (jugador.edad > 38) {
      // Jugadores muy mayores tienen 1 oferta o ninguna
      numOfertas = Math.random() < 0.8 ? 0 : 1;
    } else if (jugador.edad < 30 && jugador.valorGeneral > 75) {
      numOfertas = 3; // Jugadores jóvenes y buenos reciben 3 ofertas
    } else if (jugador.edad > 35) {
      numOfertas = 1; // Jugadores mayores reciben 1 oferta
    }
    
    // Si no hay ofertas, retornar el array vacío
    if (numOfertas === 0) {
      return ofertas;
    }
    
    // Asegurarse de no tener más ofertas que equipos disponibles
    numOfertas = Math.min(numOfertas, posiblesEquipos.length);
    
    // Generar las ofertas
    const equiposSeleccionados = [];
    for (let i = 0; i < numOfertas; i++) {
      // Seleccionar un equipo que no haya ofertado ya
      let equipoIndex;
      do {
        equipoIndex = Math.floor(Math.random() * posiblesEquipos.length);
      } while (equiposSeleccionados.includes(equipoIndex));
      
      equiposSeleccionados.push(equipoIndex);
      const equipo = posiblesEquipos[equipoIndex];
      
      // Calcular el monto de la oferta
      const factorAleatorio = 0.85 + Math.random() * 0.3; // Entre 85% y 115%
      const montoBase = precioBase * factorEdad * factorValoracion;
      const monto = Math.floor(montoBase * factorAleatorio);
      
      // Determinar probabilidad de aceptar contraoferta
      let probabilidadAceptar = "Media";
      if (factorAleatorio > 1.05) probabilidadAceptar = "Alta";
      if (factorAleatorio < 0.95) probabilidadAceptar = "Baja";
      
      // Mensaje personalizado
      let mensaje = "Esperamos tu respuesta";
      if (jugador.edad < 25) {
        mensaje = "Gran potencial, estamos muy interesados";
      } else if (jugador.edad > 35) {
        mensaje = "Oferta final, tómala o déjala";
      } else if (jugador.valorGeneral > 80) {
        mensaje = "Admiramos su talento, queremos contar con él";
      }
      
      ofertas.push({
        equipo: equipo,
        monto: monto.toLocaleString() + "€",
        probabilidadAceptar: probabilidadAceptar,
        mensaje: mensaje
      });
    }
    
    return ofertas;
  }
  
  // Función para mostrar las ofertas
  function mostrarOfertas(jugador, ofertas) {
    if (!ofertasElement) return;
    
    if (ofertas.length === 0) {
      ofertasElement.innerHTML = `
        <div class="sin-ofertas">
          <p>No hay ofertas para ${jugador.nombre}.</p>
          <p>Debido a su edad (${jugador.edad} años), ningún club ha mostrado interés.</p>
          <p>Puedes intentar prestar al jugador o mantenerlo en la plantilla.</p>
        </div>
      `;
      return;
    }
    
    // Crear el encabezado
    ofertasElement.innerHTML = `
      <h3>Ofertas recibidas (${ofertas.length})</h3>
    `;
    
    // Crear una lista de ofertas
    const listaOfertas = document.createElement("ul");
    listaOfertas.className = "lista-ofertas";
    
    ofertas.forEach((oferta, index) => {
      const li = document.createElement("li");
      li.className = "oferta-item";
      li.innerHTML = `
        <div class="oferta-cabecera">
          <h4>${oferta.equipo}</h4>
          <span class="oferta-monto">${oferta.monto}</span>
        </div>
        <p class="oferta-mensaje">"${oferta.mensaje}"</p>
        <p class="oferta-probabilidad">Probabilidad de aceptar contraoferta: <span class="prob-${oferta.probabilidadAceptar.toLowerCase()}">${oferta.probabilidadAceptar}</span></p>
        <div class="oferta-acciones">
          <button class="btn-aceptar" data-index="${index}">Aceptar oferta</button>
          <button class="btn-contraofertar" data-index="${index}">Contraofertar</button>
          <button class="btn-rechazar" data-index="${index}">Rechazar</button>
        </div>
      `;
      
      listaOfertas.appendChild(li);
    });
    
    ofertasElement.appendChild(listaOfertas);
    
    // Añadir eventos a los botones
    configurarEventosBotones(jugador, ofertas);
  }
  
  // Configurar eventos para los botones de las ofertas
  function configurarEventosBotones(jugador, ofertas) {
    // Botones de aceptar
    document.querySelectorAll(".btn-aceptar").forEach(btn => {
      btn.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        const oferta = ofertas[index];
        
        alert(`¡Oferta aceptada! Has vendido a ${jugador.nombre} al ${oferta.equipo} por ${oferta.monto}.`);
        
        // Redirigir de vuelta a la plantilla
        setTimeout(() => {
          window.location.href = "plantilla.html";
        }, 1500);
      });
    });
    
    // Botones de contraofertar
    document.querySelectorAll(".btn-contraofertar").forEach(btn => {
      btn.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        const oferta = ofertas[index];
        const montoActual = parseInt(oferta.monto.replace(/[€.]/g, ""));
        
        const nuevaOferta = prompt(`Introduce el nuevo monto para la contraoferta (actual: ${oferta.monto}):`, montoActual.toLocaleString());
        
        if (nuevaOferta) {
          const montoNuevo = parseInt(nuevaOferta.replace(/[.]/g, ""));
          
          // Simular si el equipo acepta o no la contraoferta
          let probabilidadBase;
          if (oferta.probabilidadAceptar === "Alta") probabilidadBase = 0.8;
          else if (oferta.probabilidadAceptar === "Media") probabilidadBase = 0.5;
          else probabilidadBase = 0.2;
          
          // Ajustar la probabilidad según la diferencia de la oferta
          const factorDiferencia = montoActual / montoNuevo;
          const probabilidadFinal = probabilidadBase * factorDiferencia;
          
          if (Math.random() < probabilidadFinal) {
            alert(`¡Contraoferta aceptada! Has vendido a ${jugador.nombre} al ${oferta.equipo} por ${montoNuevo.toLocaleString()}€.`);
            
            setTimeout(() => {
              window.location.href = "plantilla.html";
            }, 1500);
          } else {
            alert(`El ${oferta.equipo} ha rechazado tu contraoferta. La negociación ha terminado.`);
            
            // Eliminar esta oferta de la lista
            this.closest(".oferta-item").remove();
            
            // Si no quedan ofertas, mostrar mensaje
            if (document.querySelectorAll(".oferta-item").length === 0) {
              mostrarSinOfertas(jugador);
            }
          }
        }
      });
    });
    
    // Botones de rechazar
    document.querySelectorAll(".btn-rechazar").forEach(btn => {
      btn.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        const oferta = ofertas[index];
        
        alert(`Has rechazado la oferta del ${oferta.equipo}.`);
        
        // Eliminar esta oferta de la lista
        this.closest(".oferta-item").remove();
        
        // Si no quedan ofertas, mostrar mensaje
        if (document.querySelectorAll(".oferta-item").length === 0) {
          mostrarSinOfertas(jugador);
        }
      });
    });
  }
  
  // Mostrar mensaje cuando no quedan ofertas
  function mostrarSinOfertas(jugador) {
    ofertasElement.innerHTML = `
      <div class="sin-ofertas">
        <p>No quedan ofertas para ${jugador.nombre}.</p>
        <p>Puedes intentar más tarde o mantenerlo en la plantilla.</p>
      </div>
    `;
  }
  
  // Agregar botón para volver a la plantilla
  function agregarBotonVolver() {
    const divBotones = document.createElement("div");
    divBotones.className = "botones-navegacion";
    divBotones.innerHTML = `
      <button id="volverPlantilla" class="btn-volver">Volver a la plantilla</button>
    `;
    
    contenidoVentas.appendChild(divBotones);
    
    document.getElementById("volverPlantilla").addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
  }
});
