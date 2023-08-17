const jsonURL = "js/data.json"; 

const cartContainer = document.getElementById("autos");
 
fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    const products = data.products;


    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const image = document.createElement('img');
      image.src = product.image;
      image.classList.add('imagen')
      productDiv.appendChild(image);

      const name = document.createElement('h2');
      name.textContent = product.name;
      productDiv.appendChild(name);

      const price = document.createElement('p');
      price.textContent = `Precio: ${product.cost} ${product.currency}`;
      productDiv.appendChild(price);

      const soldCount = document.createElement('p');
      soldCount.textContent = `Vendidos: ${product.soldCount}`;
      productDiv.appendChild(soldCount);

      const description = document.createElement('p');
      description.textContent = product.description;
      productDiv.appendChild(description);

      cartContainer.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
  });