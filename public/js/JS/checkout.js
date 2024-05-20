
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('checkoutForm');
  const personPickingUp = document.getElementById('personPickingUp');
  const contactNumber = document.getElementById('contactNumber');

  form.addEventListener('submit', function (event) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(el => el.remove());

    // Person Picking Up validation
    if (personPickingUp.value.trim() === '') {
      showError(personPickingUp, "Please enter the name of the person picking up the baby.");
      isValid = false;
    }

    // Contact Number validation
    if (contactNumber.value.trim() === '') {
      showError(contactNumber, "Please enter the contact number of the person picking up the baby.");
      isValid = false;
    } else if (!validateContactNumber(contactNumber.value)) {
      showError(contactNumber, "Please enter a valid contact number.");
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

  function validateContactNumber(contactNumber) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(contactNumber);
  }
});
