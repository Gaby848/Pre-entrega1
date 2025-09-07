let historial = JSON.parse(localStorage.getItem("historial")) || [];
let chart;

function guardarHistorial(obj) {
  historial.push(obj);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  const lista = document.getElementById("historial");
  lista.innerHTML = "";
  historial.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${item.operacion} = ${item.resultado}`;
    lista.appendChild(li);
  });
  actualizarGrafico();
}

function limpiarHistorial() {
  historial = [];
  localStorage.removeItem("historial");
  actualizarGrafico();
}

function actualizarGrafico() {
  const ctx = document.getElementById("graficoResultados").getContext("2d");
  const etiquetas = historial.map(item => item.operacion);
  const resultados = historial.map(item => item.resultado);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Resultados",
        data: resultados,
        borderWidth: 1,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}
