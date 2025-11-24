const express = require('express');
const router = express.Router({ mergeParams: true });
const warpAsync = require('../utils/warpAsync');
const passport = require('passport');
const { getpost } = require('../Controller/post');
const upload = require("../utils/multer");


router.route('/')
    .get(warpAsync(getpost));


module.exports = router;
