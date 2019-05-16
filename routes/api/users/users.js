const express = require('express');
const router = express.Router();
const auth = require(appRoot + '/routes/auth');
const userController = require(appRoot + '/controllers/userController');
const authController = require(appRoot + '/controllers/authController');


//create new User
router.post('/', auth.optional, userController.create);

//login user
router.post('/login', auth.optional, authController.local);

//get current user
router.get('/current', auth.optional, userController.current);

router.get('/googleLogin', authController.google);
router.get('/google', authController.googleAuth);

router.get('/facebookLogin', authController.facebook);
router.get('/facebook', authController.facebookAuth);

router.get('/twitterLogin', authController.google);
router.get('/twitter', authController.googleAuth);

router.get('/instagramLogin', authController.instagram);
router.get('/instagram', authController.instagramAuth);

router.get('/linkedLogin', authController.linked);
router.get('/linked', authController.linkedAuth);


module.exports = router;
