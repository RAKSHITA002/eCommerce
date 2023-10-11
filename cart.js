document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear the existing content
        cartItemsContainer.innerHTML = '';

        let totalPrice = 0;

        // Render each item in the cart
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            // Product image
            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.title;
            cartItemElement.appendChild(imgElement);

            // Product details
            const detailsElement = document.createElement('div');
            detailsElement.classList.add('cart-item-details');

            // Title
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            detailsElement.appendChild(titleElement);

            // Price
            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $${item.price.toFixed(2)}`;
            detailsElement.appendChild(priceElement);

            // Quantity handling
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-container');

            const minusButton = createButton('-', () => updateQuantity(item, -1));
            quantityContainer.appendChild(minusButton);

            const quantityElement = document.createElement('span');
            quantityElement.textContent = item.quantity || 1; // Default to 1 if quantity is not defined
            quantityContainer.appendChild(quantityElement);

            const plusButton = createButton('+', () => updateQuantity(item, 1));
            quantityContainer.appendChild(plusButton);

            detailsElement.appendChild(quantityContainer);

            // Remove button
            const removeButton = createButton('Remove', () => removeFromCart(item));
            detailsElement.appendChild(removeButton);

            cartItemElement.appendChild(detailsElement);

            cartItemsContainer.appendChild(cartItemElement);

            // Calculate total price
            totalPrice += item.price * (item.quantity || 1);
        });

        // Render total price
        const totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartItemsContainer.appendChild(totalPriceElement);
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function updateQuantity(item, change) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                cartItem.quantity = (cartItem.quantity || 1) + change;
            }
            return cartItem;
        });

        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        renderCartItems();
    }

    function removeFromCart(item) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);

        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        renderCartItems();
    }
});

