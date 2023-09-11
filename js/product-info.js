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
    // Realiza una solicitud HTTP para obtener el JSON del producto
    fetch(productoURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((productoData) => {
        // Procesa el JSON del producto y muestra la información en la página
        mostrarProducto(productoData);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
  // Función para mostrar la información del producto en la página
  function mostrarProducto(productoData) {
      const container = document.getElementById("divContenedor");
    
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
    
      container.appendChild(divContenedor);
    }
  
  
  
  
  
  
  
  
  
  
    document.addEventListener("DOMContentLoaded", () => {
      const productID = localStorage.getItem("productID");
  
      const  ComentariosURL=`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
      // Realiza una solicitud HTTP para obtener el JSON del producto
      fetch(ComentariosURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json();
        })
        .then((infodata) => {
          // Procesa el JSON del producto y muestra la información en la página
          mostrarcomentarios(infodata);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    
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
  
  
  
  
  
  