import Joi from 'joi';

export function registerCredentialValidation(body){
    // const {firstname, lastname, email, password} = body
    // console.log('hello: '+body)
     const schema = Joi.object({
        firstname:Joi.string().max(20).min(5).required(),
        lastname:Joi.string().max(20).min(5).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password :Joi.string().min(5).max(10).required()
     })

    return schema.validate({
        firstname:body.firstname,
        lastname:body.lastname,
         email:body.email, 
         password: body.password
        });
}