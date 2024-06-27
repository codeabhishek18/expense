const User = require('../Models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

class UserService
{
    findUserByEmail = async (email) =>
    {
        const user = await User.findOne({ email })
        return user;
    }

    findUserById = async (userId) =>
    {
        const user = await User.findById(userId);
        return user;
    }

    comparePasswords = async (inputPassword, validPassword) =>
    {
        const isValid = await bcrypt.compare(inputPassword, validPassword); 
        return isValid;
    }

    generateToken = (id) =>
    {
        return jwt.sign({ id }, secretKey, { expiresIn : '24hrs' }) 
    }

    createUser = async (name, email, password) =>
    {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name : name, email : email, password : hashedPassword })
        await newUser.save();
    }

    deleteUser = async (userId) =>
    {
        const user = await findByIdAndDelete(userId);
        await user.save();
    }
}

module.exports = UserService