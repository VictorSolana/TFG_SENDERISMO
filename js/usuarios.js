window.onload=function(){

    fetch("http://127.0.0.1:8000/api/usuarios").then(response=>response.json()).then(data=>{
        data.forEach(usuario => {
           let usuarios = document.getElementById("usuarios");
           let tr = document.createElement("tr"); 
           let tdId = document.createElement("td");
           let tdNombre=document.createElement("td");
           let tdPrimerApellido = document.createElement("td");
           let tdSegundoApellido = document.createElement("td");
           let tdCorreo = document.createElement("td");
           let tdTelefono = document.createElement("td");

           tdId.innerHTML=usuario.id;
           tdNombre.innerHTML=usuario.nombre;
           tdPrimerApellido.innerHTML=usuario.primerapellido;
           tdSegundoApellido.innerHTML=usuario.segundoapellido;
           tdCorreo.innerHTML=usuario.correo;
           tdTelefono.innerHTML=usuario.telefono;


           tr.append(tdId);
           tr.append(tdNombre);
           tr.append(tdPrimerApellido);
           tr.append(tdSegundoApellido)
           tr.append(tdCorreo);
           tr.append(tdTelefono);

           usuarios.append(tr);

        });
    });
}
