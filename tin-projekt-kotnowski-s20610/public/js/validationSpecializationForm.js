function validateForm() {
    const specializationNameInput = document.getElementById('specializationName');

    const errorSpecializationName = document.getElementById('errorSpecializationName');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([specializationNameInput], [errorSpecializationName], errorsSummary);
    let valid = true;

//Walidacja imion
    if(!checkRequired(specializationNameInput.value)){
        valid = false;
        specializationNameInput.classList.add("error-input");
        errorSpecializationName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(specializationNameInput.value, 2, 60)){
        valid = false;
        specializationNameInput.classList.add("error-input");
        errorSpecializationName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}