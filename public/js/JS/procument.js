document.getElementById("procurementForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const item = document.getElementById("item").value;
    const quantity = document.getElementById("quantity").value;
    const description = document.getElementById("description").value;
    
    if (item.trim() === '' || quantity.trim() === '' || description.trim() === '') {
      document.getElementById("message").innerHTML = '<p id="error">All fields are required.</p>';
      return;
    }
  
    // Here you can send the form data to your server using AJAX or fetch API
    // Example:
    /*
    fetch('your-server-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item,
        quantity: quantity,
        description: description
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      console.log(data);
      document.getElementById("message").innerHTML = '<p>Procurement request submitted!</p>';
      document.getElementById("procurementForm").reset();
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      document.getElementById("message").innerHTML = '<p id="error">Failed to submit procurement request. Please try again later.</p>';
    });
    */
  
    // For the sake of this example, let's just show a success message without sending the data anywhere.
    document.getElementById("message").innerHTML = '<p>Procurement request submitted!</p>';
    document.getElementById("procurementForm").reset();
  });
  