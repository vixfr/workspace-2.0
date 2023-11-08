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
    const fileInput = document.getElementById('fotoPerfil');

    form.addEventListener("submit", (event) => {
        //localStorage.setItem('imagenUsuarioSrc', imagenPrevia.src)
        // Guardar la URL de la imagen en el localStorage
        localStorage.setItem('imagenUsuarioSrc', imagenPrevia.src);
        if (fileInput.files.length === 0) {
            localStorage.setItem('imagenUsuarioSrc', './img/usuarioDefecto.webp');
            mostrarImagen()
        }
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        let datosStorage = [];
        datos.forEach((dato) => {
            datosStorage.push(dato.value);
        })

        localStorage.setItem('datosUsuario', JSON.stringify(datosStorage));
        event.preventDefault();
        console.log(localStorage.getItem('datosUsuario'));
        form.classList.add("was-validated");

    })
    datos.forEach((input, index) => {

        if (index === 4) {
            input.value = localStorage.getItem('user');
        } else {
            input.value = datosObtenidos[index];
        }
    })
}

function mostrarImagen() {
    const fileInput = document.getElementById('fotoPerfil');
    const imagenPrevia = document.getElementById('imagenUsuario');

    const archivo = fileInput.files[0]; // Obtener el archivo seleccionado
    imagenPrevia.src = localStorage.getItem('imagenUsuarioSrc')
    if (archivo) {
        const lector = new FileReader(); // Crear un lector de archivos

        lector.onload = function (event) {
            // Verifica si el archivo cargado es una imagen
            if (archivo.type.startsWith('image/')) {
                imagenPrevia.src = event.target.result; // Mostrar la imagen en el elemento <img>

                console.log(localStorage.getItem('imagenUsuarioSrc'));
            } else {
                console.log('El archivo seleccionado no es una imagen.');
            }
        }
        lector.readAsDataURL(archivo); // Leer el archivo como una URL de datos
    } 
       //localStorage.setItem('imagenUsuarioSrc', './img/usuarioDefecto.webp');
}

