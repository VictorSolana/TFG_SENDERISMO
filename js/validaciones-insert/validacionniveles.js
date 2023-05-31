window.onload=function(){
const form = document.querySelector('form');
const tipoInput = document.getElementById('tipo');
const colorInput = document.getElementById('color');

let btnEnviar = document.getElementById('btnEnviar');


btnEnviar.addEventListener('click', function (event) {
    //event.preventDefault();

    const tipo = tipoInput.value.trim();
    const color = colorInput.value.trim();
    let errorTipo = false;
    let errorColor = false;

    if (!/^[a-zA-Z0-9\s\-\,]*$/.test(tipo)) {
        alert('El campo "Tipo" solo permite letras, números, espacios, guiones y comas.');
        tipoInput.focus();
        errorTipo=true;
        return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(color)) {
        alert('El campo "Color" solo permite letras y números.');
        colorInput.focus();
        errorColor=true;
        return;
    }

    const formData={
        tipo:tipo,
        color:color
    }
    if(errorTipo==false && errorColor==false){
        fetch("http://127.0.0.1:8000/api/niveles",{
            method:'POST',
            headers:{
               'Content-Type':'application/json',
               'Access-Control-Allow-Origin':'*'
            },
            body:JSON.stringify(formData)
        }).then(response=>response.json()).then(data=>{
            console.log(data);
        }).catch(error=>console.log(error));
    }

})
};
