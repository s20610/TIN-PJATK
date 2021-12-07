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
router.post('/add', doctorControler.addDoctor);
router.post('/edit', doctorControler.updateDoctor);
router.get('/delete/:doctorId', doctorControler.deleteDoctor);

module.exports = router;
