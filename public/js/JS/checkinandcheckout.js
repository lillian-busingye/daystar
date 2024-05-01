document.getElementById('check').addEventListener('submit',function(event){
    event.preventDefault();
const FullName = document.getElementById('name').value
const location = document.getElementById('location').value
const Contacts = document.getElementById('contact').value
const Reason = document.getElementById('reason').value
const Date = document.getElementById('date').value
const timeIn = document.getElementById('in').value
const timeOut = document.getElementById('out').value



const message = document.getElementById('message');
message.innerHTML = `<div> Thank you!</div>`


if (FullName.trim() === '' || location.trim() === '' || Reason.trim() === '' ||   Date.trim() === '' || timeIn.trim() === '' || timeOut .trim() === '' || Contacts.trim() === '') {
    alert("Please fill in all fields.");
    return;
  }



//reset form
document.getElementById('check').reset();


})