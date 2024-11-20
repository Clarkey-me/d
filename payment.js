document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("paymentForm");

    // Get the current user's identifier (email or username)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));  // Assuming currentUser contains the user's info
    const currentUserEmail = currentUser?.email || "";  // Safely retrieve the email from currentUser object

    // Load the cart items for the current user
    const cartItems = JSON.parse(localStorage.getItem(currentUserEmail + "_cart")) || [];

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        // Get the values from the form fields
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const address = document.getElementById("address").value;
        const landmark = document.getElementById("landmark").value;
        const postalCode = document.getElementById("postalCode").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        // Create an object for the payment details
        const paymentDetails = {
            name,
            contact,
            address,
            landmark,
            postalCode,
            paymentMethod
        };

        // Save payment details to localStorage
        localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

        // Remove the current user's cart items after payment
        localStorage.removeItem(currentUserEmail + "_cart");  // This clears the cart for the current user

        // Redirect to the confirmation page
        window.location.href = "confirmation.html";
    });
});
