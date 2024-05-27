const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.post("/user/register",userControllers.userRegister)
router.put("/user/edit/:id", userControllers.userUpdate)
router.delete("/user/delete/:id", userControllers.userDelete)

module.exports = router