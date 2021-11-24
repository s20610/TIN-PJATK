const express = require ('express');
const router = express.Router();

const doctorApiController = require ('../../api/DoctorAPI');

router.get ('/', doctorApiController.getDoctors);
router.get ('/:doctorId', doctorApiController.getDoctorById);
router.post ('/', doctorApiController.createDoctor);
router.put ('/:doctorId', doctorApiController.updateDoctor);
router.delete ('/:doctorId', doctorApiController.deleteDoctor);

module.exports = router;