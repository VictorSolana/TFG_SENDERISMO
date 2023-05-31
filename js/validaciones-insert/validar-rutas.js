window.onload=function(){
 
    //SON SELECTS
    let usuarios = document.getElementById("usuario");
    let nivel = document.getElementById("nivel");
    let tipo = document.getElementById("tipo");
    let nombre = document.getElementById("nombre");
    let descripcionForm = document.getElementById("descripcion");
    let fecha = document.getElementById("fecha");
    let tiempo = document.getElementById("tiempo");
    let hora = document.getElementById("hora");
    let kilometros = document.getElementById("kilometros");
    let botonEnviar = document.getElementById("btnEnviar");

    fetch("http://127.0.0.1:8000/api/usuarios").then(response=>response.json()).then(data=>{
        data.forEach(idusu => {
            let option = document.createElement("option");
            option.value=idusu.id;
            option.innerHTML=idusu.id;
            usuarios.append(option);
        });
    });

    fetch("http://127.0.0.1:8000/api/niveles").then(response=>response.json()).then(data=>{
        data.forEach(idniv=>{
            let option = document.createElement("option");
            option.value=idniv.Id;
            option.innerHTML=idniv.Id;
            nivel.append(option);
        });
    });

    fetch("http://127.0.0.1:8000/api/tipos").then(response=>response.json()).then(data=>{
        data.forEach(idtip=>{
            let option = document.createElement("option");
            option.value=idtip.Id;
            option.innerHTML=idtip.Id;
            tipo.append(option);
        });
    });

    botonEnviar.addEventListener("click",function(event){
        const formData = {
           FK_IdUsuario : usuario.value,
           FK_IdNivel: nivel.value,
           FK_IdTipo: tipo.value,
           Nombre:nombre.value,
           Descripcion:descripcionForm.value,
           Tiempo:tiempo.value,
           Fecha:fecha.value,
           Hora:hora.value,
           Kilometros:kilometros.value
        }
        console.log(formData);

        fetch("http://127.0.0.1:8000/api/rutas",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
                body:JSON.stringify(formData)
        
        }).then(response=>console.log(response.json())).then(data=>console.log(data)).catch(error=>console.log(error));
    });

} // <-- added curly brace here
