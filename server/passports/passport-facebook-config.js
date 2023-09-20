require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var bcrypt = require('bcrypt');
var { User } = require('../models/userModel.js');

const initialize = (passport) => {
  // fn to check email and password matches user in db
  const authenticate = async (email, password, done) => {
    const user = await User.findOne({ where: { email: email }, raw: true})

    if (!user) {
      return done(null, false);
    }

    try {
      await bcrypt.compare(password, user.password) ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  };

  // google strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://",
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    console.log('profile: ', profile);
    let user = await User.findOne({ where: { email: profile.email }, raw: true});
    if (!user) {
      await User.create({
        email: profile.email,
        username: profile.given_name + ' ' + profile.family_name,
        photo: profile.picture || 'https://picsum.photos/200/200',
      })
      req._user = user;
      return done(null, user);
    }
  }))
  // facebook strategy

  // serialize and deserialize user in session
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id: id }, raw: true});
    return done(null, user.id);
  })
}

module.exports = initialize;