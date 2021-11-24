const SpecializationRepository = require('../config/sequelize/SpecializationRepository');

exports.getSpecializations = (req, res, next) => {
    SpecializationRepository.getSpecializations().then(specializations => {
        res.status(200).json(specializations);
    }).catch(err => {
        console.log(err);
    });
}

exports.getSpecializationById = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.getSpecializationById(specializationId).then(specialization => {
        if(!specialization){
            res.status(404).json({
                message: 'Specialization with id '+specializationId+' not found'
            });
        }else{
            res.status(200).json(specialization);
        }
    });
}

exports.createSpecialization = (req, res, next) => {
    SpecializationRepository.createSpecialization(req.body).then(newObj => {
        res.status(201).json(newObj);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateSpecialization = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.updateSpecialization(specializationId, req.body).then(result => {
        res.status(200).json({message: 'Specialization updated!', specialization: result})
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteSpecialization = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.deleteSpecialization(specializationId).then(result => {
        res.status(200).json({message: 'Specialization deleted', specialization: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}