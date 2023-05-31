window.onload = function () {
    // Obtener la referencia a la tabla
    let tabla = document.getElementById("ruta");

    // Obtener todas las rutas desde la API
    fetch("http://127.0.0.1:8000/api/rutas")
        .then(response => response.json())
        .then(data => {
            data.forEach(ruta => {
                let tr = document.createElement("tr");
                let tdNombre = document.createElement("td");
                let tdDescripcion = document.createElement("td");
                let tdFecha = document.createElement("td");
                let tdHora = document.createElement("td");
                let tdKilometros = document.createElement("td");
                let tdTiempo = document.createElement("td");
                let tdMapa = document.createElement("td");
                let tdInformacion = document.createElement("td");
                let tdEliminar = document.createElement("td");

                let iframe = document.createElement("iframe");
                let botonEliminar = document.createElement("button");

                let a = document.createElement("a");
                a.setAttribute("href", `../rutas/ruta1.html?id=${ruta.Id}`);
                a.innerHTML = "Enlace";
                a.className = "numero";
                a.id = ruta.Id;

                botonEliminar.innerHTML = "Eliminar";
                botonEliminar.id = ruta.Id;
                botonEliminar.className = "botonEliminar";

                tdInformacion.append(a);
                tdEliminar.append(botonEliminar);

                tdNombre.innerHTML = ruta.Nombre;
                tdDescripcion.innerHTML = ruta.Descripcion;
                tdFecha.innerHTML = ruta.Fecha;
                tdHora.innerHTML = ruta.Hora;
                tdKilometros.innerHTML = ruta.Kilometros;
                tdTiempo.innerHTML = ruta.Tiempo;
                iframe.src = ruta.Url;
                iframe.width = "300";
                iframe.height = "300";
                iframe.loading = "lazy";

                tdMapa.append(iframe);

                tr.append(tdNombre);
                tr.append(tdDescripcion);
                tr.append(tdFecha);
                tr.append(tdHora);
                tr.append(tdKilometros);
                tr.append(tdTiempo);
                tr.append(tdMapa);
                tr.append(tdInformacion);
                tr.append(tdEliminar);
                tabla.append(tr);
            });
            botones();
        })
        .catch(error => console.error(error));

    function botones() {
        let botonEliminar = document.getElementsByClassName("botonEliminar");
        for (var i = 0; i < botonEliminar.length; i++) {
            botonEliminar[i].addEventListener("click", function () {
                let getId = this.id;
                borrar(getId);
            });
        }
    }

    function borrar(idRuta) {
        const url = `http://127.0.0.1:8000/api/rutas/${idRuta}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    console.log(`Ruta ${idRuta} eliminada correctamente.`);
                    location.reload();
                } else {
                    console.log(
                        `Hubo un error al eliminar la ruta ${idRuta}: ${response.status} ${response.statusText}`
                    );
                }
            })
            .catch(error => {
                console.log(`Hubo un error al eliminar la ruta ${idRuta}: ${error}`);
            });
    }
};
