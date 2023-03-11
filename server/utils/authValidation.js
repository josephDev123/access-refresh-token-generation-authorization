import Joi from 'joi';

export function authValidation(body){
    const {firstname, lastname, email, password} = body
     const schema = Joi.object({
        firstname:Joi.string().max(20).min(3).required(),
        lastname:Joi.string().max(20).min(3).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password :Joi.string()
     })

    schema.validate({firstname, lastname, email, password});
}