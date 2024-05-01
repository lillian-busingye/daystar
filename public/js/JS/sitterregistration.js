document.getElementById('sitterForm').addEventListener('submit',function(event){
    event.preventDefault();
const SittersFullName = document.getElementById('name').value
const location = document.getElementById('location').value
const NextofKinNames = document.getElementById('kin-name').value
const age = document.getElementById('age').value
const LevelofEducation = document.getElementById('education').value
const nin = document.getElementById('nin').value
const Sitternumber = document.getElementById('sitternumber').value
const Contacts = document.getElementById('contact').value
const RegisterNow = document.getElementById('register').value
const Gender = document.getElementById('gender').value


const message = document.getElementById('message');
message.innerHTML = `<div> Sitter Registered</div>`


if (SittersFullName.trim() === '' || location.trim() === '' || NextofKinNames.trim() === '' || age.trim() === '' ||  LevelofEducation .trim() === '' || nin.trim() === '' || Sitternumber.trim() === '' || Contacts.trim() === '' || RegisterNow.trim() === '' || Gender.trim() === '') {
    alert("Please fill in all fields.");
    return;
  }

//reset form
document.getElementById('sitterForm').reset();


})