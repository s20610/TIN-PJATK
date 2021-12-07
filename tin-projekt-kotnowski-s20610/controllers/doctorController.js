const DoctorRepository = require('../config/sequelize/DoctorRepository');
const SpecializationRepository = require('../config/sequelize/SpecializationRepository');

exports.showDoctorList = (req, res, next) => {
    DoctorRepository.getDoctors().then(doctors => {
        res.render ('pages/doctor/list', {
            doctors: doctors,
            navLocation: 'doctor'
        });
    });
}

exports.showAddDoctorForm = (req, res, next) => {
    SpecializationRepository.getSpecializations()
        .then(specializations => {
            res.render ('pages/doctor/form', {
                doctor: {},
                formMode: 'createNew',
                allSpec: specializations,
                pageTitle: 'Nowy lekarz',
                btnLabel: 'Dodaj lekarza',
                formAction: '/doctors/add',
                navLocation: 'doctor'
            });
        })
}

exports.showDoctorDetails = (req, res, next) => {
    const doctorId = req.params.doctorId;
    let allSpec;
    SpecializationRepository.getSpecializations().then(specializations => {
        allSpec = specializations;
        return DoctorRepository.getDoctorById(doctorId);
    }).then(doctor => {
        res.render ('pages/doctor/form', {
            doctor: doctor,
            allSpec: allSpec,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły lekarza',
            formAction: '',
            navLocation: 'doctor'
        });
    })
}

exports.showEditDoctorForm = (req, res, next) => {
    const doctorId = req.params.doctorId;
    let allSpec;
    SpecializationRepository.getSpecializations().then(specializations => {
        allSpec = specializations;
        return DoctorRepository.getDoctorById(doctorId);
    }).then(doctor => {
        res.render ('pages/doctor/form', {
            allSpec: allSpec,
            doctor: doctor,
            pageTitle: 'Edycja lekarza',
            formMode: 'edit',
            btnLabel: 'Akceptuj zmiany',
            formAction: '/doctor/edit',
            navLocation: 'doctor'
        });
    })
}

exports.addDoctor = (req,res,next) => {
    const doctorData = {...req.body};
    DoctorRepository.createDoctor(doctorData)
        .then(result => {
            res.redirect('/doctors');
        });
}

exports.updateDoctor = (req,res,next) => {
    const doctorId = req.body._id;
    const doctorData = {...req.body};
    DoctorRepository.updateDoctor(doctorId,doctorData)
        .then(result => {
            res.redirect('/doctors')
        });
}

exports.deleteDoctor = (req,res,next) => {
    const doctorId = req.body._id;
    DoctorRepository.deleteDoctor(doctorId)
        .then(() => {
            res.redirect('/doctors')
        })
}