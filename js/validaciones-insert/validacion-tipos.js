window.onload = function () {
  const form = document.getElementById('miFormulario');
  const tipo = document.getElementById('tipo');
  const descripcion = document.getElementById('descripcion');
  let boton = document.getElementById('btnEnviar');

  let tipoValido = false;
  let descripcionValida = false;

  // Validación del campo "tipo" al presionar una tecla
  tipo.addEventListener('keypress', function () {
    if (tipo.value.trim().length < 2 || tipo.value.trim().length > 50) {
      tipo.style.border = '3px solid red';
      tipo.style.outlineColor = 'red';
      tipo.focus();
      return;
    } else {
      tipoValido = true;
      tipo.style.border = '3px solid';
      tipo.style.outlineColor = 'green';
    }
  });

  // Validación del campo "descripcion" al presionar una tecla
  descripcion.addEventListener('keypress', function () {
    if (descripcion.value.trim().length < 2 || descripcion.value.trim().length > 50) {
      descripcion.style.border = '3px solid red';
      descripcion.style.outlineColor = 'red';
      descripcion.focus();
      return;
    } else {
      descripcionValida = true;
      descripcion.style.border = '3px solid';
      descripcion.style.outlineColor = 'green';
    }
  });

  // Acción al hacer clic en el botón "Enviar"
  boton.addEventListener('click', function () {
    // Verificar si los campos "tipo" y "descripcion" son válidos
    if (tipoValido == true && descripcionValida == true) {
      // Crear un objeto con los datos del formulario
      const formData = {
        tipo: tipo.value.trim(),
        descripcion: descripcion.value.trim(),
      };

      // Enviar los datos del formulario a través de una petición POST utilizando fetch
      fetch('http://127.0.0.1:8000/api/tipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Registro creado:', data);
        })
        .catch(error => {
          console.error('Error al crear registro:', error);
        });
    };
  });
}
