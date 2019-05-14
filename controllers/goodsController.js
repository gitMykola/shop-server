const goodsService = require(appRoot + '/services/goodsService');

/*return total documents count according to search criteria(now only 
 * field 'title')*/
async function count(req, res) {
    try {
        const { title } = req.query;
        res.json(await goodsService.getCount(
            { title: title }
        ));
    } catch (err) {
        res.status(500).json({
            code: 1000,
            error: err.message
        })
    }

}


/*return documents list by pages, according to search criteria(now only 
 * field 'title', 'id')*/
async function getItems(req, res) {
    try {
        const { page, count, title, id } = req.query;
        const searchCriteria = Object.assign(
            title ? { title: title } : {},            
            id ? { _id: id } : {}
        );
        res.json({
            products: await goodsService.getItems(
                Number(page - 1),
                Number(count),
                searchCriteria
            )
        });
    } catch (err) {
        res.status(500).json({
            code: 1001,
            error: err.message
        })
    }
}


/*create new document*/
async function createItem(req, res) {
    try {
        goodsService.validate(req.body, req.file);
        const data = Object.assign(req.body,
            { image: /*imagePath*/apiUrl + req.file.path.split(sep).pop() });
        res.json(await goodsService.create(data));
    } catch (err) {
        res.status(500).json({
            code: 1002,
            error: err.message
        })
    }
}


/*update exists document by id according to sending data*/
async function updateItem(req, res) {
    try {
        goodsService.validate(req.body, req.file, true);
        const fileName = req.file && req.file.path.split(sep).pop();
        const data = Object.assign(req.body, req.file ?
            { image: /*imagePath*/apiUrl + fileName } : {});
        await goodsService.update(data);
        res.json({
            id: data.id,
            message: 'Updated'
        });
    } catch (err) {
        res.status(500).json({
            code: 1003,
            error: err.message
        })
    }
}


/*delete document by id*/
async function deleteItem(req, res) {
    try {
        const { id } = req.query; 
        goodsService.validate({id: id}, null, true);
        await goodsService.delete(id);
        res.json({
            id: id,
            message: 'Deleted'
        });
    } catch (err) {
        res.status(500).json({
            code: 1004,
            error: err.message
        })
    }}

module.exports = {
    count:  count,
    get:    getItems,
    create: createItem,
    update: updateItem,
    delete: deleteItem
};
