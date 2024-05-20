document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const babyName = document.getElementById('babyName');
    const babyDOB = document.getElementById('babyDOB');
    const gender = document.getElementById('gender');
    const parentName = document.getElementById('parentName');
    const contactNumber = document.getElementById('contactNumber');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const babyNumber = document.getElementById('babyNumber');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Baby's Name validation
        if (babyName.value.trim() === '') {
            showError(babyName, "Baby's name is required.");
            isValid = false;
        }

        // Date of Birth validation
        if (babyDOB.value === '') {
            showError(babyDOB, "Date of birth is required.");
            isValid = false;
        }

        // Gender validation
        if (gender.value === '') {
            showError(gender, "Gender is required.");
            isValid = false;
        }

        // Parent/Guardian's Name validation
        if (parentName.value.trim() === '') {
            showError(parentName, "Parent/guardian's name is required.");
            isValid = false;
        }

        // Contact Number validation
        if (contactNumber.value.trim() === '') {
            showError(contactNumber, "Contact number is required.");
            isValid = false;
        } else if (!/^\+?\d{10,15}$/.test(contactNumber.value)) {
            showError(contactNumber, "Please enter a valid contact number.");
            isValid = false;
        }

        // Email Address validation
        if (email.value.trim() === '') {
            showError(email, "Email address is required.");
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Address validation
        if (address.value.trim() === '') {
            showError(address, "Address is required.");
            isValid = false;
        }

        // Baby's Number validation
        if (babyNumber.value.trim() === '') {
            showError(babyNumber, "Baby's number is required.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.style.color = 'red';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
