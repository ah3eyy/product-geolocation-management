import Joi from "joi";

const joiSchema = {
    register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().required()
    }),
    login: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    createProduct: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        available_radius: Joi.optional(),
        images: Joi.optional(),
        geo_location: Joi.optional(),
        price: Joi.optional(),
    })
};


export default joiSchema;
