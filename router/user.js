const express = require('express');
const router = express.Router({ mergeParams: true });
const warpAsync = require('../utils/warpAsync');
const passport = require('passport');
const { signup, login, changepassword } = require('../Controller/usre');
const upload = require("../utils/multer");

router.route('/signup')
    .post(warpAsync(signup));

router.post(
    '/login',
    passport.authenticate('local', { failureMessage: true }),
    warpAsync(login)
);
router.post('/changepassword', warpAsync(changepassword))



module.exports = router;
