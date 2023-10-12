document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tbody");
  const carritoDiv = document.getElementById("carrito-div");

  // Obtén el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let subtotales = []; //Arreglo para suma total a pagar
  let suma = 0;
  // Función para mostrar los productos en el carrito
  const mostrarCarrito = () => {
    tbody.innerHTML = ""; // Limpia el contenedor actual

    if (carrito.length > 0) {
      // El carrito tiene elementos, muestra el carrito
      carritoDiv.style.display = "block";

      // Itera a través del arreglo de IDs de productos en el carrito
      carrito.forEach((producto, index) => {
        // Crea elementos HTML para mostrar los detalles del producto y agrégalos a tbody
        const filaProducto = document.createElement("tr");
        filaProducto.classList.add("table")

        const imagenProducto = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.classList.add("col-sm-6","col-md-6")
        imagen.src = producto.images[0];
        imagenProducto.appendChild(imagen);
        filaProducto.appendChild(imagenProducto);

        const nombreProducto = document.createElement("td");
        nombreProducto.textContent = producto.name;
        filaProducto.appendChild(nombreProducto);

        const costoProducto = document.createElement("td");
        costoProducto.textContent = producto.currency + producto.cost;
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
        subTotal.innerHTML = `<p id="subtotal${index}"></p>`;
        filaProducto.appendChild(subTotal);

        const eliminarProducto = document.createElement("td"); // Agregar columna para el botón Eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () =>
          eliminarProductoDelCarrito(index)
        ); // Agregar evento para eliminar
        eliminarProducto.appendChild(botonEliminar);
        filaProducto.appendChild(eliminarProducto);

        tbody.appendChild(filaProducto);
      });
    } else {
      // El carrito está vacío, oculta el carrito
      carritoDiv.style.display = "none";
    }
  };

  let subtotal = 0;
  // Función para actualizar el subtotal cuando se cambia la cantidad
  const actualizarSubtotal = (event) => {
    const index = event.target.id.replace("cantidad", ""); // Obtiene el índice de la fila
    const cantidad = event.target.value;
    const costo = carrito[index].cost;
    subtotal = cantidad * costo;
    subtotales[index] = subtotal; //Almacena el subtotal en el arreglo creado arriba
    document.getElementById(`subtotal${index}`).textContent = subtotal;

    //suma total de precios
    suma = subtotales.reduce((total, subtotal) => total + subtotal, 0);
    //mostrar total a pagar:
    totalApagar.textContent = suma;
  };

  // Función para eliminar un producto del carrito

  const eliminarProductoDelCarrito = (index) => {
    // Resta el costo del producto eliminado de la suma total
    suma -= subtotales[index];

    // Actualiza el elemento HTML con el nuevo valor de suma
    totalApagar.textContent = suma;

    // Elimina el producto del array
    carrito.splice(index, 1);

    // Actualiza el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Vuelve a mostrar el carrito actualizado
    mostrarCarrito();
  };

  // Llama a la función para mostrar el carrito cuando se carga la página
  mostrarCarrito();
});
