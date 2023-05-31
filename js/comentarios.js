window.onload = function () {

    fetch("http://127.0.0.1:8000/api/comentarios").then(response => response.json()).then(comentario => {
        comentario.forEach(comentario => {

            let comentarios = document.getElementById("comentarios");
            let tr = document.createElement("tr");
            let tdFK_Usuario = document.createElement("td");
            let tdFK_IdRuta = document.createElement("td");
            let tdFechaHoraComentario = document.createElement("td");
            let tdDescripcion = document.createElement("td");
            let tdPuntuacion = document.createElement("td");
            let tdEnlace = document.createElement("td");
            let tdBotonBorrado = document.createElement("td");


            let enlace = document.createElement("a");
            enlace.innerHTML = "Enlace";
            enlace.className = "comentarios";
            enlace.setAttribute("href", "/comentarios/comentario1.html?id=" + comentario.Id);
            console.log(comentario.Id);
            tdEnlace.append(enlace);

            let botonEliminar = document.createElement("button");
            botonEliminar.innerHTML="Eliminar";
            botonEliminar.id=comentario.Id;
            botonEliminar.className="botonEliminar";

            tdFK_Usuario.innerHTML = comentario.FK_IdUsuario;
            tdFK_IdRuta.innerHTML = comentario.FK_IdRuta;
            tdFechaHoraComentario.innerHTML = comentario.Fechahoracomentario;
            tdDescripcion.innerHTML = comentario.Descripcion;
            tdPuntuacion.innerHTML = comentario.Puntuacion;

            tdBotonBorrado.append(botonEliminar);


            tr.append(tdFK_Usuario);
            tr.append(tdFK_IdRuta);
            tr.append(tdFechaHoraComentario);
            tr.append(tdDescripcion);
            tr.append(tdPuntuacion);
            tr.append(tdEnlace);
            tr.append(tdBotonBorrado)

            comentarios.append(tr);

        });
    })
}