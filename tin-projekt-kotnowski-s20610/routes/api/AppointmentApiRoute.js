const express = require ('express');
const router = express.Router();

const apptApiController = require ('../../api/AppointmentAPI');

router.get ('/', apptApiController.getAppointments);
router.get ('/:appointmentId', apptApiController.getAppointmentById);
router.post ('/', apptApiController.createAppointment);
router.put ('/:appointmentId', apptApiController.updateAppointment);
router.delete ('/:appointmentId', apptApiController.deleteAppointment);

module.exports = router;