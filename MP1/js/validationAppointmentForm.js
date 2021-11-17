function validateForm() {
    const idDoctorInput = document.getElementById('doctor');
    const idPatientInput = document.getElementById('patient');
    const visitDateInput = document.getElementById('visit_date');
    const prescriptionInput = document.getElementById('prescription');
    const visitDescriptionInput = document.getElementById('visit_description');

    const errorIdDoctor = document.getElementById('errorDoctor');
    const errorIdPatient = document.getElementById('errorPatient');
    const errorVisitDate = document.getElementById('errorVisitDate');
    const errorPrescription = document.getElementById('errorPrescription');
    const errorVisitDescription = document.getElementById('errorVisitDescription');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([idDoctorInput,idPatientInput,visitDateInput,prescriptionInput,visitDescriptionInput], [errorIdDoctor,errorIdPatient,errorVisitDate,errorPrescription,errorVisitDescription]);
    let valid = true;
//Walidacja doktora
    if(!checkRequired(idDoctorInput.value)){
        valid = false;
        idDoctorInput.classList.add("error-input");
        errorIdDoctor.innerText = "Pole jest wymagane";
    }
//Walidacja pacjenta
    if(!checkRequired(idPatientInput.value)){
        valid = false;
        idPatientInput.classList.add("error-input");
        errorIdPatient.innerText = "Pole jest wymagane";
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
        errorVisitDate.innerText = "Pole jest wymagane";
    } else if (!checkDate (visitDateInput.value)) {
        valid = false;
        visitDateInput.classList.add ("error-input");
        errorVisitDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01) ";
    } else if (checkDateIfAfter (visitDateInput.value, nowString)) {
        valid = false;
        visitDateInput.classList. add ("error-input");
        errorVisitDate.innerText = "Data nie może być z przyszłości";
    }

    //Walidacja recepty
    if (!checkTextLengthRange(prescriptionInput.value, 0, 100)){
        valid = false;
        prescriptionInput.classList.add("error-input");
        errorPrescription.innerText = "Pole powinno zawierać od 0 do 100 znaków";
    }
    //Walidacja opisu wizyty
    if (!checkTextLengthRange(visitDescriptionInput.value, 0, 100)){
        valid = false;
        visitDescriptionInput.classList.add("error-input");
        errorVisitDescription.innerText = "Pole powinno zawierać od 0 do 100 znaków";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}