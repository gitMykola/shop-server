const express = require('express');
const goodsController = require(appRoot + '/controllers/goodsController');
const router = express.Router();  
const uploader = require(appRoot + '/services/uploaderService');

//api routes

//get goods list optional by pages & filtered by tilte field
router.get('/', goodsController.get);

//get goods total count optional filtered by tilte field
router.get('/count', goodsController.count);

//create goods
router.post('/create', uploader.single('image'),
    goodsController.create);

//update goods
router.post('/update', uploader.single('image'),
    goodsController.update);

//delete goods
router.get('/delete', goodsController.delete);

module.exports = router;
