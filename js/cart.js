document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tbody");

  // Obtén el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para mostrar los productos en el carrito
  const mostrarCarrito = () => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Limpia el contenedor actual

    // Itera a través del arreglo de IDs de productos en el carrito
    carrito.forEach((producto) => {
      // Crea elementos HTML para mostrar los detalles del producto y agrégalos a tbody
      const filaProducto = document.createElement("tr");

      const imagenProducto = document.createElement("td");
      const imagen = document.createElement("img");
      imagen.src = producto.images[0];
      imagenProducto.appendChild(imagen);
      filaProducto.appendChild(imagenProducto);

      const nombreProducto = document.createElement("td");
      nombreProducto.textContent = producto.name;
      filaProducto.appendChild(nombreProducto);

      const costoProducto = document.createElement("td");
      costoProducto.textContent = producto.cost;
      filaProducto.appendChild(costoProducto);

      const cantidadProducto = document.createElement("td");
      cantidadProducto.innerHTML =
        '<input class="form-control form-control-color" type="number"  />';
      filaProducto.appendChild(cantidadProducto);

      const subTotal = document.createElement("td");
      subTotal.innerHTML = "<p>subtotal</p>";
      filaProducto.appendChild(subTotal);

      tbody.appendChild(filaProducto);
    });
  };

  // Llama a la función para mostrar el carrito cuando se carga la página
  mostrarCarrito();
  //Asegúrate de que obtenerProductoData() en product-info.js devuelva el objeto productoData correspondiente al producto que se está agregando al carrito. También, adapta el código según los detalles específicos que desees mostrar para cada producto en el carrito.
});
