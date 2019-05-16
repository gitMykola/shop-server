const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String,
    hash: String,
    salt: String
});
/*let to response field 'id' without '_id' and '__v'*/
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Users', UserSchema);
