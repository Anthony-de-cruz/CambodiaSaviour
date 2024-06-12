var express = require("express");
var router = express.Router();

const LoginRegisterController = require("../controllers/loginRegisterController");

router.get(
    "/",
    LoginRegisterController.checkAuthToken,
    LoginRegisterController.collectAuthTokenData,
    function (req, res, next) {
        res.render("register", {
            loggedIn: req.loggedIn,
            selectedNav: "registerNav",
            title: "Register",
        });
    },
);

router.post("/", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const phone_number = req.body.phone_number;

    console.log(
        "Attempted register as: " +
            username +
            "," +
            password +
            "," +
            phone_number,
    );

    try {
        await LoginRegisterController.registerUser(
            username,
            password,
            phone_number,
        );
        res.redirect("/");
    } catch (error) {
        console.log("ERR: Registration failed", error);
        return res.render("register", {
            registerResult: "ERR: Registration failed",
        });
    }
});

module.exports = router;
