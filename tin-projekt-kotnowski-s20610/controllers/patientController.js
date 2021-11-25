const PatientRepository = require('../config/sequelize/PatientRepository');

exports.showPatientList = (req, res, next) => {
    PatientRepository.getPatients().then(patients => {
        res.render ('pages/patient/list', {
            patients: patients,
            navLocation: 'patient'
        });
    });
}

exports.showAddPatientForm = (req, res, next) => {
    res.render ('pages/patient/form', {navLocation: 'patient'});
}

exports.showPatientDetails = (req, res, next) => {
    res.render ('pages/patient/details', {navLocation: 'patient'});
}

exports.showPatientEditForm = (req, res, next) => {
    res.render ('pages/patient/form-edit', {navLocation: 'patient'});
}