//validation
const Joi = require('@hapi/joi');

//register validation

const email = Joi.string()
    .email()
    .min(3)
    .max(50)
    .required()
    .label('Please enter a valid email.');

const first_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100);

const last_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100);

const password = Joi.string()
    .regex(/[a-zA-Z0-9]{8,}$/)
    .required()
    .label('Password must have a minimum of 8 characters.');

const username = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label('Please enter a valid username');

module.exports = {
    //user registration
    registerUserValidation: Joi.object().keys({
        username,
        email,
        first_name,
        last_name,
        password,
    }),
    loginUserValidation: Joi.object().keys({
        username,
        password,
    }),
};