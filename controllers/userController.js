const userService = require(appRoot + '/services/userService');

async function createNewUser(req, res) {
    try {
        const { body: { user } } = req;
        res.json({ user: await userService.createNewUser({
                email: user && user.email,
                password: user && user.password
            }) });
    } catch(error){
        res.status(500).json({
            code: 1101,
            error: error.message
        })
    }
}
async function getUserById(req, res) {
    try {
        const { query: { id } } = req;
        const user = await userService.getUserById(id);
        res.json({user: user.toAuthJSON()});
    } catch(error) {
        res.status(500).json({
            code: 1102,
            error: error.message
        })
    }
}
module.exports = {
    create: createNewUser,
    current: getUserById
};
