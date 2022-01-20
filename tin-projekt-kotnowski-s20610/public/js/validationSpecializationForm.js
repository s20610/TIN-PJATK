function validateForm() {
    const specializationNameInput = document.getElementById('specializationName');

    const errorSpecializationName = document.getElementById('errorSpecializationName');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const lengthErrorMessage = document.getElementById('errorMessage-lengthError').innerText;

    resetErrors([specializationNameInput], [errorSpecializationName], errorsSummary);
    let valid = true;

//Walidacja imion
    if(!checkRequired(specializationNameInput.value)){
        valid = false;
        specializationNameInput.classList.add("error-input");
        errorSpecializationName.innerText = reqMessage;
    } else if (!checkTextLengthRange(specializationNameInput.value, 2, 60)){
        valid = false;
        specializationNameInput.classList.add("error-input");
        errorSpecializationName.innerText = lengthErrorMessage;
    }
    if (!valid) {
        errorsSummary.innerText = formErrorMessage;
    }
    return valid;
}