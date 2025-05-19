function generarStatsAleatorias() {
  return {
    velocidad: Math.floor(Math.random() * 41) + 60,
    disparo: Math.floor(Math.random() * 41) + 60,
    pase: Math.floor(Math.random() * 41) + 60,
    defensa: Math.floor(Math.random() * 41) + 60,
    fisico: Math.floor(Math.random() * 41) + 60
  };
}

function calcularValorGeneral(stats) {
  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  return Math.round(total / Object.keys(stats).length);
}

function calcularValorMercado(valorGeneral) {
  return valorGeneral * 120000 + Math.floor(Math.random() * 50000);
}
