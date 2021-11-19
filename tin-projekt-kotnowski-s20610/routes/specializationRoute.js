const express = require('express');
const router = express.Router();

const specializationControler = require('../controllers/specializationController');

router.get('/', specializationControler.showSpecializationList);
router.get('/add', specializationControler.showAddDSpecializationForm);
router.get('/details/:specializationId', specializationControler.showSpecializationDetails);

module.exports = router;
