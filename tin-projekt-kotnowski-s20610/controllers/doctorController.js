const DoctorRepository = require('../config/sequelize/DoctorRepository');
const SpecializationRepository = require('../config/sequelize/SpecializationRepository');

exports.showDoctorList = (req, res, next) => {
    DoctorRepository.getDoctors().then(doctors => {
        if(doctors.length === 0){
            res.render ('pages/doctor/list-empty', {
                doctors: doctors,
                navLocation: 'doctor'
            });
        }else{
            res.render ('pages/doctor/list', {
                doctors: doctors,
                navLocation: 'doctor'
            });
        }
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
                navLocation: 'doctor',
                validationErrors: []
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
            navLocation: 'doctor',
            validationErrors: []
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
            formAction: '/doctors/edit',
            navLocation: 'doctor',
            validationErrors: []
        });
    })
}

exports.addDoctor = (req,res,next) => {
    const doctorData = {...req.body};
    let specializations;
    DoctorRepository.createDoctor(doctorData).then(result => {
        res.redirect('/doctors');
    }).catch(err => {
        // err.errors.forEach(e => {
        //     if (e.path.includes('email') && e.type === 'unique violation') {
        //         e.message = 'Podany adres email jest już używany';
        //     }
        // });
        SpecializationRepository.getSpecializations().then(specs => {
            specializations = specs;
            res.render('pages/doctor/form', {
                doctor: doctorData,
                formMode: 'createNew',
                allSpec: specializations,
                pageTitle: 'Nowy lekarz',
                btnLabel: 'Dodaj lekarza',
                formAction: '/doctors/add',
                navLocation: 'doctor',
                validationErrors: err.errors
            });
        })
    })
}

exports.updateDoctor = (req,res,next) => {
    const doctorId = req.body._id;
    const doctorData = {...req.body};
    let specializations;
    DoctorRepository.updateDoctor(doctorId, doctorData)
        .then(result => {
            res.redirect('/doctors')
        }).catch(err => {
        // err.errors.forEach(e => {
        //     if(e.path.includes('email') && e.type === 'unique violation') {
        //         e.message = 'Podany adres email jest już używany';
        //     }
        // });
        SpecializationRepository.getSpecializations().then(specs => {
            specializations = specs;
            DoctorRepository.getDoctorById(doctorId).then(doctor =>{
                res.render('pages/doctor/form', {
                    allSpec: specializations,
                    doctor: doctor,
                    pageTitle: 'Edycja lekarza',
                    formMode: 'edit',
                    btnLabel: 'Akceptuj zmiany',
                    formAction: '/doctors/edit',
                    navLocation: 'doctor',
                    validationErrors: err.errors
                });
            })
        })
    })
}

exports.deleteDoctor = (req,res,next) => {
    const doctorId = req.params.doctorId;
    DoctorRepository.deleteDoctor(doctorId)
        .then(() => {
            res.redirect('/doctors')
        })
}