const DoctorRepository = require('../config/sequelize/DoctorRepository');

exports.showDoctorList = (req, res, next) => {
    DoctorRepository.getDoctors().then(doctors => {
        res.render ('pages/doctor/list', {
            doctors: doctors,
            navLocation: 'doctor'
        });
    });
}

exports.showAddDoctorForm = (req, res, next) => {
    res.render ('pages/doctor/form', {navLocation: 'doctor'});
}

exports.showDoctorDetails = (req, res, next) => {
    res.render ('pages/doctor/details', {navLocation: 'doctor'});
}

exports.showEditDoctorForm = (req, res, next) => {
    res.render ('pages/doctor/form-edit', {navLocation: 'doctor'});
}