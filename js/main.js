const operaciones = ["sumar", "restar", "multiplicar", "dividir"];
let continuar = true;

function calcular(operacion, num1, num2) {
  switch (operacion) {
    case "sumar":
      return num1 + num2;
    case "restar":
      return num1 - num2;
    case "multiplicar":
      return num1 * num2;
    case "dividir":
        return num1 / num2;
      default:
        return null;
     }
  }

function iniciarCalculadora() {
  alert("Bienvenido a la calculadora.");

  while (continuar) {
    console.log("Operaciones disponibles:", operaciones.join(", "));

    let operacion = prompt("¿Qué operación desea realizar? (sumar, restar, multiplicar, dividir)").toLowerCase();

    if (operaciones.includes(operacion)) {
      let num1 = parseFloat(prompt("Ingrese el primer número:"));
      let num2 = parseFloat(prompt("Ingrese el segundo número:"));

      let resultado = calcular(operacion, num1, num2);

      if (resultado !== null) {
        alert(`El resultado de ${operacion} ${num1} y ${num2} es: ${resultado}`);
        console.log(`Resultado: ${resultado}`);
      }
    } else {
      alert("Operación inválida. Intente nuevamente.");
    }

    continuar = confirm("¿Desea realizar otra operación?");
  }

  alert("Gracias por utilizar mi calculadora.");
}
 function ejecutarCalculadora() {
  let repetir = true;

  while (repetir) {
    iniciarCalculadora();
    repetir = confirm("¿queres volver a la calculadora?");
  }
  alert("nos vemos!!");
}

ejecutarCalculadora();