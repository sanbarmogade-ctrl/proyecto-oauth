const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  facebookAuth
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/facebook", facebookAuth);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({
      message: "Login con Google correcto",
      user: req.user
    });
  }
);

module.exports = router;