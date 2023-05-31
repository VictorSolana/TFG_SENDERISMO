window.onload=function(){
  const form = document.getElementById('comentarios-form');
  let btnEnviar = document.getElementById("btnEnviar");     
  //OBTENER USUARIOS
fetch("http://127.0.0.1:8000/api/usuarios").then(response=>response.json()).then(data=>{
   data.forEach(usuario => {
    let select =document.getElementById("usuario");
    let id = usuario.id;

    let option = document.createElement("option");
    option.value=id;
    option.innerHTML=id;
    
    select.append(option);

   });
})

  //OBTENER RESEÑAS
fetch("http://127.0.0.1:8000/api/rutas").then(response=>response.json()).then(data=>{
  data.forEach(ruta=>{
    let select = document.getElementById("ruta");

    let option = document.createElement("option");
    option.value=ruta.Id;
    option.innerHTML=ruta.Id;

    select.append(option);
  })
})

  btnEnviar.addEventListener('click', function(event) {
    // Prevenimos el envío del formulario
   //  event.preventDefault();

    // Obtenemos los valores de los campos
    const usuario = document.getElementById('usuario').value;
    const ruta = document.getElementById('ruta').value;
    const fecha = document.getElementById('FechaHoraComentario').value;
    const descripcion = document.getElementById('Descripcion').value;
    const puntuacion = document.getElementById('Puntuacion').value;

    // Validamos que los campos no estén vacíos

    let usuarioerror = false;
    let rutaerror = false;
    let fechaerror = false;
    let descripcionerror = false;
    let puntuacionerror = false;

    if (usuario.trim() === '') {
      alert('Por favor, ingresa el usuario');
      usuarioerror = true;
      return;
    }

    if (ruta.trim() === '') {
      alert('Por favor, ingresa la ruta');
      rutaerror = true;
      return;
    }

    if (fecha.trim() === '') {
      alert('Por favor, ingresa la fecha y hora del comentario');
      fechaerror = true;
      return;
    }

    if (descripcion.trim() === '') {
      alert('Por favor, ingresa la descripción del comentario');
      descripcionerror = true;
      return;
    }

    if (puntuacion.trim() === '') {
      alert('Por favor, ingresa la puntuación');
      puntuacionerror = true;
      return;
    }

    // Validamos que la puntuación sea un número entre 1 y 10
    const puntuacionNum = Number(puntuacion);
    if (isNaN(puntuacionNum) || puntuacionNum < 1 || puntuacionNum > 10) {
      alert('Por favor, ingresa una puntuación válida (entre 1 y 10)');
       puntuacionerror = true;
      return;
    }

    if(usuarioerror==false && rutaerror==false && fechaerror==false && descripcionerror==false && puntuacionerror==false){
     const formData = {
      FK_IdUsuario:usuario,
      FK_IdRuta:ruta,
      Fechahoracomentario:fecha,
      Descripcion:descripcion,
      Puntuacion:puntuacionNum,
     }
     console.log(formData);
      fetch("http://127.0.0.1:8000/api/comentarios",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body:JSON.stringify(formData)
        }).then(response=>response.json()).then(data=>{
          console.log(data);
        }).catch(error=>console.log(error));
      }
    });
  }

    // Si las validaciones pasan, podemos enviar el formulario
