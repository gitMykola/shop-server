const passport = require('passport');
require(appRoot + '/config/passportInit');

function localLogin(req, res, next){
    passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) return res.status(400).json(err);
        if(!passportUser) {console.dir('Error pUser');return res.status(400).json(info);}
        passportUser.token = passportUser.generateJWT();
        return res.json({ user: passportUser.toAuthJSON() });
    })(req, res, next);
}

function googleLogin(req, res, next) {
    passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' },(err, profile, info) => {
        console.dir(err);
        console.dir(profile);
        console.dir(info);
    })(req,res, next);
}
function googleAuthentication(req, res, next) {
    passport.authenticate('google', { scope: ['profile'] }, (err, profile, info) => {
        console.dir(err);
        console.dir(profile);
        console.dir(info);
        return res.json(profile);
    })(req, res, next);
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
    local:                      localLogin,
    google:                     googleLogin,
    googleAuthentication:       googleAuthentication,
    facebook:                   facebookLogin,
    facebookAuthentication:     facebookAuthentication,
    twitter:                    twitterLogin,
    twitterAuthentication:      twitterAuthentication,
    instagram:                  instagramLogin,
    instagramAuthentication:    instagramAuthentication,
    linked:                     linkedLogin,
    linkedAuthentication:       linkedAuthentication
};
