window.onload = function () {
    let formulario = document.getElementById("formulario");
    let btnEnviar = document.getElementById("btnEnviar");
    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("correo");
    let mensaje = document.getElementById("mensaje");

    btnEnviar.addEventListener("click", function (e) {
        let correovacio = false;
        let nombrevacio = false;
        let mensajevacio = false;

        if (nombre.value == "" || nombre.value.trim() == "" || nombre.value == null) {
            nombrevacio = true;
        }

        if (correo.value == "" || correo.value.trim() == "" || correo.value == null) {
            correovacio = true;
        }

        if (mensaje.value == "" || mensaje.value.trim() == "" || mensaje.value == null) {
            mensajevacio = true;
        }

        if (mensajevacio || correovacio || nombrevacio) {  
            alert("Algun campo está vacío");
        } else {
            let datos = {
                nombre: nombre.value,
                correo: correo.value,
                mensaje: mensaje.value
            };

            fetch("http://localhost:8000/api/contacto", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                mode: "cors",
                cache: "default"
            })
            .then(response => response.json())
            .then(data => {
                alert("Formulario enviado: " + JSON.stringify(data));
            });
        }
    });
}
