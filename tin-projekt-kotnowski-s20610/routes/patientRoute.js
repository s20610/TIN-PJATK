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
router.post('/add', patientControler.addPatient);
router.post('/edit', patientControler.updatePatient);
router.get('/delete/:patientId', patientControler.deletePatient);

module.exports = router;
