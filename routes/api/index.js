const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users'));
router.use('/products', require('./products/products'));

//default API routes
router.get('/', (req, res) => {
    res.json({
        message: 'Avialable path /api/{products | users}'
    });
});
router.post('/', (req, res) => {
    res.json({
        message: 'Avialable path /api/{products | users}'
    });
});

module.exports = router;
