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

export const onFocus=(event,clase,clase2,id)=>{
    if(event.target.classList.contains(clase)){
        event.target.classList.remove(clase)
        document.getElementById(id).classList.remove(clase2)
    }
}

export const handleClick=(form,setErrorInicial,setCampoObligatorio,campoObligatorio,clase,clase2)=>{
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
    }
    console.log(cambioCampo)
}

const handleClickHelp = async(id,id2,clase,clase2,setCampoObligatorio)=>{
    await setCampoObligatorio(true)
    if(id==="provincia"){
        await document.getElementById(id).classList.add(clase)
        await document.getElementById(id2).classList.add(clase2)
    }else{
        await document.getElementById(id).classList.add(clase)
        await document.getElementById(id2).classList.add(clase2)
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}