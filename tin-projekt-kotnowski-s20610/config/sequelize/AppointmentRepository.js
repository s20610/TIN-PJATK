const Patient = require("../sequelize/Patient");
const Appointment = require('../sequelize/Appointment');
const Doctor = require('../sequelize/Doctor');
const Specialization = require('../sequelize/Specialization');

exports.getAppointments = () => {
    return Appointment.findAll({
        include: [{
            model: Patient,
            as: 'patients'
        },{
            model: Doctor,
            as: 'doctors',
            include: [{
                model: Specialization,
                as: 'specializations'
            }]
        }]
    });
}

exports.getAppointmentById = (appointmentId) => {
    return Appointment.findByPk(appointmentId, {
        include: [{
            model: Patient,
            as: 'patients'
        },{
            model: Doctor,
            as: 'doctors',
            include: [{
                model: Specialization,
                as: 'specializations'
            }]
        }]
    });
}

exports.createAppointment = (newAppointmentData) => {
    console.log(JSON.stringify(newAppointmentData));
    return Appointment.create({
        DoctorId: newAppointmentData.DoctorId,
        PatientId: newAppointmentData.PatientId,
        visitDate: newAppointmentData.visitDate,
        prescription: newAppointmentData.prescription,
        visitDescription: newAppointmentData.visitDescription
    });
}

exports.updateAppointment = (appointmentId, appointmentData) => {
    return Appointment.update(appointmentData, {where: {_id: appointmentId}});
}

exports.deleteAppointment = (appointmentId) => {
    return Appointment.destroy({
        where: {_id: appointmentId}
    });
}