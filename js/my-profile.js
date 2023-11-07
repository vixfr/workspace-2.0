document.addEventListener("DOMContentLoaded", () => {
    validaciones();
    mostrarImagen();
});

function validaciones() {
    const form = document.getElementById("form");
    const datos = document.querySelectorAll(".data");
    const imagenPrevia = document.getElementById('imagenUsuario');
    imagenPrevia.src = localStorage.getItem('imagenUsuarioSrc');
    let datosObtenidos = JSON.parse(localStorage.getItem('datosUsuario'));
    datos.forEach((input, index) => {
        if (index === 4) {
            input.value = localStorage.getItem('user');
        } else {
            input.value = datosObtenidos[index];
        }
    })
    
    form.addEventListener("submit", (event) => {
        localStorage.setItem('imagenUsuarioSrc', imagenPrevia.src)
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } 
        let datosStorage = [];
        datos.forEach((dato) => {
            datosStorage.push(dato.value);
        })
        
        localStorage.setItem('datosUsuario',JSON.stringify(datosStorage));
        event.preventDefault();
        console.log(localStorage.getItem('datosUsuario'));
        form.classList.add("was-validated");

    })
}

function mostrarImagen() {
    const fileInput = document.getElementById('fotoPerfil');
    const imagenPrevia = document.getElementById('imagenUsuario');

    const archivo = fileInput.files[0]; // Obtener el archivo seleccionado

    if (archivo) {
        const lector = new FileReader(); // Crear un lector de archivos

        lector.onload = function (event) {
            imagenPrevia.src = event.target.result; // Mostrar la imagen en el elemento <img>
        }
        lector.readAsDataURL(archivo); // Leer el archivo como una URL de datos


    } else {
        imagenPrevia.src = './img/usuarioDefecto.webp'; // Limpiar la imagen si no se selecciona ningún archivo
    }
}
