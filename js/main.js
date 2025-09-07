
let expresion = "";
const pantalla = document.getElementById("pantalla");

function actualizarPantalla() {
  pantalla.textContent = expresion || "0";
}

function toast(mensaje, color = "#4caf50") {
  iziToast.show({
    message: mensaje,
    backgroundColor: color,
    position: "topRight",
    timeout: 2000
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const inputNombre = document.getElementById("nombre");
  const btnNombre = document.getElementById("btn-nombre");

  inputNombre.focus();

  inputNombre.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nombre = inputNombre.value.trim();
      if (nombre) {
        btnNombre.click();
      } else {
        toast("Por favor ingresa tu nombre", "#ff9800");
      }
    }
  });

  btnNombre.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) {
      toast("Por favor ingresa tu nombre", "#ff9800");
      return;
    }

    localStorage.setItem("usuario", nombre);
    Swal.fire({
      title: `¡Bienvenido ${nombre}! 🎉`,
      text: "Prepárate para usar la calculadora interactiva",
      icon: "success",
      confirmButtonText: "Comenzar"
    }).then(() => {
      document.getElementById("bienvenida").classList.add("oculto");
      document.getElementById("calculadora").classList.remove("oculto");
      toast(`Hola ${nombre}, disfruta tu calculadora 😎`);
      mostrarHistorial();
    });
  });

  document.querySelectorAll(".calculadora-grid button").forEach(btn => {
    btn.addEventListener("click", () => {
      const valor = btn.textContent;

      if (!isNaN(valor)) {
        expresion += valor;
      } else if (["+", "-", "*", "/"].includes(valor)) {
        expresion += ` ${valor} `;
      } else if (valor === "C") {
        expresion = "";
        toast("Pantalla borrada 🧹", "#ff9800");
      } else if (valor === "=") {
        try {
          const resultado = eval(expresion);
          if (isNaN(resultado) || resultado === Infinity) {
            expresion = "";
            Swal.fire("Error", "Operación inválida ❌", "error");
          } else {
            guardarHistorial({ operacion: expresion, resultado });
            mostrarHistorial();
            expresion = resultado.toString();
            toast(`Resultado: ${resultado}`, "#4caf50");
          }
        } catch {
          expresion = "";
          Swal.fire("Error", "Expresión inválida ❌", "error");
        }
      }
      actualizarPantalla();
    });
  });

  document.getElementById("limpiar-historial").addEventListener("click", () => {
    Swal.fire({
      title: "¿Borrar historial?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {
      if (result.isConfirmed) {
        limpiarHistorial();
        mostrarHistorial();
        toast("Historial eliminado 🗑️", "#e91e63");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    const calcVisible = !document.getElementById("calculadora").classList.contains("oculto");
    if (!calcVisible) return;

    if (!isNaN(e.key)) {
      expresion += e.key;
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      expresion += ` ${e.key} `;
    } else if (e.key === "Enter") {
      document.querySelector(".btn-equal").click();
    } else if (e.key === "Backspace") {
      expresion = expresion.slice(0, -1);
    }
    actualizarPantalla();
  });

});
