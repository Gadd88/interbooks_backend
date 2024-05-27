const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports.createUser = async ( email, password, username, favoriteGenres, country, postalCode, phoneNumber) =>{
    try{
        const existingUser = await User.findOne({ email})
        if (existingUser){
            return { error : "Email already exists"}
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            favoriteGenres,
            country,
            postalCode,
            phoneNumber
        })
        await newUser.save()
        return { message: "User created succesfully", user: newUser}
    }catch (e) {
        console.log("error when creating user",e)
        return { error : "error when creating user"}
    }
}

module.exports.updateUser = async (id, email, password, username, favoriteGenres, country, postalCode, phoneNumber) =>{
    try{
        const user = await User.findById(id)
        if (!user){
            return {error: "User not found"}
        }

        if (email) user.email = email
        if (password) user.password = await bcrypt.hash(password, 10)
        if (username) user.username = username
        if (favoriteGenres) user.favoriteGenres = favoriteGenres
        if (country) user.country = country
        if (postalCode) user.postalCode = postalCode
        if (phoneNumber) user.phoneNumber = phoneNumber
        
        await user.save()
        return { message : "user updated successfully", user : user}
    } catch (e){
        console.log("error when updating user",e)
        return { error : "error when updating user"}
    }
}

module.exports.deleteUser = async (id) =>{
    try{
        const user = await User.findByIdAndDelete(id)
        
        if(!user) {
            return { error : "User not found"}
        }

        return { message: "User deleted successfully"}
    } catch (e) {
        console.log("error when deleting user",e)
        return { error : "error when deleting user"}
    }
}