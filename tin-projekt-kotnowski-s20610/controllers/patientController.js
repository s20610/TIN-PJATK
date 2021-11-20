exports.showPatientList = (req, res, next) => {
    res.render ('pages/patient/list', {navLocation: 'patient'});
}

exports.showAddPatientForm = (req, res, next) => {
    res.render ('pages/patient/form', {navLocation: 'patient'});
}

exports.showPatientDetails = (req, res, next) => {
    res.render ('pages/patient/details', {navLocation: 'patient'});
}

exports.showPatientEditForm = (req, res, next) => {
    res.render ('pages/patient/form-edit', {navLocation: 'patient'});
}