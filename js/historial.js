const form = document.getElementById("operation-form");
if(form) form.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {
    nombre: document.getElementById("nombre").value.trim(),
    dni: document.getElementById("dni").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    contacto: document.getElementById("contacto").value.trim(),
    sueldo: document.getElementById("sueldo").value.trim(),
    ingresos: document.getElementById("ingresos").files[0],
    garantia: document.getElementById("garantia").value.trim()
  };
  const validations = [
    { condition: !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(data.nombre), error:{title:"Error nombre", text:"Solo letras y espacios"} },
    { condition: !/^[0-9]{7,10}$/.test(data.dni), error:{title:"Error DNI", text:"DNI válido 7-10 números"} },
    { condition: data.direccion.length<5, error:{title:"Error dirección", text:"Mínimo 5 caracteres"} },
    { condition: !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contacto) || /^[0-9+\-\s]{6,15}$/.test(data.contacto)), error:{title:"Error contacto", text:"Email o teléfono válido"} },
    { condition: isNaN(data.sueldo)||data.sueldo<=0, error:{title:"Error sueldo", text:"Número positivo"} },
    { condition: !data.ingresos, error:{title:"Archivo faltante", text:"Adjuntar prueba de ingresos"} },
    { condition: data.ingresos && !["application/pdf","image/jpeg","image/png"].includes(data.ingresos.type), error:{title:"Formato inválido", text:"Solo PDF,JPG,PNG"} },
    { condition: data.garantia.length<5, error:{title:"Error garantía", text:"Mínimo 5 caracteres"} }
  ];
  for(let v of validations) if(v.condition){ Swal.fire({title:v.error.title,text:v.error.text,icon:"error",confirmButtonText:"Corregir"}); return; }
  Swal.fire({
    title:'Revisar datos antes de confirmar',
    html:`<p>🪪 <strong>DNI:</strong> ${data.dni}</p>
          <p>👤 <strong>Nombre:</strong> ${data.nombre}</p>
          <p>📍 <strong>Dirección:</strong> ${data.direccion}</p>
          <p>📞 <strong>Contacto:</strong> ${data.contacto}</p>
          <p>💵 <strong>Sueldo:</strong> $${parseFloat(data.sueldo).toFixed(2)}</p>
          <p>📑 <strong>Garantía:</strong> ${data.garantia}</p>`,
    icon:'question',
    showCancelButton:true,
    confirmButtonText:'✅ Confirmar',
    cancelButtonText:'❌ Cancelar',
    reverseButtons:true,
    showClass:{ popup:'animate__animated animate__fadeInDown' },
    hideClass:{ popup:'animate__animated animate__fadeOutUp' }
  }).then(result=>{
    if(result.isConfirmed){
      Swal.fire({title:'Operación confirmada',text:'Tu operación fue enviada.',icon:'success',confirmButtonText:'Perfecto'});
      form.reset();
    } else if(result.dismiss === Swal.DismissReason.cancel){
      Swal.fire({title:'Operación cancelada',text:'Puedes revisar tus datos.',icon:'info',confirmButtonText:'Entendido'});
    }
  });
});
