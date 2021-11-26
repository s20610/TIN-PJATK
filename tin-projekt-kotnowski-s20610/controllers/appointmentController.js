const AppointmentRepository = require('../config/sequelize/AppointmentRepository');

exports.showAppointmentList = (req, res, next) => {
    AppointmentRepository.getAppointments().then(appointments => {
        res.render ('pages/appointment/list', {
            appointments: appointments,
            navLocation: 'appointment'
        });
    });
}

exports.showAddAppointmentForm = (req, res, next) => {
    res.render ('pages/appointment/form', {navLocation: 'appointment'});
}

exports.showAppointmentDetails = (req, res, next) => {
    res.render ('pages/appointment/details', {navLocation: 'appointment'});
}

exports.showEditAppointmentForm = (req, res, next) => {
    res.render ('pages/appointment/form-edit', {navLocation: 'appointment'});
}