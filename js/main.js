const operaciones = ["sumar", "restar", "multiplicar", "dividir"];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

function calcular(operacion, num1, num2) {
  const operacionesObj = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => b === 0 ? null : a / b
  };
  return operacionesObj[operacion](num1, num2);
}

function guardarHistorial(obj) {
  historial.push(obj);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  const lista = document.getElementById("historial");
  lista.innerHTML = "";
  historial.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.operacion} ${item.num1} y ${item.num2} = ${item.resultado}`;
    lista.appendChild(li);
  });
}

function filtrarResultados(mayorA) {
  return historial.filter(item => item.resultado > mayorA);
}

function obtenerOperacionesUnicas() {
  return [...new Set(historial.map(item => item.operacion))];
}

document.getElementById("btn-nombre").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  if (nombre) {
    localStorage.setItem("usuario", nombre);
    document.getElementById("mensaje").textContent = `Hola ${nombre}, bienvenido a la calculadora.`;
    document.getElementById("bienvenida").classList.add("oculto");
    document.getElementById("calculadora").classList.remove("oculto");
    mostrarHistorial();
  }
});

document.getElementById("btn-calcular").addEventListener("click", () => {
  const operacion = document.getElementById("operacion").value;
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);

  if (!isNaN(num1) && !isNaN(num2)) {
    const resultado = calcular(operacion, num1, num2);
    const resultadoElem = document.getElementById("resultado");

    if (resultado === null) {
      resultadoElem.textContent = "Error: No se puede dividir por cero.";
      return;
    }

    resultadoElem.textContent = `Resultado: ${resultado}`;

    guardarHistorial({ operacion, num1, num2, resultado });
    mostrarHistorial();
  } else {
    document.getElementById("resultado").textContent = "Por favor ingresa números válidos.";
  }
});
