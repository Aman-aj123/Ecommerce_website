// Initializing the important variables
const formElement = document.querySelector('form');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passowordInput = document.querySelector('#passoword');
const phoneInput = document.querySelector('#phone');
const commonError = document.querySelector('.common-error');

// This function will show the error messages.
function showErrorMessages(errorItem, message) {
     const errorElement = document.querySelector(errorItem);
     errorElement.innerHTML = message;
}

// validateForm function
function validateForm() {
     // return false;

     // Name validation code 
     const nameInputLength = nameInput.value.trim().length;
     if (nameInputLength >= 1 && nameInputLength < 6) {
          showErrorMessages('.name_error', 'Name is too short.');
          return false;
     } else if (nameInputLength > 20) {
          showErrorMessages('.name_error', 'Name is too long.');
          return false;
     }
     showErrorMessages('.name_error', '');

     // Password validation code
     const passowordInputLength = passowordInput.value.trim().length;
     if (passowordInputLength >= 1 && passowordInputLength < 6) {
          showErrorMessages('.passoword_error', 'Password is too short.');
          return false;
     }
     else if (passowordInputLength > 20) {
          showErrorMessages('.passoword_error', 'Password is too long.');
          return false;
     }
     showErrorMessages('.passoword_error', '');

     // Phone Number validation
     const phoneInputLength = phoneInput.value.trim().length;
     if (phoneInputLength >= 1 && phoneInputLength < 10) {
          showErrorMessages(".phone_error", "Envalied phone number.")
          return false;
     }
     showErrorMessages(".phone_error", "");

     return true;
}



// Adding the event listener to the form after submit
formElement.addEventListener('submit', validateForm);
