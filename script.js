/*  document.addEventListener('DOMContentLoaded', function(){
    let products = document.querySelector('.products')
    async function fetchProducts(url){
      let data =  await fetch(url);
      let response = await data.json();

      console.log(response);
      for(let i=0;i<response.length;++i){
        products.innerHTML  += `
        <div class="product">
        <img src="${response[i].image}" alt=""> 
        <h2 class="title">${response[i].title }</h2>
        <div class="price-container">
        <h3 class="price">Price : $ ${response[i].price}</h3>
        <button id="${response[i].id}" class="add-to-cart">Add To Cart</button>
        </div>
        </div>
        `;
      }    
    };

    fetchProducts('https://fakestoreapi.com/products'); 
});

 */

document.addEventListener('DOMContentLoaded', function () {
  let products = document.querySelector('.products');
  let response;

  async function fetchProducts(url) {
      let data = await fetch(url);
      response = await data.json();
      console.log(response);

      for (let i = 0; i < response.length; ++i) {
          products.innerHTML += `
              <div class="product">
                      <img src="${response[i].image}" alt="">
                  <h2 class="title">${response[i].title}</h2>
                  <div class="price-container">
                      <h3 class="price">Price : $ ${response[i].price}</h3>
                      <button id="${response[i].id}" class="add-to-cart">Add To Cart</button>
                  </div>
              </div>
          `;
      }
  }


  products.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart')) {
          const productId = event.target.id;
          const selectedProduct = response.find(product => product.id == productId);

       
          addToCart(selectedProduct);
      }

    });

 
  function addToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let existingItem = cartItems.find(item => item.id === product.id);

      if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
          cartItems.push({
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
          });
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));

      alert('Item added to the cart!');
  }

  fetchProducts('https://fakestoreapi.com/products');
});


