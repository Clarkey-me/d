document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Predefined admin credentials
    const adminEmail = 'admin@example.com'; 
    const adminPassword = 'admin123'; 

    // Clear error message when user starts typing
    const clearErrorMessage = () => {
        errorMessage.textContent = '';
    };

    // Event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrorMessage();

        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate input
        if (!email || !password) {
            errorMessage.textContent = 'Please enter both email and password.';
            return;
        }

        // Admin login check
        if (email === adminEmail && password === adminPassword) {
            const now = new Date().toLocaleString();
            const adminData = {
                email: adminEmail,
                role: 'admin',
                lastLogin: now,
            };
            localStorage.setItem('currentUser', JSON.stringify(adminData));
            alert('Admin logged in successfully!');
            window.location = 'admin.html'; // Redirect to admin dashboard
            return;
        }

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find user by email and password
        const user = users.find(user => user.emailAddress === email && user.password === password);

        if (user) {
            // Check if user is disabled
            if (user.status === 'disabled') {
                errorMessage.textContent = "Your account has been disabled. Please contact support.";
                return;
            }

            // Update lastLogin and save it to localStorage
            const now = new Date().toLocaleString();
            user.lastLogin = now;
            localStorage.setItem('users', JSON.stringify(users));

            // Save the current user session
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.emailAddress,
                role: 'user',
                firstName: user.firstName,
                lastName: user.lastName,
                lastLogin: now,
            }));

            alert('Login successful!');
            window.location = 'index.html'; // Redirect to user dashboard
        } else {
            errorMessage.textContent = 'Invalid email or password. Please try again.';
        }
    });

    // Attach event listeners for input fields to clear error messages
    document.getElementById('username').addEventListener('input', clearErrorMessage);
    document.getElementById('password').addEventListener('input', clearErrorMessage);
});
