const AppointmentRepository = require('../config/sequelize/AppointmentRepository');
const PatientRepository = require('../config/sequelize/PatientRepository');
const DoctorRepository = require('../config/sequelize/DoctorRepository');


exports.showAppointmentList = (req, res, next) => {
    AppointmentRepository.getAppointments().then(appointments => {
        if(appointments.length === 0){
            res.render ('pages/appointment/list-empty', {
                appointments: appointments,
                navLocation: 'appointment'
            });
        }else{
            res.render ('pages/appointment/list', {
                appointments: appointments,
                navLocation: 'appointment'
            });
        }
    });
}

exports.showAddAppointmentForm = (req, res, next) => {
    let allPatients, allDoctors;
    PatientRepository.getPatients()
        .then(patients =>{
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
            allDoctors = doctors;
    res.render ('pages/appointment/form', {
        appointment: {},
        appointmentBefore: {},
        formMode: 'createNew',
        allPatients: allPatients,
        allDoctors: allDoctors,
        pageTitle: req.__('appointments.form.add.pageTitle'),
        btnLabel: req.__('appointments.form.edit.btnLabel'),
        formAction: '/appointments/add',
        navLocation: 'appointment',
        validationErrors: []
    });
    });
}

exports.showAppointmentDetails = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    let allPatients, allDoctors;
    PatientRepository.getPatients()
        .then(patients =>{
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
        allDoctors = doctors;
        return AppointmentRepository.getAppointmentById(appointmentId);
        }).then(appt => {
        res.render ('pages/appointment/form', {
            appointment: appt,
            appointmentBefore: appt,
            allPatients: allPatients,
            allDoctors: allDoctors,
            formMode: 'showDetails',
            pageTitle: req.__('list.actions.details'),
            formAction: '',
            navLocation: 'appointment',
            validationErrors: []
        });
    });
}

exports.showEditAppointmentForm = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    let allPatients, allDoctors;
    PatientRepository.getPatients()
        .then(patients =>{
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
        allDoctors = doctors;
        return AppointmentRepository.getAppointmentById(appointmentId);
    }).then(appt => {
        res.render ('pages/appointment/form', {
            appointment: appt,
            appointmentBefore: appt,
            allPatients: allPatients,
            allDoctors: allDoctors,
            pageTitle: req.__('appointments.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('appointments.form.edit.btnLabel'),
            formAction: '/appointments/edit',
            navLocation: 'appointment',
            validationErrors: []
        });
    });
}

exports.addAppointment = (req,res,next) => {
    let allPatients, allDoctors;
    const appointmentData = {...req.body};
    AppointmentRepository.createAppointment(appointmentData).then(result => {
        res.redirect('/appointments');
    }).catch(err => {
        PatientRepository.getPatients().then(patients => {
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
            allDoctors = doctors;
            res.render('pages/appointment/form', {
                appointment: appointmentData,
                appointmentBefore: appointmentData,
                formMode: 'createNew',
                allPatients: allPatients,
                allDoctors: allDoctors,
                pageTitle: req.__('appointments.form.add.pageTitle'),
                btnLabel: req.__('appointments.form.add.btnLabel'),
                formAction: '/appointments/add',
                navLocation: 'appointment',
                validationErrors: err.errors
            });
        });
    });
}

exports.updateAppointment = (req,res,next) => {
    const appointmentId = req.body._id;
    const appointmentData = {...req.body};
    let errors;
    let allPatients, allDoctors;
    AppointmentRepository.updateAppointment(appointmentId, appointmentData).then(result => {
        res.redirect('/appointments')
    }).catch(err => {
        PatientRepository.getPatients().then(patients => {
            errors = err.errors;
            if(errors.length === 0){
                errors = [];
            }
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
            allDoctors = doctors;
            AppointmentRepository.getAppointmentById(appointmentId).then(appt => {
                res.render('pages/appointment/form', {
                    appointment: appointmentData,
                    appointmentBefore: appt,
                    allPatients: allPatients,
                    allDoctors: allDoctors,
                    pageTitle: req.__('appointments.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('appointments.form.edit.btnLabel'),
                    formAction: '/appointments/edit',
                    navLocation: 'appointment',
                    validationErrors: errors
                });
            })
        });
    });
}

exports.deleteAppointment = (req,res,next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.deleteAppointment(appointmentId)
        .then(() => {
            res.redirect('/appointments')
        })
}