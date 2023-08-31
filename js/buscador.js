document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    const contenedor = document.getElementById("contenedor");
    buscador.addEventListener("click", () => {
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    })
})