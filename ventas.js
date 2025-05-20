document.addEventListener("DOMContentLoaded", () => {
  // Recuperar la información del jugador en venta desde localStorage
  const jugadorData = localStorage.getItem("jugadorEnVenta");
  
  if (!jugadorData) {
    // Si no hay datos del jugador, mostrar un mensaje y redirigir
    document.getElementById("contenidoVentas").innerHTML = `
      <div class="error-message">
        No hay información del jugador. Selecciona un jugador para vender desde la plantilla.
      </div>
    `;
    
    // Agregar botón para volver a la plantilla
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "Volver a la plantilla";
    volverBtn.className = "btn-volver";
    volverBtn.addEventListener("click", () => {
      window.location.href = "plantilla.html";
    });
    
    document.getElementById("contenidoVentas").appendChild(volverBtn);
    return;
  }
  
  // Parsear los datos del jugador
  const jugador = JSON.parse(jugadorData);
  
  // Obtener elementos del DOM
  const contenidoVentas = document.getElementById("contenidoVentas");
  const nombreJugadorElement = document.getElementById("nombreJugador");
  const infoJugadorElement = document.getElementById("infoJugador");
  const ofertasElement = document.getElementById("ofertas");
  
  // Mostrar nombre del jugador
  if (nombreJugadorElement) {
    nombreJugadorElement.textContent = jugador.nombre;
  }
  
  // Mostrar información del jugador
  if (infoJugadorElement) {
    infoJugadorElement.innerHTML = `
      <p><strong>Posición:</strong> ${jugador.posicion}</p>
      <p><strong>Edad:</strong> ${jugador.edad} años</p>
      <p><strong>Club actual:</strong> ${jugador.club}</p>
      <p><strong>Valor general:</strong> ${jugador.valorGeneral}</p>
      <p><strong>Precio base:</strong> ${jugador.precioTransferencia}</p>
    `;
  }
  
  // Función para generar ofertas basadas en la edad y características del jugador
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
    let factorValoracion = jugador.valorGeneral / 70; // Aproximadamente 1 para un jugador de valoración 70
    
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
    
    // Jugadores muy mayores (más de 38) tienen pocas o ninguna oferta
    if (jugador.edad > 38) {
      // 80% de probabilidad de no recibir ofertas
      if (Math.random() < 0.8) {
        return []; // Sin ofertas
      }
      // Solo 1 oferta posible si supera el filtro
      const equipoInteresado = posiblesEquipos[Math.floor(Math.random() * posiblesEquipos.length)];
      const oferta = Math.floor(precioBase * 0.3); // Solo 30% del valor base
      
      ofertas.push({
        equipo: equipoInteresado,
        monto: oferta.toLocaleString() + "€",
        probabilidadAceptar: "Baja",
        mensaje: "Oferta final, tómala o déjala"
      });
      
      return ofertas;
    }
    
    // Número de ofertas según la edad y valoración
    let numOfertas = 1;
    if (jugador.edad < 30 && jugador.valorGeneral > 75) {
      numOfertas = 3 + Math.floor(Math.random() * 2); // 3-4 ofertas
    } else if (jugador.edad < 35) {
      numOfertas = 2 + Math.floor(Math.random() * 2); // 2-3 ofertas
    } else {
      numOfertas = 1 + Math.floor(Math.random() * 2); // 1-2 ofertas
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
      
      // Calcular el monto de la oferta (variación aleatoria)
      const factorAleatorio = 0.85 + Math.random() * 0.3; // Entre 85% y 115% del valor calculado
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
  
  // Generar las ofertas para el jugador
  const ofertas = generarOfertas(jugador);
  
  // Mostrar las ofertas
  if (ofertasElement) {
    if (ofertas.length === 0) {
      ofertasElement.innerHTML = `
        <div class="sin-ofertas">
          <p>No hay ofertas para ${jugador.nombre}.</p>
          <p>Debido a su edad (${jugador.edad} años), ningún club ha mostrado interés.</p>
          <p>Puedes intentar prestar al jugador o mantenerlo en la plantilla.</p>
        </div>
      `;
    } else {
      // Crear el encabezado
      ofertasElement.innerHTML = `
        <h3>Ofertas recibidas (${ofertas.length})</h3>
      `;
      
      // Crear una lista de ofertas
      const listaOfertas = document.createElement("ul");
      listaOfertas.className = "lista-ofertas";
      
      ofertas.forEach(oferta => {
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
            <button class="btn-aceptar">Aceptar oferta</button>
            <button class="btn-contraofertar">Contraofertar</button>
            <button class="btn-rechazar">Rechazar</button>
          </div>
        `;
        
        listaOfertas.appendChild(li);
      });
      
      ofertasElement.appendChild(listaOfertas);
      
      // Añadir eventos a los botones de ofertas
      document.querySelectorAll(".btn-aceptar").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const oferta = ofertas[index];
          alert(`¡Oferta aceptada! Has vendido a ${jugador.nombre} al ${oferta.equipo} por ${oferta.monto}.`);
          // Aquí puedes agregar lógica para actualizar el presupuesto del club, eliminar el jugador, etc.
          
          // Redirigir de vuelta a la plantilla
          setTimeout(() => {
            window.location.href = "plantilla.html";
          }, 1500);
        });
      });
      
      document.querySelectorAll(".btn-contraofertar").forEach((btn, index) => {
        btn.addEventListener("click", () => {
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
              // Actualizar presupuesto, eliminar jugador, etc.
              
              setTimeout(() => {
                window.location.href = "plantilla.html";
              }, 1500);
            } else {
              alert(`El ${oferta.equipo} ha rechazado tu contraoferta. La negociación ha terminado.`);
              // Eliminar esta oferta de la lista
              ofertasElement.querySelectorAll(".oferta-item")[index].remove();
              
              // Si no quedan ofertas, mostrar mensaje
              if (ofertasElement.querySelectorAll(".oferta-item").length === 0) {
                ofertasElement.innerHTML = `
                  <div class="sin-ofertas">
                    <p>No quedan ofertas para ${jugador.nombre}.</p>
                    <p>Puedes intentar más tarde o mantenerlo en la plantilla.</p>
                  </div>
                `;
              }
            }
          }
        });
      });
      
      document.querySelectorAll(".btn-rechazar").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const oferta = ofertas[index];
          alert(`Has rechazado la oferta del ${oferta.equipo}.`);
          
          // Eliminar esta oferta de la lista
          ofertasElement.querySelectorAll(".oferta-item")[index].remove();
          
          // Si no quedan ofertas, mostrar mensaje
          if (ofertasElement.querySelectorAll(".oferta-item").length === 0) {
            ofertasElement.innerHTML = `
              <div class="sin-ofertas">
                <p>No quedan ofertas para ${jugador.nombre}.</p>
                <p>Puedes intentar más tarde o mantenerlo en la plantilla.</p>
              </div>
            `;
          }
        });
      });
    }
  }
  
  // Agregar botón para volver a la plantilla
  const divBotones = document.createElement("div");
  divBotones.className = "botones-navegacion";
  divBotones.innerHTML = `
    <button id="volverPlantilla" class="btn-volver">Volver a la plantilla</button>
  `;
  
  contenidoVentas.appendChild(divBotones);
  
  document.getElementById("volverPlantilla").addEventListener("click", () => {
    window.location.href = "plantilla.html";
  });
});
