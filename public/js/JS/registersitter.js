document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const fullName = document.getElementById('fullName');
    const gender = document.getElementById('gender');
    const email = document.getElementById('email');
    const dateOfBirth = document.getElementById('dateofBirth');
    const nextOfKin = document.getElementById('nextofKin');
    const nin = document.getElementById('nin');
    const religion = document.getElementById('religion');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const experience = document.getElementById('experience');
    const recommendersName = document.getElementById('recommendersName');
    const levelOfEducation = document.getElementById('levelofEducation');
    const role = document.getElementById('role');
    const sitterNumber = document.getElementById('sitterNumber');
    const availability = document.getElementById('availability');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Full Name validation
        if (fullName.value.trim() === '') {
            showError(fullName, "Full Name is required.");
            isValid = false;
        }

        // Gender validation
        if (gender.value === '') {
            showError(gender, "Gender is required.");
            isValid = false;
        }

        // Email address validation
        if (email.value.trim() === '') {
            showError(email, "Email address is required.");
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Date of Birth validation
        if (dateOfBirth.value === '') {
            showError(dateOfBirth, "Date of Birth is required.");
            isValid = false;
        }

        // Next of Kin validation
        if (nextOfKin.value.trim() === '') {
            showError(nextOfKin, "Next of Kin is required.");
            isValid = false;
        }

        // NIN validation
        if (nin.value.trim() === '') {
            showError(nin, "NIN is required.");
            isValid = false;
        }

        // Religion validation
        if (religion.value.trim() === '') {
            showError(religion, "Religion is required.");
            isValid = false;
        }

        // Phone Number validation
        if (phone.value.trim() === '') {
            showError(phone, "Phone Number is required.");
            isValid = false;
        } else if (!/^\+?\d{10,15}$/.test(phone.value)) {
            showError(phone, "Please enter a valid phone number.");
            isValid = false;
        }

        // Address validation
        if (address.value.trim() === '') {
            showError(address, "Address is required.");
            isValid = false;
        }

        // Experience validation
        if (experience.value.trim() === '') {
            showError(experience, "Experience is required.");
            isValid = false;
        }

        // Recommender's Name validation
        if (recommendersName.value.trim() === '') {
            showError(recommendersName, "Recommender's Name is required.");
            isValid = false;
        }

        // Level of Education validation
        if (levelOfEducation.value.trim() === '') {
            showError(levelOfEducation, "Level of Education is required.");
            isValid = false;
        }

        // Role validation
        if (role.value.trim() === '') {
            showError(role, "Role is required.");
            isValid = false;
        }

        // Sitter Number validation
        if (sitterNumber.value.trim() === '') {
            showError(sitterNumber, "Sitter Number is required.");
            isValid = false;
        }

        // Availability validation
        if (availability.value.trim() === '') {
            showError(availability, "Availability is required.");
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
