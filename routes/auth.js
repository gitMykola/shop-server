const jwt = require('express-jwt');
const config = require(appRoot + '/config/config');

const getTokenFromHeaders = (req) => {
    const { headers: { Authorization } } = req;

    if(Authorization && Authorization.split(' ')[0] === config.auth.headerKey) {
        return Authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;
