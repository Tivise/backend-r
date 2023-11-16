const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/steam', authController.OnConnectSteam);
router.post('/steam/return', authController.ReturnAfterSteam);
router.get('/validate', authController.ValidateSteam);

module.exports = router;