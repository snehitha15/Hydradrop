function addToCart(productName, price, imageURL, addButton) {
    let totalItems = 0;
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        cartItems[existingItemIndex].price += price;
    } else {
        const newItem = { productName, price, quantity: 1, imageURL };
        cartItems.push(newItem);
    }

    cartItems.forEach(item => {
        totalItems += item.quantity;
    });

    const cartIcon = document.getElementById('cartIcon');
    cartIcon.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart  ${totalItems}`;

    localStorage.setItem('cart', JSON.stringify(cartItems));

    updateButton(addButton, productName);

    displayCart();

    calculateTotal();
}

function updateButton(button, productName) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.productName === productName);

    if (existingItem) {
        button.innerHTML = `
            <div class="quantity-buttons">
                <button onclick="decreases('${productName}', this)">-</button>
                <p>${existingItem.quantity}</p>
                <button onclick="increaseQuantity('${productName}', this)">+</button>
            </div>`;
    }
}


function increaseQuantity(productName, button) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        cartItems[existingItemIndex].price = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateButton(button, productName);
        displayCart();
        calculateTotal();
    }
}

function decreases(productName, button) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 1) {
        console.log('Before decrement:', cartItems[existingItemIndex].quantity);
        cartItems[existingItemIndex].quantity -= 1;
        console.log('After decrement:', cartItems[existingItemIndex].quantity);
        cartItems[existingItemIndex].price = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateButton(button, productName);
        displayCart();
        calculateTotal();
    }
}


function decreaseQuantity(productName, button) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 1) {
        console.log('Before decrement:', cartItems[existingItemIndex].quantity);
        cartItems[existingItemIndex].quantity -= 1;
        console.log('After decrement:', cartItems[existingItemIndex].quantity);
        cartItems[existingItemIndex].price = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateButton(button, productName);
        displayCart();
        calculateTotal();
    }
}


function deleteProduct(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
    calculateTotal();
}

function calculateDiscount(price) {
    return price * 0; // Example: 10% discount
}

function calculateDeliveryCharges() {
    return 5.00; // Example: Fixed delivery charge
}

function calculateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
            <div class ="desc">
                <img src="${item.imageURL}" alt="${item.productName}" class="cart-image">
                <p class="cart-text"><strong>${item.productName}</strong></p>
                <hr>
            </div>
            <div class="price-container">
                <p>Product Price: ${item.price.toFixed(2)}</p>
                <p>Discount: ${calculateDiscount(item.price)}</p>
                <p>Delivery Charges: ${calculateDeliveryCharges()}</p>
            </div>
            <div class="quantity-container">
                <p class="quantity-display">Quantity: </p>
                <div class="quantity-buttons">
                    <button onclick="decreaseQuantity('${item.productName}', this)">-</button>
                    <p>${item.quantity}</p>
                    <button onclick="increaseQuantity('${item.productName}', this)">+</button>
                    <p class="prices"> Price :${item.price}</p>
                    <button class="delete-button" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </div>`;

        cartContainer.appendChild(itemDiv);
    });
}

function checkout() {
    window.location.href = "payment.html";
}

displayCart();
calculateTotal();
