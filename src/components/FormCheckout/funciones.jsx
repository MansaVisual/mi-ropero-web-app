export const chargeForm = async(form,setProvincia)=>{
    document.getElementById("nombreApellido").value=form.nombreApellido
    document.getElementById("telefono").value=form.telefono
    document.getElementById("calle").value=form.calle
    document.getElementById("alturaKM").value=form.alturaKM
    document.getElementById("piso").value=form.piso
    document.getElementById("depto").value=form.depto
    document.getElementById("barrioLocalidad").value=form.barrioLocalidad
    document.getElementById("entrecalle1").value=form.entrecalle1
    document.getElementById("entrecalle2").value=form.entrecalle2
    document.getElementById("codigoPostal").value=form.codigoPostal
    document.getElementById("comentario").value=form.comentario
    if(form.provincia !== ""){
        setProvincia(form.provincia)
    }
}

export const handleChangeForm = async(setForm,form) => {
    await setForm({...form,
        nombreApellido:document.getElementById("nombreApellido").value,
        telefono:document.getElementById("telefono").value,
        calle:document.getElementById("calle").value,
        alturaKM:document.getElementById("alturaKM").value,
        piso:document.getElementById("piso").value,
        depto:document.getElementById("depto").value,
        barrioLocalidad:document.getElementById("barrioLocalidad").value,
        entrecalle1:document.getElementById("entrecalle1").value,
        entrecalle2:document.getElementById("entrecalle2").value,
        codigoPostal:document.getElementById("codigoPostal").value,
        comentario:document.getElementById("comentario").value,
    })
}

export const onFocus=(event,clase,clase2,id)=>{
    if(event.target.id === "barrioLocalidad"){
        if(document.getElementById(id).classList.contains(clase2)){
            document.getElementById(id).classList.remove(clase2)
        }
    }
    if(id==="labelProvincia"){
        document.getElementById(id).classList.remove(clase2)
    }
    if(event.target.classList.contains(clase)){
        event.target.classList.remove(clase)
        document.getElementById(id).classList.remove(clase2)
    }
}

export const handleClick=(setCampoObligatorio,clase,clase2)=>{
    let cambioCampo = false
    if(document.getElementById("nombreApellido").value===""){
        handleClickHelp("nombreApellido","labelNombreApellido",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("telefono").value===""){
        handleClickHelp("telefono","labelTelefono",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("calle").value===""){
        handleClickHelp("calle","labelCalle",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("alturaKM").value===""){
        handleClickHelp("alturaKM","labelAlturaKM",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("provincia").nextSibling.value==="ejemplo"){
        handleClickHelp("provincia","labelProvincia",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("barrioLocalidad").value===""){
        handleClickHelp("barrioLocalidad","labelBarrioLocalidad",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    if(document.getElementById("codigoPostal").value===""){
        handleClickHelp("codigoPostal","labelCodigoPostal",clase,clase2,setCampoObligatorio)
        cambioCampo=true
    }
    return(cambioCampo)
}

const handleClickHelp = async(id,id2,clase,clase2,setCampoObligatorio)=>{
    await setCampoObligatorio(true)

    document.getElementById(id).classList.add(clase)
    document.getElementById(id2).classList.add(clase2)

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}