const datosAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

document.addEventListener('DOMContentLoaded', () => {
    fetch(datosAutos)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (modeloAuto of data.products) {
                mostrarProducto(modeloAuto.image, modeloAuto.name, modeloAuto.cost, modeloAuto.description, modeloAuto.soldCount, "USD");
            }
        });
});
function mostrarProducto(urlImagen, nombre, precio, descripcion, cantVendidos, simboloMoneda) {
    const container = document.getElementById("pb-5-container");

    const divProducto = document.createElement('div');
    divProducto.classList.add("contProducto");

    const imagen = document.createElement('img');
    imagen.src = urlImagen;
    imagen.classList.add("imgProducto");
    divProducto.appendChild(imagen);

    const nombreP = document.createElement('h2');
    nombreP.textContent = nombre;
    divProducto.appendChild(nombreP);

    const descripcionP = document.createElement('p');
    descripcionP.textContent = descripcion;
    divProducto.appendChild(descripcionP);

    const precioP = document.createElement('p');
    precioP.textContent = `${simboloMoneda} ${precio}`;
    precioP.classList.add("precioProducto");
    divProducto.appendChild(precioP);

    const cantVendidosP = document.createElement('p');
    cantVendidosP.textContent = `Vendidos: ${cantVendidos}`;
    divProducto.appendChild(cantVendidosP);

    container.appendChild(divProducto);
};