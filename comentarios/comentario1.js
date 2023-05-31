window.onload = async function () {
  let url = window.location.search;
  let url2 = new URLSearchParams(url);
  let id = url2.get("id");
  console.log(id);

  async function getNombreUsuario(id) {
      const response = await fetch("http://localhost:8000/api/usuarios/" + id);
      const data = await response.json();
      let nombre = data.nombre;
      let primerapellido = data.primerapellido;
      let segundoapellido = data.segundoapellido;

      let nombreCompleto = nombre + " " + primerapellido + " " + segundoapellido;
      console.log(id + nombreCompleto);
      return nombreCompleto;
  }

  try {
      const response = await fetch("http://localhost:8000/api/comentarios/");
      const data = await response.json();

      data.forEach(async (comentarios) => {
          console.log();

          if (comentarios.FK_IdRuta == id) {
              let comentariosContainer = document.getElementById("comentarios-container");
              let div = document.createElement("div");
              let pDescripcion = document.createElement("p");
              let pPuntuacion = document.createElement("p");
              let pFechahora = document.createElement("p");

              let strong = document.createElement("strong");

              let idUsuario = await getNombreUsuario(comentarios.FK_IdUsuario);
              let usu= document.createElement("p");
              usu.innerHTML=idUsuario;
              pDescripcion.innerHTML = comentarios.Descripcion;
              pPuntuacion.innerHTML = "puntuacion: "+comentarios.Puntuacion;
              pFechahora.innerHTML = comentarios.Fechahoracomentario;
              
              let nombre = await getNombreUsuario(comentarios.FK_IdUsuario);


              console.log(pDescripcion);

              // Estilos
              div.style.border = "1px solid #ccc";
              div.style.padding = "10px";
              div.style.marginBottom = "10px";
              div.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
              div.style.display = "inline-block";
              div.style.width = "300px";
              div.style.borderRadius = "4px";
              div.style.textAlign = "center";

              pDescripcion.style.fontWeight = "bold";
              pDescripcion.style.fontSize = "16px";

              pPuntuacion.style.color = "blue";
              pPuntuacion.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
              pPuntuacion.style.fontSize = "14px";

              strong.style.fontStyle = "italic";
              strong.style.color = "green";
              strong.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
              strong.style.fontSize = "12px";

             /* pFechaHora.style.fontStyle = "italic";
              pFechaHora.style.color = "green";
              pFechaHora.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
              pFechaHora.style.fontSize = "12px";
*/
              


              div.append(pDescripcion);
              div.append(pPuntuacion);
              div.append(strong);
              //div.append(pFechaHora);
              comentariosContainer.append(div);
              div.append(usu);
          }
      });
  } catch (error) {
      console.error(error);
  }
};
