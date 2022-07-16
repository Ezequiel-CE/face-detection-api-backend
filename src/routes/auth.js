const router = require("express").Router();
const { resgiterUSer } = require("../controllers/auth.controllers");

router.post("/register", resgiterUSer);

router.post("/login", (req, res) => {});

module.exports = router;
