window.onload = function () {
    fetch("http://127.0.0.1:8000/api/tipos")
      .then(response => response.json())
      .then(data => {
        data.forEach(tipo => {
          let tabla = document.getElementById("tipo");
          let tr = document.createElement("tr");
          let tdTipo = document.createElement("td");
          let tdInformacion = document.createElement("td");
          let tdEnlace = document.createElement("td");
          let tdBotonBorrado = document.createElement("td");
          let enlace = document.createElement("a");
          let botonEliminar = document.createElement("button");
  
          enlace.innerHTML = "Enlace";
          enlace.setAttribute("href", "/tipo/" + tipo.Id + ".html");
          enlace.className = "numero";
          enlace.id = tipo.Id;
  
          botonEliminar.setAttribute("id", tipo.Id);
          botonEliminar.innerHTML = "Eliminar";
          botonEliminar.className = "botonEliminar";

          botonEliminar.setAttribute("id", tipo.Id);
  
          let tipo2 = tipo.Tipo;
          let descripcion = tipo.Descripcion;
          tdTipo.append(tipo2);
          tdInformacion.append(descripcion);
          tdEnlace.append(enlace);
          tdBotonBorrado.append(botonEliminar);
          tr.append(tdTipo);
          tr.append(tdInformacion);
          tr.append(tdEnlace);
          tr.append(tdBotonBorrado);
          tdEnlace.append(enlace);
  
          tabla.append(tr);
        });
        eliminarTipo_();
       // editarTipo_();
      });

   
    function eliminarTipo_() {
       let botonesEliminar = document.getElementsByClassName("botonEliminar");
         for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", function () {
            let id = botonesEliminar[i].id;
            console.log(id);
            eliminarTipo(id);
           
         });

      /*   function editarTipo_(id) {
            let botonesEditar = document.getElementsByClassName("botonEditar");
            for (let i = 0; i < botonesEditar.length; i++) {
              botonesEditar[i].addEventListener("click", function () {
                let id = botonesEditar[i].id;
                console.log(id);
                editarTipo(id);
              });
            }
          }
          */
          function editarTipo(id) {
            // your code to edit the item with the given id goes here
          }
          function eliminarTipo(id) {
            // your code to delete the item with the given id goes here
            fetch("http://127.0.0.1:8000/api/tipos/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
             }}).then(response => response.json()).then(data => {    
                console.log(data);
                location.reload();
                
          }).catch(error => console.error(error));
  }}
}

 
}