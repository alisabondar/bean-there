var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var { User } = require('./models/userModel.js');

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

  // local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate));

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