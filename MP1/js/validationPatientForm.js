function validateForm() {
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const chronicDiseasesInput = document.getElementById('chronic_diseases');
const peselInput = document.getElementById('pesel');

const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorChronicDiseases = document.getElementById('errorChronicDiseases');
const errorPESEL = document.getElementById('errorPesel');

resetErrors([firstNameInput,lastNameInput,chronicDiseasesInput,peselInput], [errorFirstName,errorLastName,errorChronicDiseases,errorPESEL]);
let valid = true;
//Walidacja imion
if(!checkRequired(firstNameInput.value)){
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(firstNameInput.value, 2, 60)){
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}
//Walidacja nazwisk
    if(!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
//Walidacja chorob przewleklych
    if (!checkTextLengthRange(chronicDiseasesInput.value, 2, 120)){
        valid = false;
        chronicDiseasesInput.classList.add("error-input");
        errorChronicDiseases.innerText = "Pole powinno zawierać od 2 do 120 znaków";
    }
    //Walidacja peseli
    if(!checkRequired(peselInput.value)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPESEL.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(peselInput.value, 11, 11)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPESEL.innerText = "Pole powinno zawierać 11 cyfr";
    }

    return valid;
}