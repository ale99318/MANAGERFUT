// Esperamos a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const welcomeSection = document.getElementById("welcome-section");
  const coachDisplayName = document.getElementById("coachDisplayName");
  const startBtn = document.getElementById("startBtn");
  const continueBtn = document.getElementById("continueBtn");

  // Si ya hay un nombre guardado, mostrar directamente la bienvenida
  const savedCoachName = localStorage.getItem("coachName");
  if (savedCoachName) {
    coachDisplayName.textContent = savedCoachName;
    loginSection.style.display = "none";
    welcomeSection.style.display = "block";
  }

  // Al hacer clic en "Comenzar"
  startBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("coachName").value.trim();

    if (nameInput === "") {
      alert("Por favor ingresa tu nombre de entrenador.");
      return;
    }

    localStorage.setItem("coachName", nameInput);
    coachDisplayName.textContent = nameInput;
    loginSection.style.display = "none";
    welcomeSection.style.display = "block";
  });

  // Botón para continuar (futura navegación a selección de equipo)
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "seleccion-equipo.html"; // Próxima página
  });
});
