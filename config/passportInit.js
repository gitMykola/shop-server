const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const Config = require(appRoot + '/config/config');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    Users.findOne({ email }, function(err, user) {
            if(err) return done(null, false, err);
            if(!user) return done(null, false, { error: 'email is invalid' });
            if(!user.validatePassword(password)) {
                return done(null, false, { error: 'password is invalid' });
            }
            return done(null, user);
        })
}));

passport.use(new GoogleStrategy({
        clientID: Config.auth.google.clientId,
        clientSecret: Config.auth.google.clientSecret,
        callbackURL: "http://www.eteam.in.ua/api/users/google"
    },
    function(token, tokenSecret, profile, done) {
        /*Users.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });*/
        done(null, profile);
    }
));

