const Doctor = require("../sequelize/Doctor");
const Appointment = require('../sequelize/Appointment');
const Specialization = require('../sequelize/Specialization');
const Patient = require('../sequelize/Patient');

exports.getDoctors = () => {
    return Doctor.findAll({
        include: [{
            model: Specialization,
            as: 'specializations'
        }]
    });
}

exports.getDoctorById = (doctorId) => {
    return Doctor.findByPk(doctorId, {
        include: [{
            model: Specialization,
            as: 'specializations'
        }]
    });
}

exports.createDoctor = (newDoctorData) => {
    return Doctor.create({
        firstName: newDoctorData.firstName,
        lastName: newDoctorData.lastName,
        email: newDoctorData.email,
        specializationId: newDoctorData.specializationId
    });
}

exports.updateDoctor = (doctorId, doctorData) => {
    const firstName = doctorData.firstName;
    const lastName = doctorData.lastName;
    const email = doctorData.email;
    const specializationId = doctorData.specializationId;
    return Doctor.update(doctorData, {where: {_id: doctorId}});
}

exports.deleteDoctor = (doctorId) => {
    return Doctor.destroy({
        where: {_id: doctorId}
    });
}