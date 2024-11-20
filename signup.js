document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const address = document.getElementById("address").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;
        const newPassword = document.getElementById("newPassword").value;

        if (!firstName || !lastName || !emailAddress || !newPassword || !contactNumber || !address) {
            alert("Please fill out all the required fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(user => user.emailAddress === emailAddress);
        if (existingUser) {
            alert("Email address already registered. Please use another email.");
            return;
        }

        const newUser = {
            firstName,
            lastName,
            contactNumber,
            address,
            emailAddress,
            password: newPassword
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");
        window.location.href = "login.html";
    });
});
