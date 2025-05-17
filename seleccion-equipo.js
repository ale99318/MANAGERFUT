// Función para seleccionar equipo
function selectTeam(equipo) {
  // Guardar la selección en localStorage
  localStorage.setItem('selectedClub', equipo);
  
  // Mostrar confirmación al usuario
  const confirmation = document.getElementById('confirmation');
  confirmation.textContent = `Has elegido a ${equipo}.`;
  confirmation.innerHTML += `<br><br><a href="plantilla.html" class="btn">Continuar a la plantilla</a>`;
  
  // También podríamos redirigir automáticamente
  // setTimeout(() => { window.location.href = 'plantilla.html'; }, 2000);
}

// Función para verificar si ya existe una selección al cargar cualquier página
function checkExistingSelection() {
  const selectedClub = localStorage.getItem('selectedClub');
  
  // Si estamos en la página de selección y ya hay un club seleccionado, redirigir al menú/plantilla
  if (selectedClub && window.location.pathname.includes('seleccion.html')) {
    console.log(`Club ya seleccionado: ${selectedClub}, redirigiendo...`);
    window.location.href = 'plantilla.html';
    return true;
  }
  
  // Si estamos en una página diferente (menú, plantilla, etc.) y no hay club seleccionado, redirigir a la selección
  if (!selectedClub && !window.location.pathname.includes('seleccion.html')) {
    console.log('No hay club seleccionado, redirigiendo a selección...');
    window.location.href = 'seleccion.html';
    return true;
  }
  
  return false;
}

// Código para mostrar el club seleccionado en la plantilla u otras páginas
function displaySelectedClub() {
  const selectedClub = localStorage.getItem('selectedClub');
  const clubDisplay = document.getElementById('clubDisplay');
  
  if (selectedClub && clubDisplay) {
    clubDisplay.textContent = `Club seleccionado: ${selectedClub}`;
  }
}

// Ejecutar estas verificaciones cuando se carga cualquier página
document.addEventListener('DOMContentLoaded', function() {
  // Primero verificar si necesitamos redirigir
  const redirected = checkExistingSelection();
  
  // Si no hubo redirección, mostrar la información del club si corresponde
  if (!redirected) {
    displaySelectedClub();
  }
});
