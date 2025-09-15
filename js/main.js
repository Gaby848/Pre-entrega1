let productos = {};
let tipoCambio = 0;
let chart = null;

function showError(title, text) {
  if (typeof Swal !== "undefined") Swal.fire({ title, text, icon:"error", confirmButtonText:"Corregir" });
  else alert(title + "\n" + text);
}

function showSuccess(title, html) {
  if (typeof Swal !== "undefined") Swal.fire({
    title, html, icon:"success", confirmButtonText:"Aceptar",
    background:"#f4faff", color:"#004080",
    showClass:{ popup:'animate__animated animate__fadeInDown' },
    hideClass:{ popup:'animate__animated animate__fadeOutUp' }
  });
  else alert(title + "\n" + (html ? html.replace(/<[^>]+>/g,'') : ''));
}

async function cargarDatos() {
  try {
    const res = await fetch("data/operaciones.json");
    if (!res.ok) throw new Error("Fetch falló: " + res.status);
    const data = await res.json();
    productos = data.productos || {};
    tipoCambio = data.tipoCambio || 1;

    const select = document.getElementById("producto");
    select.innerHTML = '<option value="">-- Seleccionar --</option>';
    Object.keys(productos).forEach(key => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = productos[key].nombre;
      select.appendChild(opt);
    });
  } catch(e) {
    console.error(e);
    showError("Error de carga", "No se pudo cargar operaciones.json");
  }
}
cargarDatos();

const formCalc = document.getElementById("calc-form");
if (formCalc) formCalc.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {
    producto: document.getElementById("producto").value,
    monto: parseFloat(document.getElementById("monto").value),
    plazo: parseInt(document.getElementById("plazo").value),
    convertir: document.getElementById("convertir").checked
  };
  const validations = [
    { condition: !data.producto, error:{ title:"Error", text:"Debe seleccionar un producto." } },
    { condition: isNaN(data.monto)||data.monto<=0, error:{ title:"Error en monto", text:"Ingrese monto válido." } },
    { condition: isNaN(data.plazo)||data.plazo<=0, error:{ title:"Error en plazo", text:"Ingrese plazo válido." } }
  ];
  for (let v of validations) if(v.condition){ showError(v.error.title,v.error.text); return; }

  if (!productos[data.producto]) { showError("Producto no disponible","Recarga la página."); return; }

  const tasa = productos[data.producto].tasa/100;
  const interes = data.monto*tasa*data.plazo/12;
  const total = data.monto+interes;
  let detalle = `<p><strong>Producto:</strong>${productos[data.producto].nombre}</p>
  <p><strong>Monto:</strong> $${data.monto.toFixed(2)}</p>
  <p><strong>Plazo:</strong> ${data.plazo} meses</p>
  <p><strong>Interés:</strong> $${interes.toFixed(2)}</p>
  <p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
  if(data.convertir){ detalle += `<p><strong>Total USD:</strong> $${(total/tipoCambio).toFixed(2)}</p>`; }
  showSuccess("Resultado del cálculo",detalle);

  const labels = Array.from({length:data.plazo},(_,i)=>`Mes ${i+1}`);
  const valores = labels.map((_,i)=>data.monto + (data.monto*tasa*(i+1)/12));
  const canvas = document.getElementById("graficoInteres");
  if(canvas && typeof Chart!=="undefined"){
    if(chart) chart.destroy();
    chart = new Chart(canvas.getContext("2d"),{
      type:"line",
      data:{ labels, datasets:[{label:"Capital acumulado", data:valores, borderColor:"#004080", backgroundColor:"rgba(0,64,128,0.2)", tension:0.3, fill:true}] },
      options:{ responsive:true, plugins:{ legend:{display:true} }, scales:{ y:{beginAtZero:false} } }
    });
  }
});
