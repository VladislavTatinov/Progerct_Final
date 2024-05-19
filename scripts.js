const products = [
    { name: 'Nvidia GeForce RTX 3080', imageUrl: 'rtx3080.png', price: 54000 },
    { name: 'AMD RX 6800 XT', imageUrl: 'rx6800xt.png', price: 22000 },
    { name: 'Intel CORE i9', imageUrl: 'intelxe.png', price: 19000 },
    { name: 'Nvidia GTX 1660 Ti', imageUrl: 'gtx1660ti.png', price: 20000 },
    { name: 'AMD Radeon Rx 570', imageUrl: 'RadeonRx570Amd.png', price: 9000 },
    { name: 'Nvidia GTX 1060', imageUrl: 'GTX 1060.png', price: 8200 },
    { name: 'AMD RX 6600 XT', imageUrl: 'rx6600xt.png', price: 30000 },
    { name: 'Intel Core i3', imageUrl: 'IntelCorei3.png', price: 14000 },
    { name: 'Nvidia GeForce RTX 2080', imageUrl: 'RTX2080.png', price: 34000 },
    { name: 'Intel Core i7', imageUrl: 'IntelCorei7.png', price: 17500 }
];



function loadProducts() {
    const productsSection = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        
        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;
        
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Добавить в корзину';
        buyButton.addEventListener('click', () => buyProduct(product));
        
        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(buyButton);
        
        if (index < 5) {
            productsSection.appendChild(productDiv);
        } else {
            productsSection2.appendChild(productDiv);
        }
    });
}

function setupButtons() {
    const buyButtons = document.querySelectorAll('.product button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentNode.querySelector('h2').textContent;
            const product = products.find(product => product.name === productName);
            buyProduct(product);
        });
    });
}

function filterProducts(manufacturer) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(manufacturer.toLowerCase()));
    renderProducts(filteredProducts);
}

function resetFilter() {
    renderProducts(products);
}

function renderProducts(productsToShow) {
    const productsSection1 = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    productsSection1.innerHTML = '';
    productsSection2.innerHTML = '';

    productsToShow.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Добавить в корзину';
        buyButton.addEventListener('click', () => buyProduct(product));

        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(buyButton);

        if (index < 5) {
            productsSection1.appendChild(productDiv);
        } else {
            productsSection2.appendChild(productDiv);
        }
    });
}

const cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Цена: ${product.price} руб. (Количество: ${product.quantity})`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeFromCart(product.name));
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    totalPriceElement.textContent = totalPrice;
}

function buyProduct(product) {
    addToCart(product);
    updateTotalPrice();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    renderCart();
}

window.onload = function() {
    loadProducts();
    setupButtons();
    renderProducts(products);
};

const nvidiaLogo = document.querySelector('.nvidia-logo');
nvidiaLogo.classList.add('rotate');

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваша корзина пуста. Добавьте товары в корзину перед оформлением заказа.');
    } else {
        alert('Ваш заказ успешно оформлен!');
        cart.length = 0;
        renderCart();
        updateTotalPrice();
    }
});

