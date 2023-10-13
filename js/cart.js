//Desafíate.2 mariangel
document.addEventListener("DOMContentLoaded", () => {
  const carritoDiv = document.getElementById("carrito-div");
  const formEnvio = document.getElementById("formEnvio")
  // Obtén el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let subtotales = [];
  let suma = 0;

  // Función para mostrar los productos en el carrito
  const mostrarCarrito = () => {
    carritoDiv.innerHTML = ""; // Limpia el contenedor actual

    if (carrito.length > 0) {
      // El carrito tiene elementos, muestra el formulario
      formEnvio.style.display = "block";
      carritoDiv.style.display = "block";

      // Itera a través del arreglo de IDs de productos en el carrito
      carrito.forEach((producto, index) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("card", "rounded-3", "mb-6", "col-sm-12", "mx-auto", "mb-2", "col-mb-12");
        divProducto.setAttribute("style", "min-width: 200px;");
        divProducto.id = `producto-${index}`;
        divProducto.innerHTML = `
          <div class="card-body p-3 mx-auto text-center fondoOscuro2 noShadow">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2">
                <img src="${producto.images[0]}" class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3">
                <p class="lead fw-normal mb-2">${producto.name}</p>
              </div>
              <div class="col-md-3 d-flex">
                <button class="btn btn-link px-2 btnCantidad" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>
                <input id="elemento-${index}" min="1" name="quantity" type="number" class="form-control form-control-color" />
                <button class="btn btn-link px-2  btnCantidad" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-2 offset-md-1">
                <h5 class="mb-0 subTotal" id="subTotal-${index}"> ${producto.currency} ${producto.cost}</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end d-flex align-items-center">
                <a href="#!" class="text-danger" id="btnEliminar-${index}">
                  <i class="fas fa-trash fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
        `;
        carritoDiv.appendChild(divProducto);

        const masMenos = document.querySelectorAll(".btnCantidad");
        const input = document.getElementById(`elemento-${index}`);
        const subTotal = document.getElementById(`subTotal-${index}`);
        const btnEliminar = document.getElementById(`btnEliminar-${index}`);

        // Cargar cantidad desde el localStorage y configurar el input
        const cantidadGuardada = localStorage.getItem(`cantidad-${index}`);
        if (cantidadGuardada) {
          input.value = cantidadGuardada;
        } else {
          input.value = 1;
        }

        // Agregar evento para eliminar un producto del carrito
        btnEliminar.addEventListener("click", () => {
          // Elimina el producto del carrito
          carrito.splice(index, 1);
          // Elimina la cantidad guardada en el localStorage
          localStorage.removeItem(`cantidad-${index}`);
          // Guarda el carrito actualizado en el localStorage
          localStorage.setItem("carrito", JSON.stringify(carrito));
          // Vuelve a mostrar el carrito actualizado
          mostrarCarrito();
          actualizarSumaTotal();
        });
//Punto 3.1 Agus
        input.addEventListener("change", () => {
          const cantidad = parseInt(input.value, 10);
          const subtotal = cantidad * producto.cost;
          subTotal.textContent = `${producto.currency} ${subtotal}`;
          actualizarSumaTotal(); // Actualiza la suma total cuando cambia la cantidad
          // Guarda la cantidad en el localStorage
          localStorage.setItem(`cantidad-${index}`, cantidad);
        });

        Array.from(masMenos).forEach((boton) => {
          boton.addEventListener("click", () => {
            const cantidad = parseInt(input.value, 10);
            const subtotal = cantidad * producto.cost;
            subTotal.textContent = `${producto.currency} ${subtotal}`;
            actualizarSumaTotal(); // Actualiza la suma total cuando se hacen clics en las flechas
            // Guarda la cantidad en el localStorage
            localStorage.setItem(`cantidad-${index}`, cantidad);
          });
        });
      });
    }
    else {
      carritoDiv.innerHTML = "<h5 class=`letraBlanca`>Aún no hay productos en el carrito</h5>";
      formEnvio.style.display = "none";
    }
  };

  mostrarCarrito();
  actualizarSumaTotal();
});
//Punto 3.2
function actualizarSumaTotal() {
  const totalEnPantallaUYU = document.getElementById("sumaTotalUYU")
  const totalEnPantallaUSD = document.getElementById("sumaTotalUSD")
  const subTotales = document.querySelectorAll(".subTotal");
  let sumaTotalUYU = 0;
  let sumaTotalUSD = 0;

  Array.from(subTotales).forEach((subTotal) => {
    if (subTotal.textContent.includes("UYU")) {
      sumaTotalUYU += parseFloat(subTotal.textContent.replace(/\D/g, ''));
    } else {
      sumaTotalUSD += parseFloat(subTotal.textContent.replace(/\D/g, ''));
    }
  });
  totalEnPantallaUYU.innerHTML = `<span class="text-info-emphasis">Total en UYU</span> ${sumaTotalUYU}`;
  totalEnPantallaUSD.innerHTML = `<span class="text-info-emphasis">Total en USD</span> ${sumaTotalUSD}`;
}
