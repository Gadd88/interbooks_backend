const User = require("../models/User")
const bcrypt = require("bcrypt")
const userServices = require("../services/userServices")


module.exports.userRegister = async (req,res) => {
    const { email, password , username, favoriteGenres, country, postalCode, phoneNumber } = req.body
    
    const result = await userServices.createUser( email, password, username, favoriteGenres, country, postalCode, phoneNumber)

    if (result.error) {
        if (result.error === "Email already exists") {
            return res.status(400).json({ error: result.error})
        } else {
            return res.status(500).json({ error: result.error})
        }
    }

    return res.status(201).json({ message: result.message, user: result.user})
}

module.exports.userUpdate = async (req,res) => {
    const { id } = req.params
    const { email, password, username, favoriteGenres, country, postalCode, phoneNumber } = req.body

        const result = await userServices.updateUser(id,email,password,username,favoriteGenres,country,postalCode,phoneNumber)

        if (result.error) {
            if (result.error === "User not found"){
                return res.status(404).json({ error: result.error})
            } else {
                return res.status(500).json({ error: result.error})
            }
        }

        return res.status(200).json({ message: result.message, user : result.user})
}

module.exports.userDelete = async (req,res) =>{
    const { id } = req.params

    const result = await userServices.deleteUser(id)

    if (result.error) {
        if (result.error === "User not found"){
            return res.status(404).json({ error : result.error})
        } else {
            return res.status(500).json({ error : result.error})
        }
    }
    
    return res.status(200).json({ message: result.message})
}