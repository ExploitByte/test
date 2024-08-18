document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('registerEmail').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        // Check if the email is already registered
        if (localStorage.getItem(email)) {
            errorMessage.textContent = 'Email already exists in another account.';
            return;
        }

        // Save credentials to localStorage
        localStorage.setItem(email, JSON.stringify({ username, password }));

        // Redirect to login page after successful registration
        window.location.href = 'login.html';
    });
});
