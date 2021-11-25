const Patient = require("../sequelize/Patient");
const Appointment = require('../sequelize/Appointment')
const Doctor = require('../sequelize/Doctor')

exports.getPatients = () => {
    return Patient.findAll();
}

exports.getPatientById = (patientId) => {
    return Patient.findByPk(patientId, {
        include: [{
            model: Appointment,
            include: [{
                model: Doctor
            }]
        }]
    });
};

exports.createPatient = (newPatientData) => {
    return Patient.create({
        firstName: newPatientData.firstName,
        lastName: newPatientData.lastName,
        chronicDiseases: newPatientData.chronicDiseases,
        PESEL: newPatientData.PESEL
    });
};

exports.updatePatient = (patientId, patientData) => {
    const firstName = patientData.firstName;
    const lastName = patientData.lastName;
    const chronicDiseases = patientData.chronicDiseases;
    const PESEL = patientData.PESEL;
    return Patient.update(patientData, {where: {_id: patientId}});
};

exports.deletePatient = (patientId) => {
    return Patient.destroy({
        where: {_id: patientId}
    });
};