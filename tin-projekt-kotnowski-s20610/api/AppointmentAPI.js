const AppointmentRepository = require('../config/sequelize/AppointmentRepository');

exports.getAppointments = (req, res, next) => {
    AppointmentRepository.getAppointments().then(appointments => {
        res.status(200).json(appointments);
    }).catch(err => {
        console.log(err);
    });
}

exports.getAppointmentById = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.getAppointmentById(appointmentId).then(appointment => {
        if(!appointment){
            res.status(404).json({
                message: 'Appointment with id '+appointmentId+' not found'
            });
        }else{
            res.status(200).json(appointment);
        }
    });
}

exports.createAppointment = (req, res, next) => {
    AppointmentRepository.createAppointment(req.body).then(newObj => {
        res.status(201).json(newObj);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.updateAppointment(appointmentId, req.body).then(result => {
        res.status(200).json({message: 'Appointment updated!', appointment: result})
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.deleteAppointment(appointmentId).then(result => {
        res.status(200).json({message: 'Appointment deleted', appointment: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}