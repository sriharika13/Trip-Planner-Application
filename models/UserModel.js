const mongoose = require('mongoose')
const passportLocalMongoose= require('passport-local-mongoose')
//provides Passport.js integration for Mongoose schemas. Passport.js is a popular authentication middleware for Node.js applications

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose) 
//this plugin adds username and hashed pwd fields to schema. 
// adds various methods for handling user authentication like password hashing, user registration, login, logout, and session management.
// some methods it adds to UserModel are authenticate(), serializeUser(), and deserializeUser()
// no need to write boilerplate code for hashing passwords, validating user credentials, or handling user sessions. 

const UserModel = mongoose.model('UserModel', userSchema)

module.exports={
    UserModel
}