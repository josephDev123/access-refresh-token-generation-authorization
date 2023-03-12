import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {registerCredentialValidation} from '../utils/registerCredentialValidation.js';
import {loginCredentialValidation} from '../utils/loginCredentialValidation.js';
import {User} from '../Model/User.js';

const saltRound = 20;

export const loginController = async (req, res)=>{

   try{
         // login credential validation
         const {error} = loginCredentialValidation(req.body);
         if(error) res.json({'error':true, 'message': error.message});

         const user =  await User.findOne({email:req.body.email});
         if(!user){
            return res.json({'error':true, 'message': "user is not registered"});
         }
         const salt = await bcrypt.genSalt(saltRound)
         const loginPasswordHashed = await bcrypt.hash(req.body.password, salt)
         //compare the login password with the one in the db
          const compareHashed =  await bcrypt.compare(loginPasswordHashed, user.password);
          if(!compareHashed){
             return res.json({'error':true, 'message': "user password incorrect"});
          }

          return res.json({'error':false, 'message': "login successfully", data:{user}});
          

   }catch(err){
     return res.json({'error':true, 'message': "login failed"});
   }
  

} 

export const registerController = async (req, res)=>{

   const body = req.body
   console.log(body)
   // const {error} =  registerCredentialValidation(req.body);
   // if(error){
   //    return res.json({'error':true, 'message':error.message()})
   // }

   // const user =  await User.findOne({email:body.email});
   // if(user){
   //    return res.json({'error':true, 'message':'email already in use'})
   // }
   
   // const salt = await bcrypt.genSalt(saltRound);
   // const hashed = await bcrypt.hash(body.password, salt);
   // const compareHashed = await bcrypt.compare(hashed, user.password);

   // if(compareHashed){
   //    return res.json({'error':true, 'message':'password already in use'})
   // }

   // return res.json({'error':false, 'message':'register successfully'});
    res.end()
} 

