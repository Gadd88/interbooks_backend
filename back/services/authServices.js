const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports.loginService = async = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return { error: "Invalid credentials" };
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return { error: "Invalid credentials" };
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token, user };
    }
    catch (error) {
        console.log("error when logging in", error);
        return { error: "error when logging in" };
    }
}