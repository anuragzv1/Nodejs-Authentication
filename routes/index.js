const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', require('../controllers/index_controller').index);
router.get('/profile',passport.checkAuth, require('../controllers/profile_controller').profile);
router.post('/verifyCaptcha', require('../controllers/captcha_controller').verifyCaptcha);
router.use('/users', require('./users'));


module.exports = router;