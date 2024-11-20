document.addEventListener("DOMContentLoaded", () => {
    const salesHistoryTableBody = document.getElementById("salesHistoryTableBody");
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Parse the current user

    if (!currentUser || !currentUser.email) {
        alert("No user found. Please log in.");
        return;
    }

    const salesHistoryKey = `${currentUser.email}_salesHistory`;

    // Retrieve sales history from localStorage
    const salesHistory = JSON.parse(localStorage.getItem(salesHistoryKey)) || [];

    if (salesHistory.length === 0) {
        salesHistoryTableBody.innerHTML = "<tr><td colspan='5' style='text-align: center;'>No sales history available.</td></tr>";
    } else {
        salesHistory.forEach(sale => {
            const saleDate = sale.date; // The date when the order was made

            sale.products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${saleDate}</td>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.size || 'N/A'}</td>
                    <td>₱${sale.totalAmount}</td>
                `;
                salesHistoryTableBody.appendChild(row);
            });
        });
    }

    // Back to Shop button functionality
    const backToShopButton = document.getElementById("backToShop");
    backToShopButton.addEventListener("click", () => {
        window.location.href = "shop.html";  // Adjust the path as needed
    });
});
