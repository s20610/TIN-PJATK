exports.showDoctorList = (req, res, next) => {
    res.render ('pages/doctor/list', {navLocation: 'doctor'});
}

exports.showAddDoctorForm = (req, res, next) => {
    res.render ('pages/doctor/form', {navLocation: 'doctor'});
}

exports.showDoctorDetails = (req, res, next) => {
    res.render ('pages/doctor/details', {navLocation: 'doctor'});
}

exports.showEditDoctorForm = (req, res, next) => {
    res.render ('pages/doctor/form-edit', {navLocation: 'doctor'});
}