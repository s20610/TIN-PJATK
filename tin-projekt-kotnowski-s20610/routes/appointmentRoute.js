const express = require('express');
const router = express.Router();

const appointmentControler = require('../controllers/appointmentController');

router.get('/', appointmentControler.showAppointmentList);
router.get('/add', appointmentControler.showAddAppointmentForm);
//TODO Sprawdzic czy tak to powinno wygladac
router.get('/details/:appointmentId', appointmentControler.showAppointmentDetails);

module.exports = router;
