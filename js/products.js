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
      image.classList.add("imagen")
      productDiv.appendChild(image);

const info = document.createElement('div');
info.classList.add('info')
productDiv.appendChild(info);

      const name = document.createElement('h2');
      name.textContent = product.name;
      // productDiv.appendChild(name);
    info.appendChild(name);
    name.classList.add('name')

      const price = document.createElement('p');
      price.textContent = `${product.currency} ${product.cost} `;
      // productDiv.appendChild(price);
      info.appendChild(price);
      price.classList.add('price')


      const soldCount = document.createElement('p');
      soldCount.textContent = `Vendidos: ${product.soldCount}`;
      productDiv.appendChild(soldCount);
     soldCount.classList.add('vendidos')


      const description = document.createElement('p');
      description.textContent = product.description;
      // productDiv.appendChild(description);
      info.appendChild(description);

      cartContainer.appendChild(productDiv);
     
    });
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
  });