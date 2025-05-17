// Solución completa para el problema de localStorage
document.addEventListener("DOMContentLoaded", function() {
  console.log("Menu.js cargado correctamente");
  
  // Imprimir todos los elementos en localStorage para depuración
  console.log("--- Contenido completo del localStorage ---");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log("localStorage[" + key + "] = " + localStorage.getItem(key));
  }
  console.log("---------------------------------------");
  
  // Intentar obtener valores con nombres alternativos de claves
  const posiblesClaves = ["coachName", "coach_name", "coach", "entrenador", "nombreEntrenador"];
  const posiblesClubes = ["selectedClub", "club", "selected_club", "nombreClub", "equipoSeleccionado"];
  
  // Función para intentar obtener un valor de múltiples claves posibles
  function intentarObtenerValor(listaClaves) {
    for (const clave of listaClaves) {
      const valor = localStorage.getItem(clave);
      if (valor) {
        return { clave, valor };
      }
    }
    return null;
  }
  
  // Buscar valores de entrenador y club
  const resultadoEntrenador = intentarObtenerValor(posiblesClaves);
  const resultadoClub = intentarObtenerValor(posiblesClubes);
  
  console.log("Resultado de búsqueda de entrenador:", resultadoEntrenador);
  console.log("Resultado de búsqueda de club:", resultadoClub);
  
  // Asignar valores encontrados o predeterminados
  let nombreEntrenador = resultadoEntrenador ? resultadoEntrenador.valor : "No disponible";
  let nombreClub = resultadoClub ? resultadoClub.valor : "No disponible";
  
  // Actualizar elementos en el DOM
  document.getElementById("nombreEntrenador").textContent = nombreEntrenador;
  document.getElementById("nombreClub").textContent = nombreClub;
  
  // Valores por defecto para fecha y posición
  var fechaActual = localStorage.getItem("fechaActual") || "Jornada 1";
  var posicionTabla = localStorage.getItem("posicionTabla") || "Por determinar";
  
  document.getElementById("fechaActual").textContent = fechaActual;
  document.getElementById("posicionTabla").textContent = posicionTabla;
  
  // Configurar los botones del menú
  document.getElementById("avanzarFechaBtn").addEventListener("click", function() {
    console.log("Avanzar fecha clickeado");
    var fechaNum = parseInt(fechaActual.split(" ")[1]) || 1;
    fechaNum++;
    localStorage.setItem("fechaActual", "Jornada " + fechaNum);
    alert("¡Has avanzado a la Jornada " + fechaNum + "!");
    location.reload();
  });
  
  document.getElementById("plantillaBtn").addEventListener("click", function() {
    console.log("Plantilla clickeado");
    window.location.href = "plantilla.html";
  });
  
  document.getElementById("estrategiaBtn").addEventListener("click", function() {
    console.log("Estrategia clickeado");
    window.location.href = "estrategia.html";
  });
  
  document.getElementById("canterasBtn").addEventListener("click", function() {
    console.log("Canteras clickeado");
    window.location.href = "canteras.html";
  });
  
  document.getElementById("solicitarJugadorBtn").addEventListener("click", function() {
    console.log("Solicitar jugador clickeado");
    window.location.href = "solicitar_jugador.html";
  });
});
