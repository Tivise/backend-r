const express = require('express');
const router = express.Router();
const axios = require("axios");


const auth = require('../middleware/auth');
const steamController = require('../controllers/steam');

router.get('/getSteamUserInformation', auth, steamController.GetSteamUserInformation);


module.exports = router;