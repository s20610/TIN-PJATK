const Doctor = require("../sequelize/Doctor");
const Appointment = require('../sequelize/Appointment');
const Specialization = require('../sequelize/Specialization');
const Patient = require('../sequelize/Patient');
const {hashPassword} = require("../../util/authUtil");

exports.getDoctors = () => {
    return Doctor.findAll({
        include: [{
            model: Specialization
        }]
    });
}

exports.getDoctorById = (doctorId) => {
    return Doctor.findByPk(doctorId, {
        include: [{
            model: Specialization,
        },{
            model: Appointment
        }]
    });
}

exports.createDoctor = (newDoctorData) => {
    let passHash = hashPassword(newDoctorData.password);
    return Doctor.create({
        firstName: newDoctorData.firstName,
        lastName: newDoctorData.lastName,
        email: newDoctorData.email,
        SpecializationId: newDoctorData.SpecializationId,
        password: passHash
    });
}

exports.updateDoctor = (doctorId, doctorData) => {
    doctorData.password = hashPassword(doctorData.password)
    return Doctor.update(doctorData, {where: {_id: doctorId}});
}

exports.deleteDoctor = (doctorId) => {
    return Doctor.destroy({
        where: {_id: doctorId}
    });
}

exports.findByEmail = (email) => {
    return Doctor.findOne({
        where: {email: email}
    });
}