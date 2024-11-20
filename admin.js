document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productTableBody = document.getElementById("productTableBody");
    const logoutBtn = document.getElementById("logoutBtn");  // Logout button element

    // Load products from local storage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Save products to local storage
    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    // Render products in the table
    function renderProducts() {
        productTableBody.innerHTML = ""; // Clear existing rows
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${parseInt(product.size,10)} US</td>
                <td>₱${Number(product.price).toFixed(2)}</td>
                <td>
                    <button class="action-btn edit" data-index="${index}">Edit</button>
                    <button class="action-btn delete" data-index="${index}">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Handle form submission
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const productId = document.getElementById("productId").value;
        const productName = document.getElementById("productName").value.trim();
        const productBrand = document.getElementById("productBrand").value.trim();
        const productSize = document.getElementById("productSize").value.trim();
        const productPrice = document.getElementById("productPrice").value.trim();
        const productImageInput = document.getElementById("productImage");

        // Validation
        if (!productName || !productBrand || !productSize || !productPrice) {
            alert("All fields except the image are required!");
            return;
        }

        // Handle image upload
        if (productImageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const productImage = event.target.result; // Data URL of the image

                const product = {
                    name: productName,
                    brand: productBrand,
                    size: productSize,
                    price: productPrice,
                    image: productImage
                };

                if (productId) {
                    // Update product
                    products[productId] = product;
                } else {
                    // Add new product
                    products.push(product);
                }

                productForm.reset();
                saveProducts();
                renderProducts();
            };

            reader.readAsDataURL(productImageInput.files[0]);
        } else if (productId) {
            // Update product without changing image
            const existingProduct = products[productId];
            products[productId] = {
                ...existingProduct,
                name: productName,
                brand: productBrand,
                size: productSize,
                price: productPrice
            };

            productForm.reset();
            saveProducts();
            renderProducts();
        } else {
            alert("Please upload an image for new products.");
        }
    });

    // Event delegation for edit and delete buttons
    productTableBody.addEventListener("click", (event) => {
        const target = event.target;
        const index = target.getAttribute("data-index");

        if (target.classList.contains("edit")) {
            editProduct(index);
        } else if (target.classList.contains("delete")) {
            deleteProduct(index);
        }
    });

    // Edit product
    function editProduct(index) {
        const product = products[index];
        document.getElementById("productId").value = index;
        document.getElementById("productName").value = product.name;
        document.getElementById("productBrand").value = product.brand;
        document.getElementById("productSize").value = product.size;
        document.getElementById("productPrice").value = product.price;
        // Clear file input, as browser security doesn't allow setting its value
        document.getElementById("productImage").value = "";
    }

    // Delete product
    function deleteProduct(index) {
        if (confirm("Are you sure you want to delete this product?")) {
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        }
    }

    // Logout function
    logoutBtn.addEventListener("click", () => {
        // Clear user data from localStorage or session
        localStorage.removeItem("currentUser");  // Assuming you store current user data in 'currentUser'
        
        // Optionally, redirect to login page or home page
        alert("You have logged out successfully.");
        window.location.href = "guestindex.html";  // Replace with your actual login page URL
    });

    // Initial render
    renderProducts();
});
