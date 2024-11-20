document.addEventListener("DOMContentLoaded", () => {
    const productDetailsSection = document.getElementById("product-details");

    // Get the product index from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productIndex = urlParams.get("index");

    if (productIndex === null) {
        productDetailsSection.innerHTML = "<p>No product index provided.</p>";
        return;
    }

    // Load products from local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Check if products are stored in localStorage
    if (products.length === 0) {
        productDetailsSection.innerHTML = "<p>No products available.</p>";
        return;
    }

    // Get the product based on the index
    const product = products[parseInt(productIndex)];

    if (product) {
        // Display product details
        productDetailsSection.innerHTML = `
            <div class="product-detail-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Size:</strong> ${product.size}</p>
                    <p><strong>Price:</strong> ₱${product.price}</p>
                    <button class="add-to-cart" data-index="${productIndex}">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        // Add to Cart functionality
        const addToCartBtn = document.querySelector(".add-to-cart");
        if (addToCartBtn) {
            addToCartBtn.addEventListener("click", () => {
                addToCart(product);
            });
        }
    } else {
        productDetailsSection.innerHTML = "<p>Product not found.</p>";
    }

    // Function to add the product to the cart in local storage
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.name === product.name);

        if (existingItem) {
            alert(`Only 1 ${product.name} is allowed in the cart.`);
        } else {
            // Add new product to cart with quantity 1
            cartItems.push({ ...product, quantity: 1 });
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            alert(`${product.name} added to cart!`);
        }
    }
});
