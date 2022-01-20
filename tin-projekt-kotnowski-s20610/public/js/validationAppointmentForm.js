function validateForm() {
    const idDoctorInput = document.getElementById('doctorId');
    const idPatientInput = document.getElementById('patientId');
    const visitDateInput = document.getElementById('visitDate');
    const prescriptionInput = document.getElementById('prescription');
    const visitDescriptionInput = document.getElementById('visitDescription');

    const errorIdDoctor = document.getElementById('errorDoctor');
    const errorIdPatient = document.getElementById('errorPatient');
    const errorVisitDate = document.getElementById('errorVisitDate');
    const errorPrescription = document.getElementById('errorPrescription');
    const errorVisitDescription = document.getElementById('errorVisitDescription');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const dateErrorMessage = document.getElementById('errorMessage-dateError').innerText;
    const dateFutureMessage = document.getElementById('errorMessage-dateFutureError').innerText;
    const formError = document.getElementById('errorMessage-formError').innerText;

    resetErrors([idDoctorInput,idPatientInput,visitDateInput,prescriptionInput,visitDescriptionInput], [errorIdDoctor,errorIdPatient,errorVisitDate,errorPrescription,errorVisitDescription], errorsSummary);
    let valid = true;
//Walidacja doktora
    if(!checkRequired(idDoctorInput.value)){
        valid = false;
        idDoctorInput.classList.add("error-input");
        errorIdDoctor.innerText = reqMessage;
    }
//Walidacja pacjenta
    if(!checkRequired(idPatientInput.value)){
        valid = false;
        idPatientInput.classList.add("error-input");
        errorIdPatient.innerText = reqMessage;
    }
//Walidacja daty
    let nowDate = new Date(), month = ''+(nowDate.getMonth()+1), day = ''+nowDate.getDay(),year= nowDate.getFullYear();
    if(month.length<2)
        month = '0' + month;
    if(day.length<2)
        day = '0'+day;
    const nowString = [year,month,day].join('-');
    if (!checkRequired (visitDateInput.value)) {
        valid = false;
        visitDateInput.classList.add ("error-input");
        errorVisitDate.innerText = reqMessage;
    } else if (!checkDate (visitDateInput.value)) {
        valid = false;
        visitDateInput.classList.add ("error-input");
        errorVisitDate.innerText = dateErrorMessage;
    } else if (checkDateIfAfter (visitDateInput.value, nowString)) {
        valid = false;
        visitDateInput.classList. add ("error-input");
        errorVisitDate.innerText = dateFutureMessage;
    }

    // //Walidacja recepty
    // if (!checkTextLengthRange(prescriptionInput.value, 0, 100)){
    //     valid = false;
    //     prescriptionInput.classList.add("error-input");
    //     errorPrescription.innerText = "Pole powinno zawierać od 0 do 100 znaków";
    // }
    // //Walidacja opisu wizyty
    // if (!checkTextLengthRange(visitDescriptionInput.value, 0, 100)){
    //     valid = false;
    //     visitDescriptionInput.classList.add("error-input");
    //     errorVisitDescription.innerText = "Pole powinno zawierać od 0 do 100 znaków";
    // }


    if (!valid) {
        errorsSummary.innerText = formError;
    }
    return valid;
}