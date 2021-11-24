const express = require ('express');
const router = express.Router();

const specApiController = require ('../../api/SpecializationAPI');

router.get ('/', specApiController.getSpecializations);
router.get ('/:specializationId', specApiController.getSpecializationById);
router.post ('/', specApiController.createSpecialization);
router.put ('/:specializationId', specApiController.updateSpecialization);
router.delete ('/:specializationId', specApiController.deleteSpecialization);

module.exports = router;