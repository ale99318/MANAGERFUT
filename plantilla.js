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
  
  // Datos de jugadores ficticios según el equipo
  const plantillas = {
   "Alianza Lima": ["Guillermo Viscarra", "Ángelo Campos", "Ángel De La Cruz", "Fabrisio Mesías", "Carlos Zambrano", "Miguel Trauco", "Renzo Garcés", "Guillermo Enrique", "Ricardo Lagos", "Erick Noriega", "Marco Huamán", "Carlos Gómez", "Jhoao Velásquez", "Nicolás Amasifuen", "Brian Arias", "Rait Alarcón", "Jhosenffer Yllescas", "Mateo Arakaki", "Jean Pierre Archimbaud", "Jesús Castillo", "Fernando Gaibor", "Pablo Lavandeira", "Pablo Ceppelini", "Gonzalo Aguirre", "Juan Delgado", "Mart Piero Cari", "Alan Cantero", "Bassco Soyer", "Said Peralta", "Luis Javier Navea", "Hernán Barcos", "Paolo Guerrero", "Matías Succar", "Kevin Quevedo", "Eryc Castillo", "Víctor Guzmán", "Jhamir D'Arrigo"],
      "Universitario": ["Sebastián Britos", "Aamet Calderón", "Jhefferson Rodríguez", "Miguel Vargas", "Williams Riveros", "Matías Di Benedetto", "Gustavo Dulanto", "Aldo Corzo", "Paolo Reyna", "José Carabalí", "César Inga", "Esteban Cruz", "Rafael Guzmán", "Julinho Astudillo", "Martín Pérez Guedes", "Horacio Calcaterra", "Jairo Concha", "Jairo Vélez", "Rodrigo Dioses", "Sebastián Flores", "Andy Polo", "Alexander Succar", "Nicolás Rengifo"],
  "Sporting Cristal": ["Diego Enríquez", "Renato Solís", "Alejandro Duarte", "César Bautista", "Gianfranco Chávez", "Rafael Lutiger", "Franco Romero", "Nicolás Pasquini", "Alejandro Pósito", "Leonardo Díaz", "Gabriel Alfaro", "Jesús Pretell", "Leandro Sosa", "Yoshimar Yotún", "Martín Távara", "Ian Wisdom", "Adrián Ascues", "Christofer Gonzales", "Gustavo Cazonatti", "Santiago González", "Martín Cauteruccio", "Alejandro Hohberg", "Irven Ávila", "Diego Otoya", "Maxloren Castro", "Fernando Pacheco", "Jostin Alarcón"]

    
  };
  
  // Obtener la lista de jugadores para el club seleccionado
  const jugadores = plantillas[nombreClub] || [];
  const listaJugadores = document.getElementById("listaJugadores");
  
  // Mostrar los jugadores en la lista
  jugadores.forEach(jugador => {
    const li = document.createElement("li");
    li.textContent = jugador;
    listaJugadores.appendChild(li);
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
