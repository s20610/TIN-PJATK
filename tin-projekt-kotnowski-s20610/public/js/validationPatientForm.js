function validateForm() {
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const chronicDiseasesInput = document.getElementById('chronicDiseases');
const peselInput = document.getElementById('pesel');

const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorChronicDiseases = document.getElementById('errorChronicDiseases');
const errorPESEL = document.getElementById('errorPesel');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthErrorMessage = document.getElementById('errorMessage-lengthError').innerText;
    const lengthError2Message = document.getElementById('errorMessage-length2Error').innerText;
    const peselErrorMessage = document.getElementById('errorMessage-peselError').innerText;
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;

resetErrors([firstNameInput,lastNameInput,chronicDiseasesInput,peselInput], [errorFirstName,errorLastName,errorChronicDiseases,errorPESEL], errorsSummary);
let valid = true;
//Walidacja imion
if(!checkRequired(firstNameInput.value)){
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
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
//Walidacja chorob przewleklych
    if (!checkTextLengthRange(chronicDiseasesInput.value, 2, 120)){
        valid = false;
        chronicDiseasesInput.classList.add("error-input");
        errorChronicDiseases.innerText = lengthError2Message;
    }
    //Walidacja peseli
    if(!checkRequired(peselInput.value)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPESEL.innerText = reqMessage;
    } else if (!checkTextLengthRange(peselInput.value, 11, 11)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPESEL.innerText = peselErrorMessage;
    }
    if (!valid) {
        errorsSummary.innerText = formErrorMessage;
    }
    return valid;
}