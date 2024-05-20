
    document.addEventListener('DOMContentLoaded', function () {
      const form = document.getElementById('checkinForm');
      const babyName = document.getElementById('babyName');
      const personBrought = document.getElementById('personBrought');
      const contactBrought = document.getElementById('contactBrought');
      const sitter = document.getElementById('sitter');

      form.addEventListener('submit', function (event) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Baby Name validation
        if (babyName.value === '') {
          showError(babyName, "Please select a baby's name.");
          isValid = false;
        }

        // Person Who Brought validation
        if (personBrought.value.trim() === '') {
          showError(personBrought, "Please enter the name of the person who brought the baby.");
          isValid = false;
        }

        // Contact for Person Who Brought validation
        if (contactBrought.value.trim() === '') {
          showError(contactBrought, "Please enter the contact number or email of the person who brought the baby.");
          isValid = false;
        } else if (!validateContact(contactBrought.value)) {
          showError(contactBrought, "Please enter a valid contact number or email.");
          isValid = false;
        }

        // Sitter validation
        if (sitter.value === '') {
          showError(sitter, "Please select a sitter.");
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

      function validateContact(contact) {
        const phoneRegex = /^\+?\d{10,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return phoneRegex.test(contact) || emailRegex.test(contact);
      }
    });
  