const User = require(appRoot + '/models/userModel');
const Filter = require(appRoot + '/lib/filter');

async function createNewUser(data) {
    const validator = Filter.validate(data);
    if(!validator.result) throw new Error(validator.error);

    if(0 in await _getUserByEmail(data.email)) throw new Error(`Email ${data.email} busy!`);

    const newUser = new User(data);

    newUser.setPassword(data.password);
    await newUser.save();

    return newUser.toAuthJSON();
}
//return array, if user's found, it'll put in first position
async function _getUserByEmail(email){
    return await User.find({email: email});
}
async function getUserById(id){
    const validator = Filter.validate({id: id});
    if(!validator.result) throw new Error(validator.error);
    return await User.findOne({_id: id});
}

module.exports = {
    createNewUser:      createNewUser,
    getUserById:        getUserById
};
