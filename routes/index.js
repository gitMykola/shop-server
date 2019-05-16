const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('/shop', require('./shop/shopRoutes'));

//default API routes
router.get('/', (req, res) => {
    res.json({
        message: 'Avialable path /{api | shop}/{products | users}'
    });
});
router.post('/', (req, res) => {
    res.json({
        message: 'Avialable path /{api | shop}/{products | users}'
    });
});

module.exports = router;
