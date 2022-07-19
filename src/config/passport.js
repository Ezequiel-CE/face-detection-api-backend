const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
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
        delete userData.id;
        return done(null, userData);
      } catch (error) {
        return done(error); //status 401
      }
    }
  )
);

//jwt strategy

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      done(null, payload);
    } catch (error) {
      done(error);
    }
  })
);
