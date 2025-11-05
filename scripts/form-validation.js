// form-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Clear previous errors
            clearErrors();

            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Поле имени обязательно для заполнения');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Поле email обязательно для заполнения');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Введите корректный email адрес');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Поле сообщения обязательно для заполнения');
                isValid = false;
            }

            if (isValid) {
                // Form submission logic
                alert('Форма успешно отправлена!');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        input.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});