async function obtenerCotizaciones() {
  const btn = document.getElementById("actualizar-cotizacion");

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...`;
    }

    const res = await fetch("https://open.er-api.com/v6/latest/ARS");
    const data = await res.json();

    if (!data || !data.rates) throw new Error("Respuesta inválida");

    const dolarEnArs = (1 / data.rates.USD).toFixed(2);
    const euroEnArs = (1 / data.rates.EUR).toFixed(2);

    document.getElementById("usd").textContent = `$ ${dolarEnArs}`;
    document.getElementById("eur").textContent = `€ ${euroEnArs}`;
    document.getElementById("ars").textContent = `$ 1.00`;

    iziToast.show({
      title: "Cotizaciones actualizadas",
      message: `USD $${dolarEnArs} | EUR €${euroEnArs}`,
      position: "topRight",
      backgroundColor: "#28a745",
      timeout: 2500
    });

  } catch (error) {
    document.getElementById("usd").textContent = "Error";
    document.getElementById("eur").textContent = "Error";
    document.getElementById("ars").textContent = "Error";

    iziToast.error({
      title: "Error",
      message: "No se pudieron obtener las cotizaciones",
      position: "topRight",
      timeout: 3000
    });

    console.error("Error al obtener cotización:", error);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "Actualizar";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerCotizaciones();

  const btnActualizar = document.getElementById("actualizar-cotizacion");
  if (btnActualizar) {
    btnActualizar.addEventListener("click", obtenerCotizaciones);
  }
});