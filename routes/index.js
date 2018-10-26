let express = require('express');
let router = express.Router();

/* GET home page. */
router.use('/admin/adminUser',require('../controler/adminUser'))
router.use('/admin/news',require('../controler/newlist'))
router.use('/admin/swiper',require('../controler/swiper'))

module.exports = router;
