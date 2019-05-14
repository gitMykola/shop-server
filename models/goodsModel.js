const mongoose = require('mongoose');
const { Schema } = mongoose;

/*goods collection schema*/
const goodsSchema = new Schema({
    image: { type: String, default: 'default.jpg' },
    category: { type: String, default: 'No category' },
    title: { type: String, default: 'No title' },
    description: { type: String, default: 'No description' },
    price: { type: Number, default: 0 }
});
/*let to response field 'id' without '_id' and '__v'*/
goodsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('goods', goodsSchema);