const SpecializationRepository = require('../config/sequelize/SpecializationRepository');
require("../config/sequelize/PatientRepository");
exports.showSpecializationList = (req, res, next) => {
    SpecializationRepository.getSpecializations().then(specializations => {
        if(specializations.length === 0) {
            res.render ('pages/specialization/list-empty', {
                specializations: specializations,
                navLocation: 'specialization'
            });
        }else{
            res.render ('pages/specialization/list', {
                specializations: specializations,
                navLocation: 'specialization'
            });
        }
    });
}

exports.showAddSpecializationForm = (req, res, next) => {
    res.render ('pages/specialization/form', {
        specialization: {},
        specializationBeforeData: {},
        pageTitle: 'Nowa specjalizacja',
        formMode: 'createNew',
        btnLabel: 'Dodaj specjalizację',
        formAction: '/specializations/add',
        navLocation: 'specialization',
        validationErrors: []
    });
}

exports.showSpecializationDetails = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.getSpecializationById(specializationId).then(specialization => {
        res.render ('pages/specialization/form', {
            specialization: specialization,
            specializationBeforeData: specialization,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły specjalizacji',
            formAction: '',
            navLocation: 'specialization',
            validationErrors: []
        });
    });
}

exports.showSpecializationEditForm = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.getSpecializationById(specializationId).then(specialization => {
        res.render ('pages/specialization/form', {
            specialization: specialization,
            specializationBeforeData: specialization,
            pageTitle: 'Edycja specjalizacji',
            formMode: 'edit',
            btnLabel: 'Akceptuj zmiany',
            formAction: '/specializations/edit',
            navLocation: 'specialization',
            validationErrors: []
        });
    })
}

exports.addSpecialization = (req, res, next) => {
    const specializationData = {...req.body};
    SpecializationRepository.createSpecialization(specializationData)
        .then(result => {
            res.redirect('/specializations');
        }).catch(err => {
        res.render ('pages/specialization/form', {
            specialization: specializationData,
            pageTitle: 'Nowa specjalizacja',
            formMode: 'createNew',
            btnLabel: 'Dodaj specjalizację',
            formAction: '/specializations/add',
            navLocation: 'specialization',
            validationErrors: err.errors
        });
    })
};
exports.updateSpecialization = (req, res, next) => {
    const specializationId = req.body._id;
    const specializationData = {...req.body};
    SpecializationRepository.updateSpecialization(specializationId, specializationData)
        .then(result => {
            res.redirect('/specializations');
        }).catch(err => {
            SpecializationRepository.getSpecializationById(specializationId).then(spec => {
                res.render ('pages/specialization/form', {
                    specialization: specializationData,
                    specializationBeforeData: spec,
                    pageTitle: 'Edycja specjalizacji',
                    formMode: 'edit',
                    btnLabel: 'Akceptuj zmiany',
                    formAction: '/specializations/edit',
                    navLocation: 'specialization',
                    validationErrors: err.errors
                });
            })
    })
};
exports.deleteSpecialization = (req, res, next) => {
    const specializationId = req.params.specializationId;
    SpecializationRepository.deleteSpecialization(specializationId)
        .then(() => {
            res.redirect('/specializations')
        });
};