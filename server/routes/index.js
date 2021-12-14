const router = require('express').Router();
router.use('/data', require('./data'));
router.use('/assets', require('./assets'));
router.use('/collection', require('./collection'));


module.exports = router;