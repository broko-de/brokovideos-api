const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    isAdmin: joi.boolean()
};

const createUserSchema = {
    ...userSchema,
    isAdmin: joi.boolean()
}

const createProviderUserSchema = {
    ...userSchema,
    apiKeyToken: joi.string().required()
}

const updateUserSchema = {
    name: joi.string().max(100),
    email: joi.string().email(),
    password: joi.string(),
    isAdmin: joi.boolean()
}

module.exports = {
    userIdSchema,
    createUserSchema,
    updateUserSchema,
    createProviderUserSchema
};
