var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/adminUser',require('../controler/adminUser'))
router.use('/admin/news',require('../controler/newlist'))

module.exports = router;
