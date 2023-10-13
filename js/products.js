
function setProductID(productId) {
  localStorage.setItem("productID", productId);
  window.location = "product-info.html";
}


let originalData; // Variable para almacenar los datos originales
let currentData; // Variable para mantener los datos actuales (filtrados o no)

// Función para mostrar los productos en el contenedor
function mostrarProductos(data) {
  const container = document.getElementById("contenedor");
  let htmlContentToAppend = "";

  if (data.products.length === 0) {
    htmlContentToAppend = `<h2 id="avisoNoProductos">No hay productos para mostrar</h2>`;
  } else {
    data.products.forEach((producto) => {
      htmlContentToAppend += `
        <div class="contProducto" onclick="setProductID(${producto.id})" >
          <img src="${producto.image}" class="imgProducto">
          <h2 class="nombre">${producto.name}</h2>
          <p class="precioProducto">${producto.currency} ${producto.cost}</p>
          <p id="descripcion">${producto.description}</p>
          <p>Vendidos: ${producto.soldCount}</p>
        </div>
      `;
     
  
    });

  }

  container.innerHTML = htmlContentToAppend;
}


// Evento para cargar los datos originales al principio
document.addEventListener("DOMContentLoaded", () => {
  const iDLocalStorage = localStorage.getItem("catID");
  const datosProductos =
    "https://japceibal.github.io/emercado-api/cats_products/" +
    iDLocalStorage +
    ".json";

  fetch(datosProductos)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      originalData = data; // Almacenar los datos originales
      currentData = { ...data }; // Crear una copia inicial
      mostrarProductos(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// Función para filtrar y ordenar productos según el precio (mayor a menor)
function filtrarPorMayorPrecio() {
  currentData.products.sort((a, b) => b.cost - a.cost);
  mostrarProductos(currentData);
}

// Función para filtrar y ordenar productos según el precio (menor a mayor)
function filtrarPorMenorPrecio() {
  currentData.products.sort((a, b) => a.cost - b.cost);
  mostrarProductos(currentData);
}

// Función para filtrar y ordenar productos por la cantidad vendida (mayor a menor)
function filtrarPorMasVendidos() {
  currentData.products.sort((a, b) => b.soldCount - a.soldCount);
  mostrarProductos(currentData);
}

// Función para filtrar productos según un rango de precio
function filtrarPorRangoPrecio() {
  const minPrice = parseFloat(
    document.getElementById("rangeFilterCountMin").value
  );
  const maxPrice = parseFloat(
    document.getElementById("rangeFilterCountMax").value
  );

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    const productosFiltrados = originalData.products.filter((producto) => {
      const costo = producto.cost;
      return costo >= minPrice && costo <= maxPrice;
    });

    // Actualizar la lista actual de productos solo si hay resultados del filtro
    currentData.products =
      productosFiltrados.length > 0
        ? productosFiltrados
        : originalData.products;

    mostrarProductos(currentData);
  }
}

// Función para limpiar el filtro y mostrar todos los productos originales
function limpiarFiltro() {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  // Restaurar la lista actual de productos a los datos originales
  currentData = { ...originalData };

  mostrarProductos(currentData);
}

// Eventos para los botones de filtro
document.addEventListener("DOMContentLoaded", () => {
  const mayorPrecio = document.getElementById("mayorPrecio");
  const menorPrecio = document.getElementById("menorPrecio");
  const cantVendidos = document.getElementById("cantVendidos");
  const rangeFilterCount = document.getElementById("rangeFilterCount");
  const clearRangeFilter = document.getElementById("clearRangeFilter");

  mayorPrecio.addEventListener("click", filtrarPorMayorPrecio);
  menorPrecio.addEventListener("click", filtrarPorMenorPrecio);
  cantVendidos.addEventListener("click", filtrarPorMasVendidos);
  rangeFilterCount.addEventListener("click", filtrarPorRangoPrecio);
  clearRangeFilter.addEventListener("click", limpiarFiltro);
});


