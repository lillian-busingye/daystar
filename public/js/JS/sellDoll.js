
    function validateForm() {
      let isValid = true;

      const dateOfSell = document.getElementById('dateOfSell');
      const quantity = document.getElementById('quantity');

      clearErrors();

      if (dateOfSell.value.trim() === '') {
        showError(dateOfSell, "Date of Sell is required.");
        isValid = false;
      }

      if (quantity.value.trim() === '' || quantity.value <= 0) {
        showError(quantity, "Quantity must be a positive number.");
        isValid = false;
      }

      return isValid;
    }

    function showError(input, message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error';
      errorElement.style.color = 'red';
      errorElement.textContent = message;
      input.parentNode.appendChild(errorElement);
    }

    function clearErrors() {
      document.querySelectorAll('.error').forEach(el => el.remove());
    }
  