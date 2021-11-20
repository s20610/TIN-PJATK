const express = require('express');
const router = express.Router();

const patientControler = require('../controllers/patientController');

router.get('/', patientControler.showPatientList);
router.get('/add', patientControler.showAddPatientForm);
router.get('/edit/:patientId', patientControler.showPatientEditForm);
router.get('/details/:patientId', patientControler.showPatientDetails);
router.get('/', function(req, res, next) {
    res.render('pages/patient/list', { navLocation: 'patient' });
});

module.exports = router;
