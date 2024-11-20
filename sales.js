document.addEventListener("DOMContentLoaded", () => {
    const salesTableBody = document.getElementById("salesTableBody");

    // Get all user emails stored in localStorage
    const allUsers = Object.keys(localStorage).filter(key => key.includes("_salesHistory"));

    if (allUsers.length === 0) {
        alert("No users found or no sales history data available.");
        return;
    }

    // Function to render the sales data for each user
    function renderSales() {
        salesTableBody.innerHTML = ""; // Clear any existing rows

        // Loop through each user and their associated sales history
        allUsers.forEach(userKey => {
            const userEmailKey = userKey.replace("_salesHistory", ""); // Extract the email from the key
            
            // Get the user object associated with the userEmailKey from localStorage
            const user = JSON.parse(localStorage.getItem(userEmailKey)) || {};
            const emailAddress = user.emailAddress; // Get the emailAddress from the user object

            // Get the sales data associated with the user's email
            const salesData = JSON.parse(localStorage.getItem(userKey)) || [];

            // Check if there is no sales data for the current user
            if (salesData.length === 0) {
                const noDataRow = document.createElement("tr");
                noDataRow.innerHTML = `<td colspan='6'>No sales data available for ${emailAddress}.</td>`;
                salesTableBody.appendChild(noDataRow);
                return;
            }

            // Loop through each sale and create a table row
            salesData.forEach(sale => {
                const row = document.createElement("tr");

                // Calculate the total amount for this sale
                let totalAmount = 0;
                sale.products.forEach(product => {
                    totalAmount += product.price * product.quantity;
                });

                const formattedTotalAmount = `₱${totalAmount.toFixed(2)}`;

                // Display the sale details, including the user's email
                row.innerHTML = `
                    <td>${sale.orderId}</td>
                    <td>${sale.date}</td>
                    <td>${sale.products.map(product => product.name).join(", ")}</td>
                    <td>${sale.products.map(product => product.size).join(", ")}</td>
                    <td>${formattedTotalAmount}</td>
                    <td>${userEmailKey}</td> <!-- Displaying the email address from user object -->
                `;

                salesTableBody.appendChild(row);
            });
        });
    }

    // Logout function for admin
    const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    // Clear user data from localStorage or session
    localStorage.removeItem("currentUser");  // Assuming you store current user data in 'currentUser'
    
    // Optionally, redirect to login page or home page
    alert("You have logged out successfully.");
    window.location.href = "guestindex.html";  // Replace with your actual login page URL

    // Render the sales data when the page loads
    renderSales();
});

});
