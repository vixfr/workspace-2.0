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

const fetchPromises = urls.map((url) => fetch(url));

document.addEventListener("DOMContentLoaded", () => {
  //const buscador = document.getElementById("buscador");
  const searchBar = document.getElementById("searchBar");
  const contenedor = document.getElementById("contenedor");

  searchBar.addEventListener("input", () => {
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
        //array que contiene los objetos extraidos de las apis [{autos},{juguetes}, {muebles}, etc]
        const searchTerm = searchBar.value.toLowerCase(); // Convertir el valor a minúsculas
        const matches = [];

        for (const data of dataArray) {
          //por cada objeto dentro de ese array
          for (const product of data.products) {
            //accede al arreglo data.products, e itera cada elemento del arreglo (cada producto)
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();

            // Buscar similitudes en el nombre o la descripción
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
              matches.push(product);
            }
          }
        }
        if (matches.length > 1) {
          // Aquí tienes los productos que coinciden con la búsqueda
          for (const match of matches) {
            // Agregar lógica para mostrar los resultados en el contenedor
            mostrarProducto(
              match.image,
              match.name,
              match.cost,
              match.description,
              match.soldCount,
              match.currency
            );
          }
        } else {
          const p = document.createElement("p");
          p.textContent = "No sea han encontrado productos para: " + searchBar.value + ".";
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

//  LA QUISE EXPORTAR CON EXPORT {MOSTRARPRODUCTO} PERO SE ROMPIO. PODEMOS INTENTARLO...

function mostrarProducto(
  urlImagen,
  nombre,
  precio,
  descripcion,
  cantVendidos,
  simboloMoneda
) {
  const container = document.getElementById("contenedor");

  const divProducto = document.createElement("div");
  divProducto.classList.add("contProducto");

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
