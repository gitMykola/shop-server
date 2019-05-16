const authService = require(appRoot + '/services/authService');

function localLogin(req, res, next) {
    try {
        authService.local(req, res, next);
    } catch(error){
        res.status(500).json({
            code: 1101,
            error: error.message
        })
    }
}
function googleLogin(req, res, next) {
    try {
        authService.google(req, res, next);
    } catch(error) {
        res.status(500).json({
            code: 1102,
            error: error.message
        })
    }
}
function googleAuthentication(req, res, next) {
    try {
        authService.googleAuthentication(req, res);
    } catch(error) {
        res.status(500).json({
            code: 1103,
            error: error.message
        })
    }
}

function facebookLogin() {};
function facebookAuthentication() {};
function twitterLogin() {};
function twitterAuthentication() {};
function instagramLogin() {};
function instagramAuthentication() {};
function linkedLogin() {};
function linkedAuthentication() {};

module.exports = {
    local:            localLogin,
    google:           googleLogin,
    googleAuth:       googleAuthentication,
    facebook:         facebookLogin,
    facebookAuth:     facebookAuthentication,
    twitter:          twitterLogin,
    twitterAuth:      twitterAuthentication,
    instagram:        instagramLogin,
    instagramAuth:    instagramAuthentication,
    linked:           linkedLogin,
    linkedAuth:       linkedAuthentication
};
