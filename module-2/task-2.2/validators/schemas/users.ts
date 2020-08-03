import * as Joi from '@hapi/joi';

export const userSchema = Joi.object({
    login: Joi.string()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()

});
