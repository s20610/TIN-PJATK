function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const specializationInput = document.getElementById('specializationId');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorSpecialization = document.getElementById('errorSpecialization');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const lengthErrorMessage = document.getElementById('errorMessage-lengthError').innerText;

    resetErrors([firstNameInput,lastNameInput,emailInput,specializationInput], [errorFirstName,errorLastName,errorEmail,errorSpecialization], errorsSummary);
    let valid = true;
//Walidacja imion
    if(!checkRequired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = lengthErrorMessage;
    }
//Walidacja nazwisk
    if(!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = lengthErrorMessage;
    }
// //Walidacja adresów email
//     if (! checkTextLengthRange (emailInput.value, 5, 60)) {
//         valid = false;
//         emailInput.classList.add ("error-input");
//         errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
//     } else if (!checkEmail (emailInput.value)) {
//         valid = false;
//         emailInput.classList.add ("error-input");
//         errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
//     }
    //Walidacja specjalizacji
    if(!checkRequired(specializationInput.value)) {
        valid = false;
        specializationInput.classList.add("error-input");
        errorSpecialization.innerText = reqMessage;
    }
    if(!checkRequired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }

    if (!valid) {
        errorsSummary.innerText = formErrorMessage;
    }
    return valid;
}