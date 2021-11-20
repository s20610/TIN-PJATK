exports.showSpecializationList = (req, res, next) => {
    res.render ('pages/specialization/list', {navLocation: 'specialization'});
}

exports.showAddDSpecializationForm = (req, res, next) => {
    res.render ('pages/specialization/form', {navLocation: 'specialization'});
}

exports.showSpecializationDetails = (req, res, next) => {
    res.render ('pages/specialization/details', {navLocation: 'specialization'});
}

exports.showSpecializationEditForm = (req, res, next) => {
    res.render ('pages/specialization/form-edit', {navLocation: 'specialization'});
}