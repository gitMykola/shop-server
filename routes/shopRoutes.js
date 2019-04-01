const express = require('express');
const router = express.Router();

//catalog route
router.get('/', async (req, res) => {
    try {
        res.render('catalog', {});
    } catch (error) {
        res.send(`Error: ${error.message}`)
    }
});

module.exports = router;