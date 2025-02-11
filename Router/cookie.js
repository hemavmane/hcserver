

const express = require('express');
const router = express.Router();
const ConsentController = require('../Controller/Cookies');


router.post('/create', ConsentController.createConsent);

router.get('/getdata', ConsentController.getCookies);
router.get('/getbyid/:id', ConsentController.getById);

router.post('/trash/:id', ConsentController.createTrash);

module.exports = router;