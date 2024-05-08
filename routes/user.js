const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

router.route("/signup")
    .get(userController.renderSignupPage)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.renderLoginPage)
    .post(saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        userController.login);

router.get("/logout", userController.destroyUser);

module.exports = router;