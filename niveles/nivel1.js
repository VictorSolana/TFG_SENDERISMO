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
        const response = await fetch("http://localhost:8000/api/rutas/");
        const data = await response.json();

        data.forEach(async (nivel) => {
            console.log();

            if (nivel.FK_IdNivel == id) {
                let nivelescontainer = document.getElementById("niveles-container");
                let div = document.createElement("div");
                let p = document.createElement("p");
                let pNombre = document.createElement("p");
                let pDescripcion = document.createElement("p");
                let pFecha = document.createElement("p");
                let pHora = document.createElement("p");
                let pTiempo = document.createElement("p");
                let idUsuario = nivel.FK_IdUsuario;
                let strong = document.createElement("strong");

                p.innerHTML = nivel.FK_IdNivel;
                strong.innerHTML = nivel.Nombre;

                let nombre = await getNombreUsuario(nivel.FK_IdUsuario);
                pNombre.innerHTML = nombre;

                // Agregar descripción, fecha, hora y tiempo
                pDescripcion.innerHTML = nivel.Descripcion;
                pFecha.innerHTML = nivel.Fecha;
                pHora.innerHTML = nivel.Hora;
                pTiempo.innerHTML = nivel.Tiempo;

                console.log(pNombre);

                // estilos

                // ...

                div.style.border = "1px solid #ccc";
                div.style.padding = "10px";
                div.style.marginBottom = "10px";
                div.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                div.style.display = "inline-block";
                div.style.width = "300px";
                div.style.borderRadius = "4px";
                div.style.textAlign = "center";

                p.style.fontWeight = "bold";
                p.style.fontSize = "18px";
                p.innerHTML = nivel.FK_IdNivel;

                strong.innerHTML = nivel.Nombre;
                strong.style.color = "blue";
                strong.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
                strong.style.fontSize = "16px";

                pNombre.style.fontStyle = "italic";
                pNombre.style.color = "green";
                pNombre.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
                pNombre.style.fontSize = "14px";

                // ...




                pNombre.innerHTML = nombre;

                div.append(pNombre);
                div.append(pDescripcion);
                div.append(pFecha);
                div.append(pHora);
                div.append(pTiempo);
                div.append(strong);
                div.append(p);
                nivelescontainer.append(div);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
