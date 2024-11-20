document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.querySelector("#userTable tbody");

    // Load users from local storage or initialize with example data
    const users = JSON.parse(localStorage.getItem("users"));

    // Save users to local storage if not already present
    localStorage.setItem("users", JSON.stringify(users));

    // Function to render user rows in the table
    function renderUsers() {
        userTableBody.innerHTML = ""; // Clear existing rows

        users.forEach((user, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.contactNumber}</td>
                <td>${user.address}</td>
                <td>${user.emailAddress}</td>
                <td>${user.password}</td>
                <td>${user.lastLogin || "Never Logged In"}</td>
                <td>
                    <button class="enable-btn ${user.status === 'active' ? 'active' : ''}" data-index="${index}">
                        Enable
                    </button>
                    <button class="disable-btn ${user.status === 'disabled' ? 'active' : ''}" data-index="${index}">
                        Disable
                    </button>
                </td>
            `;

            userTableBody.appendChild(row);
        });
    }

    // Function to disable a user
    function disableUser(index) {
        const user = users[index];
        user.status = "disabled"; // Set user status to disabled
        localStorage.setItem("users", JSON.stringify(users)); // Save updated users to localStorage
        renderUsers(); // Re-render the table with updated users
    }

    // Function to enable a user
    function enableUser(index) {
        const user = users[index];
        user.status = "active"; // Set user status to active
        localStorage.setItem("users", JSON.stringify(users)); // Save updated users to localStorage
        renderUsers(); // Re-render the table with updated users        
    }

    // Event delegation for enable and disable buttons
    userTableBody.addEventListener("click", (event) => {
        const target = event.target;
        const index = target.getAttribute("data-index");

        if (target.classList.contains("disable-btn")) {
            disableUser(index); // Disable the user
        } else if (target.classList.contains("enable-btn")) {
            enableUser(index); // Enable the user
        }
    });

    // Logout function
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        // Clear user data from localStorage or session
        localStorage.removeItem("currentUser"); // Assuming you store current user data in 'currentUser'

        // Optionally, redirect to login page or home page
        alert("You have logged out successfully.");
        window.location.href = "guestindex.html"; // Replace with your actual login page URL
    });

    // Render users when the page loads
    renderUsers(); // Initial render of the users
});
