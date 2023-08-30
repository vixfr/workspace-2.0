const iDLocalStorage = localStorage.getItem("catID");
const datosProductos = "https://japceibal.github.io/emercado-api/cats_products/"+ iDLocalStorage +".json";

document.addEventListener('DOMContentLoaded', () => {
    fetch(datosProductos)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.products.length === 0) {
                const container = document.getElementById('pb-5-container');
                const avisoH2 = document.createElement('h2');
                avisoH2.id = "avisoNoProductos"
                avisoH2.textContent = "No hay productos para mostrar";
                container.appendChild(avisoH2);
            } else {
                for (producto of data.products) {
                    
                    mostrarProducto(producto.image, producto.name, producto.cost, producto.description, producto.soldCount, producto.currency);
                    
                }
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
    nombreP.classList.add("nombre");

    const precioP = document.createElement('p');
    precioP.textContent = `${simboloMoneda} ${precio}`;
    precioP.classList.add("precioProducto");
    divProducto.appendChild(precioP);

    const descripcionP = document.createElement('p');
    descripcionP.textContent = descripcion;
    descripcionP.id = "descripcion"
    divProducto.appendChild(descripcionP);


    const cantVendidosP = document.createElement('p');
    cantVendidosP.textContent = `Vendidos: ${cantVendidos}`;
    divProducto.appendChild(cantVendidosP);

    container.appendChild(divProducto);
};


document.addEventListener("DOMContentLoaded",()=>{
    const contenedor = document.getElementById("pb-5-container");
    const menorPrecio = document.getElementById("menorPrecio");
    const mayorPrecio = document.getElementById("mayorPrecio");
    const cantVendidos = document.getElementById("cantVendidos");



})