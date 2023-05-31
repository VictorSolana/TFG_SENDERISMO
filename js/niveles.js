window.onload = function () {
    function tablaNiveles() {
      fetch("http://127.0.0.1:8000/api/niveles")
        .then((response) => response.json())
        .then((nivel) => {
          nivel.forEach((data) => {
            let tabla = document.getElementById("niveles");
            let tr = document.createElement("tr");
            let tdColor = document.createElement("td");
            let tdTipo = document.createElement("td");
            let tdInformacion = document.createElement("td");
  
            let color = data.Color;
            let tipo = data.Tipo;
  
            tdColor.append(color);
            tdTipo.append(tipo);
  
            tr.append(tdColor);
            tr.append(tdTipo);
            tr.append(tdInformacion);
            tabla.append(tr);
          });
        });
    }
  
    function getIDNivel(id) {
      return fetch("http://127.0.0.1:8000/api/niveles/" + id)
        .then((response) => response.json())
        .then((data) => {
          let idNiv = data.Id;
          return idNiv;
        });
    }
  
    let select = document.getElementById("color-select");
    select.addEventListener("change", function () {
      fetch("http://127.0.0.1:8000/api/rutas")
        .then((response) => response.json())
        .then(async (rutas) => {
          let selectedNiveles = rutas.filter(
            (ruta) => ruta.FK_IdNivel == select.value
          );
  
          let rutasContainer = document.getElementById("ruta-container");
          rutasContainer.innerHTML = "";
  
          selectedNiveles.forEach((ruta) => {
            let tr = document.createElement("tr");
            let tdNombre = document.createElement("td");
            let tdDescripcion = document.createElement("td");
            let tdFecha = document.createElement("td");
            let tdHora = document.createElement("td");
            let tdKilometros = document.createElement("td");
            let tdTiempo = document.createElement("td");
  
            tdNombre.innerHTML = ruta.Nombre;
            tdDescripcion.innerHTML = ruta.Descripcion;
            tdFecha.innerHTML = ruta.Fecha;
            tdHora.innerHTML = ruta.Hora;
            tdKilometros.innerHTML = ruta.Kilometros;
            tdTiempo.innerHTML = ruta.Tiempo;
  
            tr.append(tdNombre);
            tr.append(tdDescripcion);
            tr.append(tdFecha);
            tr.append(tdHora);
            tr.append(tdKilometros);
            tr.append(tdTiempo);
            
            rutasContainer.append(tr);
          });
        });
    });
  
    function selectNiveles() {
      fetch("http://127.0.0.1:8000/api/niveles")
        .then((response) => response.json())
        .then((niveles) => {
          niveles.forEach((nivel) => {
            let option = document.createElement("option");
            option.value = nivel.Id;
            option.innerHTML = nivel.Color;
  
            select.append(option);
          });
        });
    }
  
    fetch("http://127.0.0.1:8000/api/rutas")
      .then((response) => response.json())
      .then(async (rutas) => {
        for (let i = 0; i < rutas.length; i++) {
          try {
            let FK_IDNivel = await getIDNivel(rutas[i].FK_IdNivel);
  
            // Resto del código...
            const delay = 10000;
            if (i < rutas.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
  
    tablaNiveles();
    selectNiveles();
  };
  