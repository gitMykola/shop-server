const Goods = require(appRoot + '/models/goodsModel');
const Filter = require(appRoot + '/lib/filter');


/*@summary return total good count from goods collection
 * according to optional searching data,
 * @data - Object, optional, now only field 'title', can be
 * expanded by others collection fields, default - empty object,
 * @response - Object{
 *  count - Number, total goods count, by search input criteria data
 *  sum - Number, total goods price ammount, by search input criteria data
 */
async function getCount(data = {}) {
    const filter = Filter.validate(data).result ? Filter.filter(data) : {};
    //return await Goods.find(filter).countDocuments();
    const result = await Goods.aggregate([
        {
            $match: filter
        },
        {
            $group: {
                _id: null,
                sum: { $sum: { $add: ['$price'] } },
                count: { $sum: 1 }
            }
        }
    ]);
    return {
        count: result[0] ? result[0].count : 0,
        sum: Math.round((result[0] ? result[0].sum : 0) * 100)/100
    }
}


/*@summary return goods list from goods collection
 * according to optional searching data,
 * @page - Number, optional, requested page, default - 0,
 * @count - Number, optional, pages number, default - 10
 * @data - Object, optional, now only field 'title' & 'id', can be
 * expanded by others collection fields, default - empty object,
 * @response - Array of Objects[], where every object created from 
 * goods collection document: {
 *      image - String, image url(path),(uploaded file size upto 9M & onle jpeg | png),
 *      category - String,(length 0...255),
 *      title - string,(length 0...255),
 *      description - string,(length 0...255),
 *      price - number,(0...1e9),
 *      id - string, created from MongoDB _id
 * }
 */
async function getItems(page = 0, count = 10, data = {}) {
    const filter = Filter.validate(data).result ? Filter.filter(data) : {};
    return await Goods.find(filter)
            .skip(page * count)
            .limit(count);
}


/*@summary create a goods document,
 * @data - Object, with all goods collection fields,
 * @response - Object, created object.
 */
async function createItem(data) {
    return await (new Goods(data)).save();
}


/*@summary update collection document,
 * @data - Object, inlcude up to all collection fields,
 * field 'id' is necessary, others by needed,
 * @response - Object {
 * id: String - updated document id,
 * message - String, content is 'Updated'
 * }
 */
async function updateItem(data) {
    return await Goods.updateOne({_id: data.id},data);
}


/*@summary delete collection document by id,
 * @id - String, target document id,
 * @response - Object {
 * id: String - deleted document id,
 * message - String, content is 'Deleted'
 * }
 */
async function deleteItem(id) {
    return await Goods.deleteOne({_id: id});
}


/*@summary validate data to creaye, update and delete operations,
 * @data - Object, data object, cat consist of all collection fields
 * for create operation, all or less field for update operation and only 'id'
 * field for delete operation,
 * @file - File object, only for create or update operations,
 * @update - Boolean, to determiname operation type(true - update, false - others),
 * @response - Object {
 * result: Boolean - to show correct data or not,
 * error - String, in case of failure, content include wrong field 
 * }
 */
function validate(data, file, update = false) {
    const valid = update ?
        Object.assign(data, file ? { file: file } : { }) :
        Object.assign({
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price
        }, { file: file });
    if (update) Object.assign(valid, {id: data.id});
    const validator = Filter.validate(valid);
    if (!validator.result) throw new Error(validator.error);
    return true;
}


module.exports = {
    getCount:   getCount,
    getItems:   getItems,
    create:     createItem,
    update:     updateItem,
    delete:     deleteItem,
    validate:   validate
};