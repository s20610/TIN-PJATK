const express = require('express');
const router = express.Router();

const doctorControler = require('../controllers/doctorController');

router.get('/', doctorControler.showDoctorList);
router.get('/add', doctorControler.showAddDoctorForm);
router.get('/details/:doctorId', doctorControler.showDoctorDetails);
router.get('/edit/:doctorId', doctorControler.showEditDoctorForm);
router.get('/', function(req, res, next) {
    res.render('pages/doctor/list', { navLocation: 'doctor' });
});

module.exports = router;
