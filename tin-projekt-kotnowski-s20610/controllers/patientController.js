exports.showPatientList = (req, res, next) => {
    res.render ('pages/patient/list', { });
}

exports.showAddPatientForm = (req, res, next) => {
    res.render ('pages/patient/form', { });
}

exports.showPatientDetails = (req, res, next) => {
    res.render ('pages/patient/details', { });
}