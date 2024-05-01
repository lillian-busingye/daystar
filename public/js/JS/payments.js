var stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

// Create an instance of Elements
var elements = stripe.elements();

// Create an instance of the card Element
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');

// Handle form submission
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  form.querySelector('button').disabled = true;

  // Collect card details and create a token
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Display error message to the user
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;

      // Enable the submit button
      form.querySelector('button').disabled = false;
    } else {
      // Token represents a valid payment method, submit the form
      // You can send the token to your server for further processing
      var token = result.token;
      // Add the token to the form data before submitting
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
      // Submit the form
      form.submit();
    }
  });
});