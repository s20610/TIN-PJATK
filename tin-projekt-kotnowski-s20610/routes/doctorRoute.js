const express = require('express');
const router = express.Router();

const doctorControler = require('../controllers/doctorController');

router.get('/', doctorControler.showDoctorList);
router.get('/add', doctorControler.showAddDoctorForm);
router.get('/details/:doctorId', doctorControler.showDoctorDetails);

module.exports = router;
