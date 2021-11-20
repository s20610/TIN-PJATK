const express = require('express');
const router = express.Router();

const specializationControler = require('../controllers/specializationController');

router.get('/', specializationControler.showSpecializationList);
router.get('/add', specializationControler.showAddDSpecializationForm);
router.get('/edit/:specializationId', specializationControler.showSpecializationEditForm);
router.get('/details/:specializationId', specializationControler.showSpecializationDetails);
router.get('/', function(req, res, next) {
    res.render('pages/specialization/list', { navLocation: 'specialization' });
});

module.exports = router;
