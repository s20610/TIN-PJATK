const PatientRepository = require('../config/sequelize/PatientRepository');

exports.showPatientList = (req, res, next) => {
    PatientRepository.getPatients().then(patients => {
        if(patients.length === 0){
            res.render ('pages/patient/list-empty', {
                patients: patients,
                navLocation: 'patient'
            });
        }else{
            res.render ('pages/patient/list', {
                patients: patients,
                navLocation: 'patient'
            });
        }
    });
}

exports.showAddPatientForm = (req, res, next) => {
    res.render ('pages/patient/form', {
        patient: {},
        patientBefore: {},
        pageTitle: 'Nowy pacjent',
        formMode: 'createNew',
        btnLabel: 'Dodaj pacjenta',
        formAction: '/patients/add',
        navLocation: 'patient',
        validationErrors: []
    });
}

exports.showPatientDetails = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.getPatientById(patientId).then(patient => {
    res.render ('pages/patient/form', {
        patient: patient,
        patientBefore: patient,
        formMode: 'showDetails',
        pageTitle: 'Szczegóły pacjenta',
        formAction: '',
        navLocation: 'patient',
        validationErrors: []
    });
    });
}

exports.showPatientEditForm = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.getPatientById(patientId).then(patient => {
    res.render ('pages/patient/form', {
        patient: patient,
        patientBefore: patient,
        pageTitle: 'Edycja pacjenta',
        formMode: 'edit',
        btnLabel: 'Akceptuj zmiany',
        formAction: '/patients/edit',
        navLocation: 'patient',
        validationErrors: []
    })
    });
}

exports.addPatient = (req, res, next) => {
    const patientData = {...req.body};
    PatientRepository.createPatient(patientData)
        .then(result => {
            res.redirect('/patients');
        }).catch(err => {
        res.render ('pages/patient/form', {
            patient: patientData,
            patientBefore: patientData,
            pageTitle: 'Nowy pacjent',
            formMode: 'createNew',
            btnLabel: 'Dodaj pacjenta',
            formAction: '/patients/add',
            navLocation: 'patient',
            validationErrors: err.errors
        });
    });
};
exports.updatePatient = (req, res, next) => {
    const patientId = req.body._id;
    const patientData = {...req.body};
    PatientRepository.updatePatient(patientId, patientData)
        .then(result => {
            res.redirect('/patients')
        }).catch(err => {
            PatientRepository.getPatientById(patientId).then(patient => {
                res.render ('pages/patient/form', {
                    patient: patientData,
                    patientBefore: patient,
                    pageTitle: 'Edycja pacjenta',
                    formMode: 'edit',
                    btnLabel: 'Akceptuj zmiany',
                    formAction: '/patients/edit',
                    navLocation: 'patient',
                    validationErrors: err.errors
                });
            })
    })
};
exports.deletePatient = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.deletePatient(patientId)
        .then(() => {
            res.redirect('/patients')
        });
};
