document.getElementById('loginForm').addEventListener('submit',function(event){
    event.preventDefault();
const username = document.getElementById('username').value
const password = document.getElementById('password').value


//validate the username and password
if(username === 'admin' && password === '1234'){
    document.getElementById("message").innerHTML = '<p>Login successful! Redirecting...</p>';
    setTimeout(function() {
      window.location.href = 'dashboard.html'; // Redirect to admin dashboard
    }, 2000); // Redirect after 2 seconds
  // } else if(username === 'lilian' && password === '4567') {
  //   document.getElementById("message").innerHTML = '<p>Login successful! Redirecting...</p>';
  //   setTimeout(function() {
  //     window.location.href = 'parentsdashboard.html'; // Redirect to admin dashboard
  //   }, 2000); // Redirect after 2 seconds
  } else {
    // If the username or password is incorrect, display an error message
    document.getElementById("message").innerHTML = '<p id="error">Invalid username or password.</p>';
  }
});




// const message = document.getElementById('message');
// message.innerHTML = `<div> Login successful! Redirecting... </div>`

//reset form
document.getElementById('loginform').reset();

