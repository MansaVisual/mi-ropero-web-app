export const handleInputChange = (form, setForm) => {
  setForm({
    ...form,
    alias: document.getElementById('alias').value,
    telefono: document.getElementById('telefono').value,
    calle: document.getElementById('calle').value,
    alturaKM: document.getElementById('alturaKM').value,
    piso: document.getElementById('piso').value,
    depto: document.getElementById('depto').value,
    barrioLocalidad: document.getElementById('barrioLocalidad').value,
    entrecalle1: document.getElementById('entrecalle1').value,
    entrecalle2: document.getElementById('entrecalle2').value,
    codigoPostal: document.getElementById('codigoPostal').value,
    infoAdicional: document.getElementById('infoAdicional').value,
  });
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
