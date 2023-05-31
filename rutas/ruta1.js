window.onload = async function () {
    // Obtener el parámetro 'id' de la URL
    let url = window.location.search;
    let url2 = new URLSearchParams(url);
    let id = url2.get("id");
    console.log(id);

    // Función para obtener el nombre de usuario por ID
    async function getNombreUsuario(id) {
        const response = await fetch("http://localhost:8000/api/usuarios/" + id);
        const data = await response.json();
        let nombre = data.nombre;
        let primerapellido = data.primerapellido;
        let segundoapellido = data.segundoapellido;

        let nombreCompleto = nombre + " " + primerapellido + " " + segundoapellido;
        console.log(id + nombreCompleto);
        return data.nombre;
    }

    // Función para obtener los comentarios y mostrarlos en la tabla
    async function getComentarios(id) {
        fetch("http://localhost:8000/api/comentarios").then(response => response.json()).then(data => {
            data.forEach(async comentario => {
                if (comentario.FK_IdRuta == id) {
                    let tabla = document.getElementById("comentarios");
                    let trTabla = document.createElement("tr");
                    let tdFechaHora = document.createElement("td");
                    let tdIdUsuario = document.createElement("td");
                    let tdIdRuta = document.createElement("td");
                    let tdPuntuacion = document.createElement("td");
                    let tdDescripcion = document.createElement("td");

                    let fechaHora = comentario.Fechahoracomentario;
                    let usuario = comentario.FK_IdUsuario;
                    let getNombreUsuario1 = await getNombreUsuario(usuario);

                    let ruta = "nivel: "+ comentario.FK_IdRuta;
                    let puntuacion = comentario.Puntuacion;
                    let descripcion = comentario.Descripcion;

                    tdFechaHora.append(fechaHora);
                    tdIdUsuario.append(getNombreUsuario1);
                    tdIdRuta.append(ruta);
                    tdPuntuacion.append(puntuacion);
                    tdDescripcion.append(descripcion);

                    trTabla.append(tdFechaHora);
                    trTabla.append(tdIdUsuario);
                    trTabla.append(tdIdRuta);
                    trTabla.append(tdPuntuacion);
                    trTabla.append(tdDescripcion);
                    tabla.append(trTabla);
                }
            });
        })
    }

    try {
        // Obtener la información de la ruta por ID
        const response = await fetch("http://localhost:8000/api/rutas/" + id);
        const ruta = await response.json();

        let rutasContainer = document.getElementById("rutas-container");
        let div = document.createElement("div");
        let pNombre = document.createElement("p");
        let pDescripcion = document.createElement("p");
        let pFecha = document.createElement("p");
        let pHora = document.createElement("p");
        let strong = document.createElement("strong");

        strong.innerHTML = ruta.Nombre;

        // Obtener el nombre de usuario de forma asíncrona
        let nombre = await getNombreUsuario(ruta.FK_IdUsuario);

        pNombre.innerHTML = "Autor de la ruta: " + nombre;
        pDescripcion.innerHTML = ruta.Descripcion;
        pFecha.innerHTML = ruta.Fecha;
        pHora.innerHTML = ruta.Hora;

     

        div.append(pNombre);
        div.append(strong);
        div.append(pDescripcion);
        div.append(pFecha);
        div.append(pHora);
        rutasContainer.append(div);

        // Obtener y mostrar los comentarios en la tabla
        getComentarios(id);
    } catch (error) {
        console.error(error);
    }
};
