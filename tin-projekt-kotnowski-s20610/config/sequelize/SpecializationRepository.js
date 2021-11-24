const Specialization = require("../sequelize/Specialization");
const Doctor = require('../sequelize/Doctor');

exports.getSpecializations = () => {
    return Specialization.findAll();
}

exports.getSpecializationById = (specializationId) => {
    return Specialization.findByPk(specializationId, {
        include: [{
            model: Doctor,
            as: 'doctors'
        }]
    });
}

exports.createSpecialization = (newSpecializationData) => {
    return Specialization.create({
        specializationName: newSpecializationData.specializationName
    });
}

exports.updateSpecialization = (specializationId , specializationData) => {
    const specializationName = specializationData.specializationName;
    return Specialization.update(specializationData, {where: {_id: specializationId}});
}

exports.deleteSpecialization = (specializationId) => {
    return Specialization.destroy({
        where: {_id: specializationId}
    });
}