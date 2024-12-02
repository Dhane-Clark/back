const express = require('express');
const router = express.Router();
const userCon = require('../controller/userCon')

router.post('/login', userCon.userLog);
router.post('/register', userCon.userReg);


module.exports = router;