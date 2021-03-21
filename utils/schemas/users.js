const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
    name: joi.string().max(100).required(),
    email: joi.email().required(),
    password: joi.string().required(),
    isAdmin: joi.boolean()
};

const updateUserSchema = {
    name: joi.string().max(100),
    email: joi.email(),
    password: joi.string(),
    isAdmin: joi.boolean()
}

module.exports = {
    userIdSchema,
    createUserSchema,
    updateUserSchema
};
