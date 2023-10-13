let productCloned;
document.addEventListener("DOMContentLoaded", () => {
  const productID = localStorage.getItem("productID");
  cargarProductosDelLocalStorage();
  // Verifica si se ha almacenado un ID válido en el almacenamiento local
  if (!productID) {
    // Manejar el caso en el que no se haya seleccionado un producto válido
    console.error("No se ha seleccionado un producto válido.");
    return;
  }

  // Construye la URL para obtener el JSON del producto utilizando el ID
  const productoURL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
  //Construye la URL para acceder a los comentarios del porducto seleccionado.
  const ComentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

  // Utiliza Promise.all para esperar a que ambas solicitudes se completen
  Promise.all([fetch(productoURL), fetch(ComentariosURL)])
    .then(([productoResponse, comentariosResponse]) => {
      if (!productoResponse.ok) {
        throw new Error(
          `Error en la solicitud del producto: ${productoResponse.status}`
        );
      }
      if (!comentariosResponse.ok) {
        throw new Error(
          `Error en la solicitud de comentarios: ${comentariosResponse.status}`
        );
      }

      // Clona la respuesta del producto y almacénala en productCloned
      return Promise.all([
        productoResponse.clone().json(),
        comentariosResponse.json(),
      ]);
    })
    .then(([productoData, comentariosData]) => {
      // Almacena la respuesta clonada en productCloned para su reutilización
      productCloned = productoData;

      // Procesa el JSON del producto y muestra la información en la página
      mostrarProducto2(productoData);
      // Procesa los comentarios y muéstralos en la página
      mostrarcomentarios(comentariosData);
      actualizarBotonAgregar();
    })
    .catch((error) => {
      console.error(error);
    });

  muestraEstrellas();

  const boton = document.getElementById("btnEnvio");
  if (boton) {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      subirComentario();
    });
  }
});

