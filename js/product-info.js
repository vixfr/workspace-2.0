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
});



// Función para mostrar la información del producto en la página
function mostrarProducto2(productoData) {
  const contenedor = document.getElementById("divContenedor");

  const divContenedor = document.createElement("div");
  divContenedor.className = "contdescripcion";

  // Crear un elemento para mostrar el nombre
  const nombreProducto = document.createElement("h2");
  nombreProducto.textContent = productoData.name;
  divContenedor.appendChild(nombreProducto);

  // Crear un elemento para mostrar la descripción
  const descripcionProducto = document.createElement("p");

  descripcionProducto.textContent = productoData.description;
  divContenedor.appendChild(descripcionProducto);

  // Crear un elemento para mostrar el costo y la moneda
  const precioProducto = document.createElement("p");
  precioProducto.textContent = `Precio: ${productoData.currency} ${productoData.cost}`;
  divContenedor.appendChild(precioProducto);

  // Crear un elemento para mostrar la cantidad vendida
  const vendidosProducto = document.createElement("p");
  vendidosProducto.textContent = `Vendidos: ${productoData.soldCount}`;
  divContenedor.appendChild(vendidosProducto);

  // Crear un elemento para mostrar la categoría
  const categoriaProducto = document.createElement("p");
  categoriaProducto.textContent = `Categoría: ${productoData.category}`;
  divContenedor.appendChild(categoriaProducto);

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





