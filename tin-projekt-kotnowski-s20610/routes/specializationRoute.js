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
router.post('/add', specializationControler.addSpecialization);
router.post('/edit', specializationControler.updateSpecialization);
router.get('/delete/:specializationId', specializationControler.updateSpecialization);

module.exports = router;
