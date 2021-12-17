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
        formMode: 'createNew',
        allPatients: allPatients,
        allDoctors: allDoctors,
        pageTitle: 'Nowa wizyta',
        btnLabel: 'Dodaj wizytę',
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
            allPatients: allPatients,
            allDoctors: allDoctors,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły wizyty',
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
            allPatients: allPatients,
            allDoctors: allDoctors,
            pageTitle: 'Edycja wizyty',
            formMode: 'edit',
            btnLabel: 'Akceptuj zmiany',
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
                formMode: 'createNew',
                allPatients: allPatients,
                allDoctors: allDoctors,
                pageTitle: 'Nowa wizyta',
                btnLabel: 'Dodaj wizytę',
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
    let allPatients, allDoctors;
    AppointmentRepository.updateAppointment(appointmentId, appointmentData).then(result => {
        res.redirect('/appointments')
    }).catch(err => {
        PatientRepository.getPatients().then(patients => {
            allPatients = patients;
            return DoctorRepository.getDoctors();
        }).then(doctors => {
            allDoctors = doctors;
            AppointmentRepository.getAppointmentById(appointmentId).then(appt => {
                res.render('pages/appointment/form', {
                    appointment: appt,
                    allPatients: allPatients,
                    allDoctors: allDoctors,
                    pageTitle: 'Edycja wizyty',
                    formMode: 'edit',
                    btnLabel: 'Akceptuj zmiany',
                    formAction: '/appointments/edit',
                    navLocation: 'appointment',
                    validationErrors: err.errors
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