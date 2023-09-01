const iDLocalStorage = localStorage.getItem("catID");
const datosProductos =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  iDLocalStorage +
  ".json";

document.addEventListener("DOMContentLoaded", () => {
  fetch(datosProductos)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.products.length === 0) {
        const container = document.getElementById("contenedor");
        const avisoH2 = document.createElement("h2");
        avisoH2.id = "avisoNoProductos";
        avisoH2.textContent = "No hay productos para mostrar";
        container.appendChild(avisoH2);
      } else {
        for (producto of data.products) {
          mostrarProducto(
            producto.image,
            producto.name,
            producto.cost,
            producto.description,
            producto.soldCount,
            producto.currency
          );
        }
      }
    });
});
function mostrarProducto(
  urlImagen,
  nombre,
  precio,
  descripcion,
  cantVendidos,
  simboloMoneda
) {
  const container = document.getElementById("contenedor");

  const divProducto = document.createElement("div");
  divProducto.classList.add("contProducto");

  const imagen = document.createElement("img");
  imagen.src = urlImagen;
  imagen.classList.add("imgProducto");
  divProducto.appendChild(imagen);

  const nombreP = document.createElement("h2");
  nombreP.textContent = nombre;
  divProducto.appendChild(nombreP);
  nombreP.classList.add("nombre");

  const precioP = document.createElement("p");
  precioP.textContent = `${simboloMoneda} ${precio}`;
  precioP.classList.add("precioProducto");
  divProducto.appendChild(precioP);

  const descripcionP = document.createElement("p");
  descripcionP.textContent = descripcion;
  descripcionP.id = "descripcion";
  divProducto.appendChild(descripcionP);

  const cantVendidosP = document.createElement("p");
  cantVendidosP.textContent = `Vendidos: ${cantVendidos}`;
  divProducto.appendChild(cantVendidosP);

  container.appendChild(divProducto);
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor");
  const menorPrecio = document.getElementById("menorPrecio");
  const mayorPrecio = document.getElementById("mayorPrecio");
  const cantVendidos = document.getElementById("cantVendidos");
  const rangeFilterBtn = document.getElementById("rangeFilterCount");
  const clearRangeFilterBtn = document.getElementById("clearRangeFilter");

  mayorPrecio.addEventListener("click", () => {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

<<<<<<< HEAD
// Función para mostrar los productos en el contenedor
function mostrarProductos(productos) {
  contenedor.innerHTML = "";
  productos.forEach((producto) => {
    mostrarProducto(
      producto.image,
      producto.name,
      producto.cost,
      producto.description,
      producto.soldCount,
      producto.currency
    );
  });
}

// Manejadores de eventos para los botones de filtro por precio
mayorPrecio.addEventListener("click", () => {
  if (dataProductos) {
    const sortedData = [...dataProductos.products].sort(
      (a, b) => b.cost - a.cost
    );
    mostrarProductos(sortedData);
  }
});

menorPrecio.addEventListener("click", () => {
  if (dataProductos) {
    const sortedData = [...dataProductos.products].sort(
      (a, b) => a.cost - b.cost
    );
    mostrarProductos(sortedData);
  }
});

cantVendidos.addEventListener("click", () => {
  if (dataProductos) {
    const sortedData = [...dataProductos.products].sort(
      (a, b) => b.soldCount - a.soldCount
    );
    mostrarProductos(sortedData);
  }
});

// Manejador de eventos para el botón de filtrar por rango de precio
rangeFilterBtn.addEventListener("click", () => {
  if (dataProductos) {
    const minPrice = parseFloat(rangeFilterCountMin.value);
    const maxPrice = parseFloat(rangeFilterCountMax.value);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      const filteredData = dataProductos.products.filter((producto) => {
        const productPrice = parseFloat(producto.cost);
        return productPrice >= minPrice && productPrice <= maxPrice;
=======
    fetch(datosProductos)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products.length === 0) {
          const container = document.getElementById("contenedor");
          const avisoH2 = document.createElement("h2");
          avisoH2.id = "avisoNoProductos";
          avisoH2.textContent = "No hay productos para mostrar";
          container.appendChild(avisoH2);
        } else {
          for (producto of data.products.sort((a, b) => b.cost - a.cost)) {
            mostrarProducto(
              producto.image,
              producto.name,
              producto.cost,
              producto.description,
              producto.soldCount,
              producto.currency
            );
          }
        }
>>>>>>> 56626fe2fd07d6d2e439a3fd07917beea06859aa
      });
  });
  menorPrecio.addEventListener("click", () => {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    fetch(datosProductos)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products.length === 0) {
          const container = document.getElementById("contenedor");
          const avisoH2 = document.createElement("h2");
          avisoH2.id = "avisoNoProductos";
          avisoH2.textContent = "No hay productos para mostrar";
          container.appendChild(avisoH2);
        } else {
          for (producto of data.products.sort((a, b) => a.cost - b.cost)) {
            mostrarProducto(
              producto.image,
              producto.name,
              producto.cost,
              producto.description,
              producto.soldCount,
              producto.currency
            );
          }
        }
      });
  });
  cantVendidos.addEventListener("click", () => {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    fetch(datosProductos)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products.length === 0) {
          const container = document.getElementById("contenedor");
          const avisoH2 = document.createElement("h2");
          avisoH2.id = "avisoNoProductos";
          avisoH2.textContent = "No hay productos para mostrar";
          container.appendChild(avisoH2);
        } else {
          for (producto of data.products.sort(
            (a, b) => b.soldCount - a.soldCount
          )) {
            mostrarProducto(
              producto.image,
              producto.name,
              producto.cost,
              producto.description,
              producto.soldCount,
              producto.currency
            );
          }
        }
      });
  });

  rangeFilterBtn.addEventListener("click", () => {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    const minPrice = parseFloat(
      document.getElementById("rangeFilterCountMin").value
    );
    const maxPrice = parseFloat(
      document.getElementById("rangeFilterCountMax").value
    );

    fetch(datosProductos)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products.length === 0) {
          const container = document.getElementById("contenedor");
          const avisoH2 = document.createElement("h2");
          avisoH2.id = "avisoNoProductos";
          avisoH2.textContent = "No hay productos para mostrar";
          container.appendChild(avisoH2);
        } else {
          const filteredAndSortedProducts = data.products
            .filter((product) => {
              const productPrice = parseFloat(product.cost);
              return productPrice >= minPrice && productPrice <= maxPrice;
            })
            .sort((a, b) => a.cost - b.cost);
          for (const producto of filteredAndSortedProducts) {
            mostrarProducto(
              producto.image,
              producto.name,
              producto.cost,
              producto.description,
              producto.soldCount,
              producto.currency
            );
          }
        }
      });
  });

  clearRangeFilterBtn.addEventListener("click", () => {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
  });
});