// Función para mostrar la información del producto en la página
function mostrarProducto2(productoData) {
  const contenedor = document.getElementById("divContenedor");
  contenedor.innerHTML = ""; // Limpia el contenedor actual

  let htmlContentToAppend = "";

  const divContenedorDesc = document.createElement("div");
  divContenedorDesc.className = "contDescripcion";

  // Crear un elemento para mostrar el nombre
  const nombreProducto = document.createElement("h2");
  nombreProducto.textContent = productoData.name;
  divContenedorDesc.appendChild(nombreProducto);

  // Crear un elemento para mostrar la descripción
  const descripcionProducto = document.createElement("p");
  descripcionProducto.textContent = productoData.description;
  divContenedorDesc.appendChild(descripcionProducto);

  // Crear un elemento para mostrar el costo y la moneda
  const precioProducto = document.createElement("p");
  precioProducto.innerHTML = `<span>Precio:</span> ${productoData.currency} ${productoData.cost}`;
  divContenedorDesc.appendChild(precioProducto);

  // Crear un elemento para mostrar la cantidad vendida
  const vendidosProducto = document.createElement("p");
  vendidosProducto.innerHTML = `<span>Vendidos:</span> ${productoData.soldCount}`;
  divContenedorDesc.appendChild(vendidosProducto);

  // Crear un elemento para mostrar la categoría
  const categoriaProducto = document.createElement("p");
  categoriaProducto.innerHTML = `<span>Categoría:</span> ${productoData.category}`;
  divContenedorDesc.appendChild(categoriaProducto);

  //Crear elemento boton comprar
  const botonComprar = document.createElement("button");
  botonComprar.classList.add("botonComprar", "btn", "btn-success", "noAgregado");
  botonComprar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
  </svg> Agregar al carrito`;
  botonComprar.id = productoData.id;
  divContenedorDesc.appendChild(botonComprar);

  contenedor.appendChild(divContenedorDesc);

  // Crear elementos para mostrar las imágenes relacionadas
  if (productoData.images && productoData.images.length > 0) {
    const imagenesRelacionadas = document.createElement("div");
    imagenesRelacionadas.className = "imagenesRelacionadas";


    const carrusel = document.getElementById("carr");
    productoData.images.forEach((imagenSrc) => {
      htmlContentToAppend += `
        <div class="carousel-item ">
          <img src=${imagenSrc} class="d-block w-100" alt="producto">
        </div>`;
    });
    carrusel.innerHTML = htmlContentToAppend;
    carrusel.firstElementChild.classList.add("active");
    divContenedorDesc.appendChild(imagenesRelacionadas);
  }

  // Crear un elemento para mostrar los productos relacionados
  if (productoData.relatedProducts && productoData.relatedProducts.length > 0) {
    const productosRelacionados = document.createElement("div");
    productosRelacionados.className = "productosRelacionados";

    const productosRelacionadosTitle = document.createElement("h3");
    productosRelacionadosTitle.textContent = "Productos Relacionados";
    productosRelacionados.appendChild(productosRelacionadosTitle);

    productoData.relatedProducts.forEach((productoRelacionado) => {
      const productoRelacionadoDiv = document.createElement("div");
      productoRelacionadoDiv.className = "productoRelacionado";

      const productoRelacionadoImg = document.createElement("img");
      productoRelacionadoImg.className = "imagenRelacionada";
      productoRelacionadoImg.src = productoRelacionado.image;
      productoRelacionadoImg.alt = productoRelacionado.name;
      productoRelacionadoDiv.appendChild(productoRelacionadoImg);

      const productoRelacionadoNombre = document.createElement("p");
      productoRelacionadoNombre.textContent = productoRelacionado.name;
      productoRelacionadoDiv.appendChild(productoRelacionadoNombre);

      // aca le agregue un manejador de eventos click a el div que contiene los productos relacionados para qwe use setproduct id :)


      productoRelacionadoDiv.addEventListener("click", () => {
        setProductID(productoRelacionado.id);
      });

      productosRelacionados.appendChild(productoRelacionadoDiv);
    });

    divContenedorDesc.appendChild(productosRelacionados);
  }
}

//FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
//cada boton comprar tiene el mismo id que los productos.
//cada vez que clickeo el boton, tengo que buscar en productosData al producto que corresponda con ese id y guardarlo.
let botonComprar = document.querySelectorAll(".botonComprar");
let productoscarrito = [];
let productoAgregado;

function agregarCarrito(e) {
  // Obtén el ID del producto (puedes obtenerlo de alguna manera, dependiendo de tu estructura de datos)
  productoAgregado = productCloned; // Utiliza el producto clonado

  // Verifica si el producto ya está en el carrito
  const productoExistente = productoscarrito.find(producto => producto.name === productoAgregado.name);

  if (productoExistente) {
    // Si ya existe, muestra una alerta
    alert("Este producto ya ha sido agregado al carrito");
  } else {
    // Si no existe, agrégalo al carrito
    productoscarrito.push(productoAgregado);

    // Guarda el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(productoscarrito));

    // Muestra una notificación de éxito
    alert("Producto agregado al carrito");
    console.log(productoscarrito);

    // Puedes redirigir al usuario a la página del carrito o realizar otras acciones si es necesario
  }
}

const actualizarBotonAgregar = () => {
  botonComprar = document.querySelectorAll(".botonComprar");

  botonComprar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  }
  );

};

// Función para cargar los productos del localStorage
function cargarProductosDelLocalStorage() {
  const productosEnLocalStorage = localStorage.getItem("carrito");
  if (productosEnLocalStorage) {
    productoscarrito = JSON.parse(productosEnLocalStorage);
  } else {
    productoscarrito = []; // Inicializa la lista si no hay productos en el localStorage
  }
}


function mostrarcomentarios(infodata) {
  const container = document.getElementById("divcomentarios");

  infodata.forEach((comentario) => {
    const divContenedor = document.createElement("div");
    divContenedor.className = "contcomentarios";

    const usuario = document.createElement("h2");
    usuario.textContent = comentario.user;
    divContenedor.appendChild(usuario);

    const comentarioElement = document.createElement("p");
    comentarioElement.textContent = comentario.description;
    divContenedor.appendChild(comentarioElement);

    const fecha = document.createElement("p");
    fecha.textContent = new Date(comentario.dateTime).toLocaleString();
    divContenedor.appendChild(fecha);

    const puntuacion = document.createElement("p");
    // Crear elementos de estrellas en función de la puntuación
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = `fa fa-star${i <= comentario.score ? " checked" : ""}`;
      puntuacion.appendChild(star);
    }
    divContenedor.appendChild(puntuacion);

    container.appendChild(divContenedor);
  });
}

function mostrarcomentarios(infodata) {
  const container = document.getElementById("divcomentarios");

  infodata.forEach((comentario) => {
    const divContenedor = document.createElement("div");
    divContenedor.className = "contcomentarios";

    const usuario = document.createElement("h2");
    usuario.textContent = comentario.user;
    divContenedor.appendChild(usuario);

    const comentarioElement = document.createElement("p");
    comentarioElement.textContent = comentario.description;
    divContenedor.appendChild(comentarioElement);

    const fecha = document.createElement("p");
    fecha.textContent = new Date(comentario.dateTime).toLocaleString();
    divContenedor.appendChild(fecha);

    const puntuacion = document.createElement("p");
    // Crear elementos de estrellas en función de la puntuación
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = `fa fa-star${i <= comentario.score ? " checked" : ""}`;
      puntuacion.appendChild(star);
    }
    divContenedor.appendChild(puntuacion);

    container.appendChild(divContenedor);
  });
}
//Agus
function muestraEstrellas() {
  // Obtenemos todos los span con clase seleccionar
  const estrellasSeleccionables = document.querySelectorAll(".seleccionar");
  let Estrella1Marcada = false;
  //Para cada estrella, obtenemos su id (entr 1 y 5) y les creamos 3 eventos
  estrellasSeleccionables.forEach((estSelecc) => {
    if (parseInt(estSelecc.id) === 1) {
      estSelecc.addEventListener("click", () => {
        if (Estrella1Marcada) {
          estrellasSeleccionables.forEach((otrasEstrellas) => {
            otrasEstrellas.classList.remove("x", "checked");
          });
          Estrella1Marcada = !Estrella1Marcada;
        } else {
          Estrella1Marcada = true;
          estSelecc.classList.add("x", "checked");
        }
      });
      estSelecc.addEventListener("mouseenter", () => {
        estSelecc.classList.add("checked");
        estrellasSeleccionables.forEach((otrasEstrellas) => {
          // Para cada estrella, si el id de cualquier estrella es menor o igual al de la estrella que está en hover, a todas esas estrellas se les agrega la clase checked, que ilumina la estrella.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add("checked");
          } else {
            otrasEstrellas.classList.remove("checked");
          }
        });
      });
      estSelecc.addEventListener("mouseleave", () => {
        if (!Estrella1Marcada) {
          estSelecc.classList.remove("checked");
        }
        estrellasSeleccionables.forEach((otrasEstrellas) => {
          // Para cada estrella, si cualquiera contiene la clase "x", entonces se le agrega la clase checked, sino se le quita.
          if (otrasEstrellas.classList.contains("x")) {
            otrasEstrellas.classList.add("checked");
          } else {
            otrasEstrellas.classList.remove("checked");
          }
        });
      });
    } else {
      // Si el id es mayor a 1...
      // Cuando se pasa el cursor por encima de alguna estrella...
      estSelecc.addEventListener("mouseenter", () => {
        estrellasSeleccionables.forEach((otrasEstrellas) => {
          // Para cada estrella, si el id de cualquier estrella es menor o igual al de la estrella que está en hover, a todas esas estrellas se les agrega la clase checked, que ilumina la estrella.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add("checked");
          } else {
            otrasEstrellas.classList.remove("checked");
          }
        });
      });
      // Cuando el cursor sale del área de cualquier estrella...
      estSelecc.addEventListener("mouseleave", () => {
        estrellasSeleccionables.forEach((otrasEstrellas) => {
          // Para cada estrella, si cualquiera contiene la clase "x", entonces se le agrega la clase checked, sino se le quita.
          if (otrasEstrellas.classList.contains("x")) {
            otrasEstrellas.classList.add("checked");
          } else {
            otrasEstrellas.classList.remove("checked");
          }
        });
      });
      // Cuando se hace clic...
      estSelecc.addEventListener("click", () => {
        estrellasSeleccionables.forEach((otrasEstrellas) => {
          // Para cada estrella, si el id de cualquier otra estrella es menor o igual al de la estrella clickeada, se marca con la clase "x", la cual se utilizará para saber cuales estrellas dejar marcadas cuando el cursor salga de las estrellas y cuantas marcó el usuario.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add("x");
          } else {
            otrasEstrellas.classList.remove("x");
          }
        });
      });
    }
  });
}

function subirComentario() {
  //Obtenemos los valores y elementos del dom.
  const divComentarios = document.getElementById("divcomentarios");
  const comentario = document.getElementById("opinion");

  const divNuevoComentario = document.createElement("div");
  divNuevoComentario.classList.add("contcomentarios");
  const estrellas = document.getElementById("estrellas");

  const valorComentario = comentario.value;
  const estrellasHtml = estrellas.innerHTML; //Copiamos el html de las estrellas seleccionadas en ese momento.

  console.log(valorComentario); //prueba

  //Creamos una nueva instancia de Date() para obtener la hora y fecha del ordenador.
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();

  //Agregamos el contenido html al nuevo comentario
  divNuevoComentario.innerHTML = `<h2>${localStorage.getItem(
    "user"
  )}</h2><p>${valorComentario}</p><p>${fecha}, ${hora}</p><p>${estrellasHtml}</p>`;

  divComentarios.appendChild(divNuevoComentario);

  comentario.value = ""; //Vaciamos el textarea.
}
