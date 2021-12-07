const SpecializationRepository = require('../config/sequelize/SpecializationRepository');
const PatientRepository = require("../config/sequelize/PatientRepository");

exports.showSpecializationList = (req, res, next) => {
    SpecializationRepository.getSpecializations().then(specializations => {
        res.render ('pages/specialization/list', {
            specializations: specializations,
            navLocation: 'specialization'
        });
    });
}

exports.showAddDSpecializationForm = (req, res, next) => {
    res.render ('pages/specialization/form', {
        specialization: {},
        pageTitle: 'Nowa specjalizacja',
        formMode: 'createNew',
        btnLabel: 'Dodaj specjalizację',
        formAction: '/specializations/add',
        navLocation: 'specialization'
    });
}

exports.showSpecializationDetails = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.getSpecializationById(specializationId).then(specialization => {
        res.render ('pages/specialization/form', {
            specialization: specialization,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły specjalizacji',
            formAction: '',
            navLocation: 'specialization'
        });
    });
}

exports.showSpecializationEditForm = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.getSpecializationById(specializationId).then(specialization => {
        res.render ('pages/specialization/form', {
            specialization: specialization,
            pageTitle: 'Edycja specjalizacji',
            formMode: 'edit',
            btnLabel: 'Akceptuj zmiany',
            formAction: '/specializations/edit',
            navLocation: 'specialization'
        });
    })
}

exports.addSpecialization = (req, res, next) => {
    const specializationData = {...req.body};
    SpecializationRepository.createSpecialization(specializationData)
        .then(result => {
            res.redirect('/specializations');
        });
};
exports.updateSpecialization = (req, res, next) => {
    const specializationId = req.body._id;
    const specializationData = {...req.body};
    SpecializationRepository.updateSpecialization(specializationId, specializationData)
        .then(result => {
            res.redirect('/specializations');
        });
};
exports.deleteSpecialization = (req, res, next) => {
    const specializationId = req.body._id;
    SpecializationRepository.deleteSpecialization(specializationId)
        .then(() => {
            res.redirect('/specializations')
        });
};