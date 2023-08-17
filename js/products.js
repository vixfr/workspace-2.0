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

<<<<<<< Updated upstream
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
=======
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
>>>>>>> Stashed changes

    const descripcionP = document.createElement('p');
    descripcionP.textContent = descripcion;
    descripcionP.id="descripcion"
    divProducto.appendChild(descripcionP);

<<<<<<< Updated upstream

    const cantVendidosP = document.createElement('p');
    cantVendidosP.textContent = `Vendidos: ${cantVendidos}`;
    divProducto.appendChild(cantVendidosP);

    container.appendChild(divProducto);
};
=======
      const soldCount = document.createElement('p');
      soldCount.textContent = `Vendidos: ${product.soldCount}`;
      productDiv.appendChild(soldCount);
     soldCount.classList.add('vendidos')


      const description = document.createElement('p');
      description.textContent = product.description;
      // productDiv.appendChild(description);
      info.appendChild(description);

      cartContainer.appendChild(productDiv);
     
    });
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
  });
>>>>>>> Stashed changes
