//En product_info.html, después de cargar la página, obtén el ID del producto del almacenamiento local
document.addEventListener("DOMContentLoaded", () => {
  const productID = localStorage.getItem("productID");

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
        throw new Error(`Error en la solicitud del producto: ${productoResponse.status}`);
      }
      if (!comentariosResponse.ok) {
        throw new Error(`Error en la solicitud de comentarios: ${comentariosResponse.status}`);
      }
      return Promise.all([productoResponse.json(), comentariosResponse.json()]);
    })
    .then(([productoData, comentariosData]) => {
      // Procesa el JSON del producto y muestra la información en la página
      mostrarProducto2(productoData);
      // Procesa los comentarios y muéstralos en la página
      mostrarcomentarios(comentariosData);
    })
    .catch((error) => {
      console.error(error);
    });
  
  muestraEstrellas()

  const boton = document.getElementById("btnEnvio");
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    subirComentario();
  })
});



// Función para mostrar la información del producto en la página
//Adrian
function mostrarProducto2(productoData) {
  const contenedor = document.getElementById("divContenedor");
  const divContenedorDesc = document.createElement("div");
  const divContenedorImg = document.createElement("div");

  const divContenedor = document.createElement("div");
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

  contenedor.appendChild(divContenedorDesc);

  // Crear elementos para mostrar las imágenes relacionadas
  if (productoData.images && productoData.images.length > 0) {
    const imagenesRelacionadas = document.createElement("div");
    imagenesRelacionadas.className = "imagenesRelacionadas";


    productoData.images.forEach((imagenSrc, index) => {
      const img = document.createElement("img");
      img.className = "imagenRelacionada";
      img.src = imagenSrc;
      img.alt = `Imagen ${index + 1}`;
      imagenesRelacionadas.appendChild(img);
    });

    divContenedor.appendChild(imagenesRelacionadas);
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

      productosRelacionados.appendChild(productoRelacionadoDiv);
    });

    divContenedor.appendChild(productosRelacionados);
  }

  contenedor.appendChild(divContenedor);
}
//Mariangel
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
      star.className = `fa fa-star${i <= comentario.score ? ' checked' : ''}`;
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
  estrellasSeleccionables.forEach(estSelecc => {

    if (parseInt(estSelecc.id) === 1) {
      estSelecc.addEventListener("click", () => {
        if (Estrella1Marcada) {
          estrellasSeleccionables.forEach(otrasEstrellas => {
            otrasEstrellas.classList.remove("x", "checked");
          })
          Estrella1Marcada=!Estrella1Marcada
        } else {
          Estrella1Marcada = true;
          estSelecc.classList.add("x", "checked");
        }
      });
      estSelecc.addEventListener("mouseenter", () => {
        estSelecc.classList.add("checked");
        estrellasSeleccionables.forEach(otrasEstrellas => {
          // Para cada estrella, si el id de cualquier estrella es menor o igual al de la estrella que está en hover, a todas esas estrellas se les agrega la clase checked, que ilumina la estrella.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add('checked');
          }
          else {
            otrasEstrellas.classList.remove("checked");
          }
        })
      })
      estSelecc.addEventListener('mouseleave', () => {
        if (!Estrella1Marcada) {
          
          estSelecc.classList.remove("checked");
        }
        estrellasSeleccionables.forEach(otrasEstrellas => {
          // Para cada estrella, si cualquiera contiene la clase "x", entonces se le agrega la clase checked, sino se le quita.
          if (otrasEstrellas.classList.contains('x')) {
            otrasEstrellas.classList.add('checked');
          } else {
            otrasEstrellas.classList.remove("checked")
          }
        })
      })
    } else {// Si el id es mayor a 1...
      // Cuando se pasa el cursor por encima de alguna estrella...
      estSelecc.addEventListener('mouseenter', () => {
        
        estrellasSeleccionables.forEach(otrasEstrellas => {
          // Para cada estrella, si el id de cualquier estrella es menor o igual al de la estrella que está en hover, a todas esas estrellas se les agrega la clase checked, que ilumina la estrella.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add('checked');
          }
          else {
            otrasEstrellas.classList.remove("checked");
          }
        })
      })
      // Cuando el cursor sale del área de cualquier estrella...
      estSelecc.addEventListener('mouseleave', () => {
        estrellasSeleccionables.forEach(otrasEstrellas => {
          // Para cada estrella, si cualquiera contiene la clase "x", entonces se le agrega la clase checked, sino se le quita.
          if (otrasEstrellas.classList.contains('x')) {
            otrasEstrellas.classList.add('checked');
          } else {
            otrasEstrellas.classList.remove("checked")
          }
        })
      })
      // Cuando se hace clic...
      estSelecc.addEventListener("click", () => {
        estrellasSeleccionables.forEach(otrasEstrellas => {
          // Para cada estrella, si el id de cualquier otra estrella es menor o igual al de la estrella clickeada, se marca con la clase "x", la cual se utilizará para saber cuales estrellas dejar marcadas cuando el cursor salga de las estrellas y cuantas marcó el usuario.
          if (parseInt(otrasEstrellas.id) <= parseInt(estSelecc.id)) {
            otrasEstrellas.classList.add("x");
          } else {
            otrasEstrellas.classList.remove("x");
          }
        })
      })
    }
  })
}
//Viky
function subirComentario() {
  //Obtenemos los valores y elementos del dom.
  const divComentarios = document.getElementById("divcomentarios")
  const comentario = document.getElementById("opinion");
  
  const divNuevoComentario = document.createElement("div");
  divNuevoComentario.classList.add("contcomentarios");
  const estrellas = document.getElementById("estrellas");

  const valorComentario = comentario.value;
  const estrellasHtml = estrellas.innerHTML;//Copiamos el html de las estrellas seleccionadas en ese momento.

  console.log(valorComentario);//prueba

  //Creamos una nueva instancia de Date() para obtener la hora y fecha del ordenador.
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();

  //Agregamos el contenido html al nuevo comentario
  divNuevoComentario.innerHTML = `<h2>${localStorage.getItem("user")}</h2><p>${valorComentario}</p><p>${fecha}, ${hora}</p><p>${estrellasHtml}</p>`
  
  divComentarios.appendChild(divNuevoComentario);

  comentario.value = "";//Vaciamos el textarea.
  
}




