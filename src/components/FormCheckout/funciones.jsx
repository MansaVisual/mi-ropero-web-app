export const handleChangeForm = async(setErrorInicial,setForm,form) => {
    setErrorInicial(false)
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

export const onFocus=(event,clase)=>{
    if(event.target.classList.contains(clase)){
        event.target.classList.remove(clase)
    }
}

export const handleClick=(form,setErrorInicial,setCampoObligatorio,clase)=>{
    let cambioCampo = false

    if(form.length===0){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        setErrorInicial(true)
        return
    }else{
        if(document.getElementById("nombreApellido").value===""){
            handleClickHelp("nombreApellido",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("telefono").value===""){
            handleClickHelp("telefono",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("calle").value===""){
            handleClickHelp("calle",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("alturaKM").value===""){
            handleClickHelp("alturaKM",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("provincia").value===""){
            handleClickHelp("provincia",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("barrioLocalidad").value===""){
            handleClickHelp("barrioLocalidad",clase,setCampoObligatorio)
            cambioCampo=true
        }
        if(document.getElementById("codigoPostal").value===""){
            handleClickHelp("codigoPostal",clase,setCampoObligatorio)
            cambioCampo=true
        }
    }
    console.log(cambioCampo)
}

const handleClickHelp = async(id,clase,setCampoObligatorio)=>{
    await setCampoObligatorio(true)
    document.getElementById(id).classList.add(clase)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}