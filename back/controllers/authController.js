const loginService = require("../services/authServices")

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await loginService.loginService(email, password)
        if (user.error) {
            return res.status(400).json({ error: user.error })
        }
        res.status(200).json({ "userId": user.user._id, "Bearer": user.token })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

module.exports.logout = async (req, res) => {
    res.cookie("Bearer", "", { maxAge: 0 })
    res.status(200).json({ message: "Logout successful" })
}