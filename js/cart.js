document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tbody");

  // Obtén el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para mostrar los productos en el carrito
  const mostrarCarrito = () => {
    tbody.innerHTML = ""; // Limpia el contenedor actual

    // Itera a través del arreglo de IDs de productos en el carrito
    carrito.forEach((producto, index) => {
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
      const cantidadInput = document.createElement("input");
      cantidadInput.className = "form-control form-control-color";
      cantidadInput.type = "number";
      cantidadInput.id = `cantidad${index}`; // Agrega un ID único para el input
      cantidadInput.addEventListener("input", actualizarSubtotal); // Agrega un evento input
      cantidadProducto.appendChild(cantidadInput);
      filaProducto.appendChild(cantidadProducto);

      const subTotal = document.createElement("td");
      subTotal.innerHTML = `<p id="subtotal${index}">subtotal</p>`;
      filaProducto.appendChild(subTotal);

      const eliminarProducto = document.createElement("td"); // Agregar columna para el botón Eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => eliminarProductoDelCarrito(index)); // Agregar evento para eliminar
      eliminarProducto.appendChild(botonEliminar);
      filaProducto.appendChild(eliminarProducto);

      tbody.appendChild(filaProducto);
    });
  };

  // Función para actualizar el subtotal cuando se cambia la cantidad
  const actualizarSubtotal = (event) => {
    const index = event.target.id.replace("cantidad", ""); // Obtiene el índice de la fila
    const cantidad = event.target.value;
    const costo = carrito[index].cost;
    const subtotal = cantidad * costo;
    document.getElementById(`subtotal${index}`).textContent = subtotal;
  };

  // Función para eliminar un producto del carrito
  const eliminarProductoDelCarrito = (index) => {
    carrito.splice(index, 1); // Elimina el producto del array
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el localStorage
    mostrarCarrito(); // Vuelve a mostrar el carrito actualizado
  };

  // Llama a la función para mostrar el carrito cuando se carga la página
  mostrarCarrito();
});
