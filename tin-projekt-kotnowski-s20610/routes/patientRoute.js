const express = require('express');
const router = express.Router();

const patientControler = require('../controllers/patientController');

router.get('/', patientControler.showPatientList);
router.get('/add', patientControler.showAddPatientForm);
router.get('/details/:patientId', patientControler.showPatientDetails);

module.exports = router;
