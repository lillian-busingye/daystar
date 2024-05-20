
    document.addEventListener('DOMContentLoaded', function () {
      const form = document.getElementById('checkoutForm');
      const timeofDeparture = document.getElementById('timeofDeparture');
      const sitterSelect = document.getElementById('sitter');

      form.addEventListener('submit', function (event) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Time of Departure validation
        if (timeofDeparture.value.trim() === '') {
          showError(timeofDeparture, "Please enter the time of departure.");
          isValid = false;
        }

        // Sitter validation
        if (sitterSelect.value.trim() === '') {
          showError(sitterSelect, "Please assign a sitter.");
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
    });
  