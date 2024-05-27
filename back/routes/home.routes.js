const express = require("express")
const passport = require("passport")
const jwt = require("../middlewares/auth.middlewares").verifyUser

const router = express.Router()

router.get("/home", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send("Home")
})

module.exports = router