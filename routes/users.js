const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/register', require('../controllers/users_controller').register);

router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
}), require('../controllers/users_controller').signin);

router.get('/verify/:code', require('../controllers/verify_controller').index);
router.post('/resendverification', require('../controllers/verify_controller').resendverification);
router.post('/logout', require('../controllers/users_controller').logout);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), require('../controllers/users_controller').signin);

router.post('/forgotpass', require('../controllers/users_controller').forgotpass);
router.get('/resetpassword/:code', require('../controllers/users_controller').resetpassword);
router.post('/changepassword', require('../controllers/users_controller').changepassword);
router.post('/loggedinpasschange', require('../controllers/users_controller').loggedinpasschange);

module.exports = router;