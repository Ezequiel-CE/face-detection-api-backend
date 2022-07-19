const router = require("express").Router();
const passport = require("passport");
const {
  resgiterUser,
  loginUser,
  isValidUser,
} = require("../controllers/auth.controllers");

router.post("/register", resgiterUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);
router.get(
  "/isValid",
  passport.authenticate("jwt", { session: false }),
  isValidUser
);

module.exports = router;
