
document.addEventListener("DOMContentLoaded", () => {
  const carritoDiv = document.getElementById("carrito-div");
  const formEnvio = document.getElementById("formEnvio");
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
        divProducto.classList.add(
          "card",
          "rounded-3",
          "mb-6",
          "col-sm-12",
          "mx-auto",
          "mb-2",
          "col-mb-12"
        );
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
//Agus desafíate
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
    } else {
      carritoDiv.innerHTML =
        "<h5 class=`letraBlanca`>Aún no hay productos en el carrito</h5>";
      formEnvio.style.display = "none";
    }
  };
//Viky Jquery punto 2.2
  $('input[name="metodoPago"]').change(function () {
    if ($('#tarjetaCredito').is(':checked')) {
      // Habilitar campos de tarjeta de crédito y deshabilitar campos de transferencia bancaria
      $('#numeroTarjeta, #codigoSeguridad, #vencimiento').prop('disabled', false);
      $('#numeroCuenta').prop('disabled', true);
    } else if ($('#transferenciaBancaria').is(':checked')) {
      // Habilitar campos de transferencia bancaria y deshabilitar campos de tarjeta de crédito
      $('#numeroTarjeta, #codigoSeguridad, #vencimiento').prop('disabled', true);
      $('#numeroCuenta').prop('disabled', false);
    }
    /* 
$('input[name="metodoPago"]').change(function() { ... }) selecciona todos los elementos <input> con el atributo name igual a "metodoPago" y agrega un manejador de eventos change a ellos.
$('#tarjetaCredito').is(':checked') verifica si el radio button con el id "tarjetaCredito" está marcado.
$('#numeroTarjeta, #codigoSeguridad, #vencimiento').prop('disabled', false); y $('#numeroCuenta').prop('disabled', true); se utilizan para habilitar o deshabilitar los campos de entrada correspondientes. Aquí, $() se usa para seleccionar elementos por su id o múltiples elementos separados por comas.
En resumen, jQuery simplifica la selección de elementos del DOM y la manipulación de propiedades de los elementos, como disabled, lo que hace que el código sea más conciso y fácil de entender. */
  });
  mostrarCarrito();
  actualizarSumaTotal();
});
//Punto 1 Mariangel
function actualizarSumaTotal() {
  const totalEnPantallaUYU = document.getElementById("sumaTotalUYU");
  const totalEnPantallaUSD = document.getElementById("sumaTotalUSD");
  const subtotalgeneral = document.getElementById("subtotal");
  const total = document.getElementById("total");
  const costoEnvio = document.getElementById("costoEnvio");
  const subTotales = document.querySelectorAll(".subTotal");
  let sumaTotalUYU = 0;
  let sumaTotalUSD = 0;

  Array.from(subTotales).forEach((subTotal) => {
    if (subTotal.textContent.includes("UYU")) {
      sumaTotalUYU += parseFloat(subTotal.textContent.replace(/\D/g, ""));
    } else {
      sumaTotalUSD += parseFloat(subTotal.textContent.replace(/\D/g, ""));
    }
  });
  totalEnPantallaUYU.innerHTML = `<span class="text-info-emphasis">Total en UYU</span> ${sumaTotalUYU}`;
  totalEnPantallaUSD.innerHTML = `<span class="text-info-emphasis">Total en USD</span> ${sumaTotalUSD}`;

  //pasa subtotales a pesos
  let sumaSubtotal = sumaTotalUYU + sumaTotalUSD * 40;

  subtotalgeneral.textContent = "UYU " + sumaSubtotal;

  //actualiza costo envío
  let radioButtons = document.querySelectorAll(".tarifa");

  let tarifaSeleccionada = null;

  radioButtons.forEach(function (radioButton) {
    if (radioButton.checked) {
      tarifaSeleccionada = radioButton.id;
    }
  });

  let porcentajeCosto = 0;

  if (tarifaSeleccionada === "premium") {
    porcentajeCosto = 15;
  } else if (tarifaSeleccionada === "express") {
    porcentajeCosto = 7;
  } else if (tarifaSeleccionada === "standard") {
    porcentajeCosto = 5;
  }

  // Calcula el total numérico

  // Formatea el total numérico como cadena con el formato deseado

  const precioEnvio = (sumaSubtotal * parseInt(porcentajeCosto)) / 100;

  let precioEnvioNum = parseFloat(precioEnvio);

  costoEnvio.textContent = "UYU " + precioEnvioNum;

  //ACTUALIZA TOTALAC A PAGAR
  let totalNum = sumaSubtotal + precioEnvioNum;

  total.textContent = "UYU " + totalNum.toFixed(2);
}

// VALIDACION BOOSTRAP

// JavaScript para las validaciones Bootstrap
// JavaScript para las validaciones Bootstrap
("strict");

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll(".needs-validation");
const checkBoxs = document.querySelectorAll(".checkMedioPago");
const feedbackDiv = document.getElementById("terminos");
const modalPagos = document.querySelectorAll(".modalPago");
const compraExitosa = document.getElementById("compraExitosa");
const modalform =document.getElementById("formmodal");
//Ale punto 3
Array.from(forms).forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity() || !modalform.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //Alerta de compra exitosa 
      event.preventDefault();
      compraExitosa.style.display = "block";
      setTimeout(() => {
        compraExitosa.style.display = "none";
        window.location.reload();
      }, 3000);
    }

    form.classList.add("was-validated");

    let pagoSeleccionado = false;

    checkBoxs.forEach((box) => {
      if (box.checked) {
        pagoSeleccionado = true;
      }
    });

    if (pagoSeleccionado) {
      feedbackDiv.style.display = "none";
    } else {
      feedbackDiv.style.display = "block";
    }
  });
});
