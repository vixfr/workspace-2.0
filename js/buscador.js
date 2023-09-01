
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector('.dropdownn');
    const searchInput = dropdown.querySelector('.search-input');
    const dropdownMenu = dropdown.querySelector('.dropdownn-menu');
    const datosProductos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

<<<<<<< Updated upstream
    searchInput.addEventListener('input', function () {
        dropdownMenu.classList.add('show');
        if (searchInput.value === "") {
            dropdownMenu.classList.remove('show');
=======
  const menorPrecio = document.getElementById("menorPrecio");
  const mayorPrecio = document.getElementById("mayorPrecio");
  const cantVendidos = document.getElementById("cantVendidos");
  const rangeFilterBtn = document.getElementById("rangeFilterCount");
  const clearRangeFilterBtn = document.getElementById("clearRangeFilter");

  searchBar.addEventListener("input", () => {
    let matches = [];
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
>>>>>>> Stashed changes
        }
        for (i = 1; i < 10; i++){
            
        }
<<<<<<< Updated upstream
=======
        if (searchBar.value === "") {
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
    mayorPrecio.addEventListener("click", () => {
      matches.sort((a, b) => b.cost - a.cost)
    })
    
  });
});
>>>>>>> Stashed changes

    });
})