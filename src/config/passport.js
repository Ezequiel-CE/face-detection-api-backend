const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");

//add the user to the req obj
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

//local strategy

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      try {
        //check user
        const user = await User.findOne({
          where: { mail: username },
        });

        if (!user) {
          return done(null, false);
        }
        //check password
        const { dataValues: userData } = user;
        const validPassword = await bcrypt.compare(password, userData.password);
        if (!validPassword) {
          return done(null, false);
        }
        //pass user data
        delete userData.password;
        return done(null, userData);
      } catch (error) {
        return done(error); //status 401
      }
    }
  )
);
