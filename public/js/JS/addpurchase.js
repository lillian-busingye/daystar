
    function validateForm() {
      let isValid = true;
      const item = document.getElementById('item');
      const dateOfPurchase = document.getElementById('dateOfPurchase');
      const unit = document.getElementById('unit');
      const quantity = document.getElementById('quantity');
      const rate = document.getElementById('rate');
      const amount = document.getElementById('amount');

      clearErrors();

      if (item.value.trim() === '') {
        showError(item, "Item is required.");
        isValid = false;
      }
      if (dateOfPurchase.value.trim() === '') {
        showError(dateOfPurchase, "Date of Purchase is required.");
        isValid = false;
      }
      if (unit.value.trim() === '') {
        showError(unit, "Unit is required.");
        isValid = false;
      }
      if (quantity.value.trim() === '' || quantity.value <= 0) {
        showError(quantity, "Quantity must be a positive number.");
        isValid = false;
      }
      if (rate.value.trim() === '' || rate.value <= 0) {
        showError(rate, "Rate must be a positive number.");
        isValid = false;
      }
      if (amount.value.trim() === '' || amount.value <= 0) {
        showError(amount, "Amount must be a positive number.");
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
  