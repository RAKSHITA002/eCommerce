document.addEventListener('DOMContentLoaded', function () {
    let ElectronicsProduct = document.querySelector(".electronicsProducts")
    async function fetchElectronicsCategory(url) {
        let data = await fetch(url);
        let response = await data.json();

        console.log(response);
        for (let i = 0; i < response.length; ++i) {
            ElectronicsProduct.innerHTML += `
                <div class = "ElectronicProduct">
                  <img src="${response[i].image}" alt=""> 
                  <h2 class="title">${response[i].title}</h2>
                  <h4 class="category">${response[i].category}</h4>
                 <p class="description">${response[i].description}</p>
                   <div class="price-container">
                       <h3 class="price"> $ ${response[i].price}</h3>
                        <a href="#!" id="${response[i].id}" class="add-to-cart"></a>
                    </div>
                </div>
                  `;
                   
        }
        
        
    };
    fetchElectronicsCategory("https://fakestoreapi.com/products/category/electronics");
});
