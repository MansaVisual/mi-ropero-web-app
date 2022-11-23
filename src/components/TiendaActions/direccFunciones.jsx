export const handleInputChange = (form, setForm) => {
  console.log("PISO", document.getElementById('piso').value)
  setForm({
    ...form,
    telefono: document.getElementById('telefono')!==null? document.getElementById('telefono').value:"",
    calle: document.getElementById('calle').value,
    alturaKM: document.getElementById('alturaKM').value,
    piso: document.getElementById('piso').value,
    depto: document.getElementById('depto').value,
    provincia: document.getElementById('provincia').value,
    barrioLocalidad: document.getElementById('barrioLocalidad').value,
    entrecalle1: document.getElementById('entrecalle1').value,
    entrecalle2: document.getElementById('entrecalle2').value,
    codigoPostal: document.getElementById('codigoPostal').value,
    infoAdicional: document.getElementById('infoAdicional').value,
  });
};

export const chargeForm = async (form, setProvincia) => {
  document.getElementById('nombreApellido').value = form.nombreApellido;
  document.getElementById('calle').value = form.calle;
  document.getElementById('alturaKM').value = form.alturaKM;
  document.getElementById('piso').value = form.piso;
  document.getElementById('depto').value = form.depto;
  document.getElementById('barrioLocalidad').value = form.barrioLocalidad;
  document.getElementById('entrecalle1').value = form.entrecalle1;
  document.getElementById('entrecalle2').value = form.entrecalle2;
  document.getElementById('codigoPostal').value = form.codigoPostal;
  document.getElementById('comentario').value = form.comentario;
  if (form.provincia !== '') {
    setProvincia(form.provincia);
  }
};

export const onFocus = (event, clase, clase2, id) => {
  if (event.target.id === 'barrioLocalidad') {
    if (document.getElementById(id).classList.contains(clase2)) {
      document.getElementById(id).classList.remove(clase2);
    }
  }
  if (id === 'labelProvincia') {
    document.getElementById(id).classList.remove(clase2);
  }
  if (event.target.classList.contains(clase)) {
    event.target.classList.remove(clase);
    document.getElementById(id).classList.remove(clase2);
  }
};
