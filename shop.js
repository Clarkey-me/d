document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const brandSearch = document.getElementById("brand-search");
    const priceSearch = document.getElementById("price-search");
    const pagination = document.getElementById("pagination");
    const currentUser = localStorage.getItem("currentUser");  // Get the logged-in user

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const productsPerPage = 5;  // Number of products per page
    let currentPage = 1;

    // Render products on the page based on the current page and filter
    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ""; // Clear the grid before rendering new content
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        paginatedProducts.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <a href="viewproduct.html?index=${index}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <h5>${product.size}</h5>
                    <h4>₱${product.price}</h4>
                </div>
                <button class="add-to-cart" data-index="${index}">
                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
            `;

            productGrid.appendChild(productCard);
        });
        
        renderPaginationButtons(filteredProducts.length);
    }

    // Filter products based on search criteria (brand and price)
    function filterProducts() {
        const brandValue = brandSearch.value.toLowerCase();
        const maxPrice = parseFloat(priceSearch.value) || Infinity;

        const filteredProducts = products.filter(product => {
            const matchesBrand = product.brand.toLowerCase().includes(brandValue);
            const matchesPrice = product.price <= maxPrice;
            return matchesBrand && matchesPrice;
        });

        currentPage = 1; // Reset to the first page after filtering
        renderProducts(filteredProducts);
    }

    // Render pagination buttons based on the total number of products
    function renderPaginationButtons(totalProducts) {
        pagination.innerHTML = "";  // Clear previous pagination buttons
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.classList.add("pagination-button");
            if (i === currentPage) pageButton.classList.add("active");

            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderProducts();
            });

            pagination.appendChild(pageButton);
        }
    }

    // Event listeners for search inputs
    brandSearch.addEventListener("input", filterProducts);
    priceSearch.addEventListener("input", filterProducts);

    renderProducts();  // Initial render of products

    // Add to Cart functionality
    productGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productIndex = e.target.getAttribute("data-index");
            const selectedProduct = products[productIndex];
            addToCart(selectedProduct);
        }
    });

    // Function to add a product to the cart in local storage
    function addToCart(product) {
        if (!currentUser) {
            alert("Please log in to add items to the cart.");
            return;
        }

        // Get the current user's cart from localStorage or initialize an empty array
        let userCart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];

        // Check if the product is already in the cart
        const existingItem = userCart.find(item => item.name === product.name);

        if (existingItem) {
            alert(`${product.name} is already in the cart. Only 1 item is available.`);
        } else {
            userCart.push({ ...product, quantity: 1 });
            alert(`${product.name} added to cart!`);
        }

        // Save the updated cart for the current user
        localStorage.setItem(currentUser + "_cart", JSON.stringify(userCart));
    }
});
