const router = require("express").Router();
const passport = require("passport");
const { resgiterUser, loginUser } = require("../controllers/auth.controllers");

router.post("/register", resgiterUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);

module.exports = router;
