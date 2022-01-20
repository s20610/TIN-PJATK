const DoctorRepository = require('../config/sequelize/DoctorRepository');
const authUtil = require('../util/authUtil');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    DoctorRepository.findByEmail(email)
        .then(doctor => {
            if(!doctor){
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('auth.loginError')
                })
            }else if(authUtil.comparePasswords(password, doctor.password) === true){
                req.session.loggedUser = doctor;
                res.redirect('/');
            }else{
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('auth.loginError')
                })
            }
        }).catch(err => {
            console.log(err);
    });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}