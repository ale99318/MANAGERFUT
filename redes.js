document.addEventListener("DOMContentLoaded", () => {
  const socialBox = document.getElementById("socialBox");

  const comentarios = [
    "🗣️ ¡Gran debut del DT!",
    "📈 El equipo empieza a tomar forma.",
    "⚽ ¿La cantera será la clave esta temporada?",
    "🔥 Rumores de fichajes llegan al club...",
    "🤔 Algunos cuestionan la estrategia usada.",
    "💬 Los hinchas confían en el proceso."
  ];

  let indice = 0;
  socialBox.innerHTML = `<p>${comentarios[indice]}</p>`;

  setInterval(() => {
    indice = (indice + 1) % comentarios.length;
    socialBox.innerHTML = `<p>${comentarios[indice]}</p>`;
  }, 8000);
});
