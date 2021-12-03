const router = require('express').Router();

router.use('/assets', require('./assets'));
router.use('/collection', require('./collection'));

module.exports = router;