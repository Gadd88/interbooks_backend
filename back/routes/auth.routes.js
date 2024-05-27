const express = require("express")
const loginController = require("../controllers/authController.js");

const router = express.Router()

router.post("/auth/login", loginController.login);

router.post("/auth/logout", loginController.logout);

module.exports = router