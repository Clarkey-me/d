document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser"); 
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    const cartItems = JSON.parse(localStorage.getItem(currentUser + "_checkoutItems")) || [];

    // Populate payment details in the confirmation page
    if (paymentDetails) {
        document.getElementById("confirmName").textContent = paymentDetails.name;
        document.getElementById("confirmContact").textContent = paymentDetails.contact;
        document.getElementById("confirmAddress").textContent = paymentDetails.address;
        document.getElementById("confirmLandmark").textContent = paymentDetails.landmark || "N/A";
        document.getElementById("confirmPostalCode").textContent = paymentDetails.postalCode;
        document.getElementById("confirmPaymentMethod").textContent = paymentDetails.paymentMethod;
    }

    // Populate cart items in the confirmation page
    const cartItemsTableBody = document.getElementById("cartItemsTableBody");  // Ensure this ID matches your table body
    let totalAmount = 0;

    console.log(cartItems);
    if (cartItems.length > 0) {
        cartItems.forEach((item) => {
            // Ensure item.price is a number
            const price = parseFloat(item.price);
            const itemTotal = price * item.quantity;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₱${price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₱${itemTotal.toFixed(2)}</td>
            `;
            cartItemsTableBody.appendChild(row);
            totalAmount += itemTotal;
        });
    } else {
        cartItemsTableBody.innerHTML = "<tr><td colspan='4' style='text-align: center;'>No items in your cart.</td></tr>";
    }

    // Display total amount
    document.getElementById("totalAmount").textContent = `₱${totalAmount.toFixed(2)}`;

    // Back to Shop button functionality
    const backToShopButton = document.getElementById("backToShop");

    backToShopButton.addEventListener("click", () => {
        if (paymentDetails && cartItems.length > 0) {
            // Save pending data for the admin page
            const pendingData = { buyer: paymentDetails, products: cartItems };
            localStorage.setItem("pendingData", JSON.stringify(pendingData));

            // Redirect to the shop page
            window.location.href = "shop.html";  // Ensure this is the correct page URL
        } else {
            alert("No data available to process.");
        }
    });
});
