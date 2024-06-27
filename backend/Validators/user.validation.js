const Joi = require('joi');

const loginSchema = Joi.object().keys({
    name : Joi.optional(),
    email : Joi.string().required(),
    password : Joi.string().required()
})

const signupSchema = Joi.object().keys({
    name : Joi.string().max(25).required(),
    email : Joi.string().required(),
    password : Joi.string().required()
})

module.exports = { loginSchema, signupSchema }