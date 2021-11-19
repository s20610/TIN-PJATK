exports.showAppointmentList = (req, res, next) => {
    res.render ('pages/appointment/list', { });
}

exports.showAddAppointmentForm = (req, res, next) => {
    res.render ('pages/appointment/form', { });
}

exports.showAppointmentDetails = (req, res, next) => {
    res.render ('pages/appointment/details', { });
}