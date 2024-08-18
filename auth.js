document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Retrieve user data from localStorage
        const userData = localStorage.getItem(email);
        if (userData) {
            const { username, password: storedPassword } = JSON.parse(userData);

            if (password === storedPassword) {
                // Redirect to dashboard if credentials match
                window.location.href = 'dashboard.html';
            } else {
                // Display error message if password is incorrect
                errorMessage.textContent = 'Invalid password.';
            }
        } else {
            // Display error message if email does not exist
            errorMessage.textContent = 'Email not registered. Please create an account.';
        }
    });
});
