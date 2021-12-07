const AppointmentRepository = require('../config/sequelize/AppointmentRepository');
const PatientRepository = require('../config/sequelize/PatientRepository');
const DoctorRepository = require('../config/sequelize/DoctorRepository');


exports.showAppointmentList = (req, res, next) => {
    AppointmentRepository.getAppointments().then(appointments => {
        res.render ('pages/appointment/list', {
            appointments: appointments,
            navLocation: 'appointment'
        });
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
        navLocation: 'appointment'
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
            navLocation: 'appointment'
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
            navLocation: 'appointment'
        });
    });
}

exports.addAppointment = (req,res,next) => {
    const appointmentData = {...req.body};
    AppointmentRepository.createAppointment(appointmentData)
        .then(result => {
            res.redirect('/appointments');
        });
}

exports.updateAppointment = (req,res,next) => {
    const appointmentId = req.body._id;
    const appointmentData = {...req.body};
    AppointmentRepository.updateAppointment(appointmentId,appointmentData)
        .then(result => {
            res.redirect('/appointments')
        });
}

exports.deleteAppointment = (req,res,next) => {
    const appointmentId = req.body._id;
    AppointmentRepository.deleteAppointment(appointmentId)
        .then(() => {
            res.redirect('/appointments')
        })
}