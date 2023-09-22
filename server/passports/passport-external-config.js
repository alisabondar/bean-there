require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt');
var { User } = require('../models/userModel.js');

/*
GOOGLE_CLIENT_ID=560066007622-9mhiloqanf5tf6ovsllcvhfrr7ek22a8.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
*/

// google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/user/google/callback",
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ where: { email: profile.emails[0].value }, raw: true });
  if (!user) {
    await User.create({
      email: profile.emails[0].value,
      username: profile.displayName,
      photo: 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg',
      password: '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK'
    })
    user = await User.findOne({ where: { email: profile.emails[0].value }, raw: true });
  }
  return done(null, user);
}));

// github strategy
// passport.use(new GithubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: "/user/github/callback",
//   passReqToCallback: true
// }, async (req, accessToken, refreshToken, profile, done) => {
//   console.log('github profile: ', profile);
//   let user = await User.findOne({ where: { email: profile.username }, raw: true });
//   if (!user) {
//     await User.create({
//       email: profile.username,
//       username: profile.displayName,
//       photo: 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg',
//       password: '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK'
//     })
//     user = await User.findOne({ where: { email: profile.username }, raw: true });
//   }
//   return done(null, user);
// }));

// serialize and deserialize user in session
passport.serializeUser((user, done) => {
  return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id: id }, raw: true });
  return done(null, user.id);
})
