function selectTeam(equipo) {
  localStorage.setItem('selectedClub', equipo);
  
  const confirmation = document.getElementById('confirmation');
  confirmation.textContent = `Has elegido a ${equipo}.`;

  // Aquí puedes agregar un botón para continuar a la plantilla, por ejemplo
  confirmation.innerHTML += `<br><br><a href="plantilla.html">Continuar a la plantilla</a>`;
}
