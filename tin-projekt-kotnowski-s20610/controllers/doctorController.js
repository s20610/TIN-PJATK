exports.showDoctorList = (req, res, next) => {
    res.render ('pages/doctor/list', { });
}

exports.showAddDoctorForm = (req, res, next) => {
    res.render ('pages/doctor/form', { });
}

exports.showDoctorDetails = (req, res, next) => {
    res.render ('pages/doctor/details', { });
}