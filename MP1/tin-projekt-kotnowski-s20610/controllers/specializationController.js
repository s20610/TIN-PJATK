exports.showSpecializationList = (req, res, next) => {
    res.render ('pages/specialization/list', { });
}

exports.showAddDSpecializationForm = (req, res, next) => {
    res.render ('pages/specialization/form', { });
}

exports.showSpecializationDetails = (req, res, next) => {
    res.render ('pages/specialization/details', { });
}