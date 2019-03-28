const express = require('express');
const goodsController = require(appRoot + '/controllers/goodsController');
const router = express.Router();
const uploader = require(appRoot + '/services/uploaderService');

//api routes

//get goods list optional by pages & filtered by tilte field
router.get('/api/goods', goodsController.get);

//get goods total count optional filtered by tilte field
router.get('/api/goods/count', goodsController.count);

//create goods
router.post('/api/goods/create', uploader.single('image'),
    goodsController.create);

//update goods
router.post('/api/goods/update', uploader.single('image'),
    goodsController.update);

//delete goods
router.get('/api/goods/delete', goodsController.delete);

//default API routes
router.get('/api', (req, res) => {
    res.json({
        message: 'Avialable path /api/goods'
    });
});
router.post('/api', (req, res) => {
    res.json({
        message: 'Avialable path /api/goods'
    });
});

//default routes
router.get('/', (req, res) => {
    res.json({
        message: 'API avialable on /api'
    });
});
router.post('/', (req, res) => {
    res.json({
        message: 'API avialable on /api'
    });
});

module.exports = router;