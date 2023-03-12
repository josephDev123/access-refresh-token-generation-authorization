import Joi from 'joi';

export function loginCredentialValidation(body){
    const { email, password} = body
     const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password :Joi.string().min(5).max(10).required()
     })

    schema.validate({email, password});
}