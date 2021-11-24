const PatientRepository = require('../config/sequelize/PatientRepository');

exports.getPatients = (req, res, next) => {
    PatientRepository.getPatients().then(patients =>{
        res.status(200).json(patients);
    }).catch(err => {
        console.log(err);
    });
}

exports.getPatientById = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.getPatientById(patientId).then(patient => {
        if(!patient){
            res.status(404).json({
                message: 'Patient with id '+patientId+' not found'
            });
        }else{
            res.status(200).json(patient);
        }
    });
}

exports.createPatient = (req, res, next) => {
    PatientRepository.createPatient(req.body).then(newObj => {
        res.status(201).json(newObj);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updatePatient = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.updatePatient(patientId, req.body).then(result => {
        res.status(200).json({message: 'Patient updated!', patient: result})
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deletePatient = (req, res, next) => {
    const patientId = req.params.patientId;
    PatientRepository.deletePatient(patientId).then(result => {
        res.status(200).json({message: 'Patient deleted', patient: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}