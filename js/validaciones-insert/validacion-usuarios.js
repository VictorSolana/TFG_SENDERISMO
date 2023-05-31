window.onload = function () {
    const form = document.getElementById('miFormulario');
    const nombre = document.getElementById('nombre');
    const primerApellido = document.getElementById('primer_apellido');
    const segundoApellido = document.getElementById('segundo_apellido');
    const correo = document.getElementById('correo');
    const contrasena = document.getElementById('contrasena');
    const telefono = document.getElementById('telefono');
    let btnEnviar = document.getElementById("btnEnviar");


    btnEnviar.addEventListener('click', function (event) {

        let nombreerror = false;
        let primerApellidoerror = false;
        let segundoApellidoerror = false;
        let correoerror = false;
        let contrasenaerror = false;
        let telefonoerror = false;

        if (nombre.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Nombre.');
            nombre.focus();
            nombreerror = true;
            return;
        }

        if (primerApellido.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Primer Apellido.');
            primerApellido.focus();
            primerApellidoerror = true;
            return;
        }

        if (segundoApellido.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Segundo Apellido.');
            segundoApellido.focus();
            segundoApellidoerror = true;
            return;
        }

        if (correo.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Correo.');
            correo.focus();
            correoerror = true;
            return;
        }

        if (contrasena.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Contraseña.');
            contrasena.focus();
            contrasenaerror = true;
            return;
        }

        if (telefono.value.trim() === '') {
            alert('Por favor, introduce un valor para el campo Teléfono.');
            telefono.focus();
            telefonoerror = true;
            return;
        }

        if (nombreerror == false && primerApellidoerror == false && segundoApellidoerror == false && correoerror == false && contrasenaerror == false && telefonoerror == false) {

            const formData = {
                nombre: nombre.value,
                primerapellido: primerApellido.value,
                segundoapellido: segundoApellido.value,
                correo: correo.value,
                contrasena: contrasena.value,
                telefono: telefono.value,
            }

            fetch("http://127.0.0.1:8000/api/usuarios", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json()).then(data => {
                console.log(data);

            }).catch(error => console.log(error));

        } else {
            alert("Error form");
            console.log("Nombre " + nombre.value);
            console.log("Primer Apellido " + primerApellido.value);
            console.log("Segfundo Apellido " + segundoApellido.value);
            console.log("Correo " + correo.value);

            console.log("Contraseña " + contrasena.value);
            console.log("Telefono:" +telefono.value);

        }
    })
};
