function validateForm() {
    // Get form inputs
    const dollName = document.getElementById('dollName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const rate = parseInt(document.getElementById('rate').value);
    const dateOfPurchase = document.getElementById('dateOfPurchase').value.trim();
    const description = document.getElementById('description').value.trim();
  
    // Check if any field is empty
    if (!dollName || !quantity || !rate || !dateOfPurchase || !description) {
        alert('Please fill out all fields.');
        return false; // Prevent form submission
    }
  
    // Check if quantity and rate are valid numbers
    if (isNaN(quantity) || isNaN(rate) || quantity <= 0 || rate <= 0) {
        alert('Please enter valid numbers for Quantity and Rate.');
        return false; // Prevent form submission
    }
  
    return true; // Proceed with form submission
  }
  
  // Function to calculate amount based on quantity and rate
function calculateAmount() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const rate = parseInt(document.getElementById('rate').value);
  
    // Calculate amount
    const amount = quantity * rate;
  
    // Display calculated amount in the amount input field
    document.getElementById('amount').value = amount;
  }
  
  // Attach calculateAmount function to quantity and rate input fields (on input change)
document.getElementById('quantity').addEventListener('input', calculateAmount);
document.getElementById('rate').addEventListener('input', calculateAmount);