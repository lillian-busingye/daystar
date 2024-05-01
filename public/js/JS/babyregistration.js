document.getElementById('babyForm').addEventListener('submit',function(event){
    event.preventDefault();
const babyName = document.getElementById('name').value
const dateOfBirth = document.getElementById('age').value
const parentName = document.getElementById('parent').value
const Contacts = document.getElementById('contact').value
const parentAddress  = document.getElementById('address').value
const nextOfKin = document.getElementById('kin').value


if (babyName.trim() === '' || parentName.trim() === '' || Contacts.trim() === '' || dateOfBirth.trim() === '' || parentAddress.trim() === '' || nextOfKin.trim() === '') {
    alert("Please fill in all fields.");
    return;
  }
  
  if (!isValidPhoneNumber(contactNumber)) {
    alert("Please enter a valid contact number.");
    return;
  }

const message = document.getElementById('message');
message.innerHTML = `<div> Baby Registered</div>`

alert("Baby registration successful!");

//reset form
document.getElementById('babyForm').reset();
});