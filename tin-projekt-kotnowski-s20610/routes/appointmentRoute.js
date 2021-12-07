const express = require('express');
const router = express.Router();

const appointmentControler = require('../controllers/appointmentController');

router.get('/', appointmentControler.showAppointmentList);
router.get('/add', appointmentControler.showAddAppointmentForm);
router.get('/edit/:appointmentId', appointmentControler.showEditAppointmentForm)
router.get('/details/:appointmentId', appointmentControler.showAppointmentDetails);
router.get('/', function(req, res, next) {
    res.render('pages/appointment/list', { navLocation: 'appointment' });
});
router.post('/add', appointmentControler.addAppointment);
router.post('/edit', appointmentControler.updateAppointment);
router.get('/delete/:appointmentId', appointmentControler.deleteAppointment);

module.exports = router;
