const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const customFilds = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFilds, async (username, password, done) => {})
);
