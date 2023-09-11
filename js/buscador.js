const urls = [
  "https://japceibal.github.io/emercado-api/cats_products/101.json",
  "https://japceibal.github.io/emercado-api/cats_products/102.json",
  "https://japceibal.github.io/emercado-api/cats_products/103.json",
  "https://japceibal.github.io/emercado-api/cats_products/104.json",
  "https://japceibal.github.io/emercado-api/cats_products/105.json",
  "https://japceibal.github.io/emercado-api/cats_products/106.json",
  "https://japceibal.github.io/emercado-api/cats_products/107.json",
  "https://japceibal.github.io/emercado-api/cats_products/108.json",
  "https://japceibal.github.io/emercado-api/cats_products/109.json",
];
const filtros = document.getElementById("filtros");

const fetchPromises = urls.map((url) => fetch(url));

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const contenedor = document.getElementById("contenedor");

  searchBar.addEventListener("input", () => {
    if (filtros) {
      while (filtros.firstChild) {
        filtros.removeChild(filtros.firstChild);
      }
    }
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    Promise.all(fetchPromises)
      .then((responses) => {
        return Promise.all(
          responses.map((response) => response.clone().json())
        );
      })
      .then((dataArray) => {
        const searchTerm = searchBar.value.toLowerCase();
        const matches = [];

        for (const data of dataArray) {
          for (const product of data.products) {
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();

            if (name.includes(searchTerm) || description.includes(searchTerm)) {
              matches.push(product);
            }
          }
        }
        if (matches.length >= 1) {
          for (const match of matches) {
            mostrarProducto(
              match.image,
              match.name,
              match.cost,
              match.description,
              match.soldCount,
              match.currency,
              match.id // Pasar el ID del producto
            );
          }
        } else {
          const p = document.createElement("p");
          p.textContent = "No se han encontrado productos para: " + searchBar.value + ".";
          p.classList.add("lead");
          p.classList.add("text-center");
          contenedor.appendChild(p);
        }
        if (searchBar.value === "") {
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

function mostrarProducto(
  urlImagen,
  nombre,
  precio,
  descripcion,
  cantVendidos,
  simboloMoneda,
  productId
) {
  const container = document.getElementById("contenedor");

  const divProducto = document.createElement("div");
  divProducto.classList.add("contProducto");

  // Agregar evento de clic para redirigir al usuario a la página de detalles
  divProducto.addEventListener("click", () => {
    setProductID(productId);
  });

  const imagen = document.createElement("img");
  imagen.src = urlImagen;
  imagen.classList.add("imgProducto");
  divProducto.appendChild(imagen);

  const nombreP = document.createElement("h2");
  nombreP.textContent = nombre;
  divProducto.appendChild(nombreP);
  nombreP.classList.add("nombre");

  const precioP = document.createElement("p");
  precioP.textContent = `${simboloMoneda} ${precio}`;
  precioP.classList.add("precioProducto");
  divProducto.appendChild(precioP);

  const descripcionP = document.createElement("p");
  descripcionP.textContent = descripcion;
  descripcionP.id = "descripcion";
  divProducto.appendChild(descripcionP);

  const cantVendidosP = document.createElement("p");
  cantVendidosP.textContent = `Vendidos: ${cantVendidos}`;
  divProducto.appendChild(cantVendidosP);

  container.appendChild(divProducto);
}

function setProductID(productId) {
  localStorage.setItem("productID", productId);
  window.location = "product-info.html"; 
}