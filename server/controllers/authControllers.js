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
         if(error) {
            return res.status(400).json({'status':'error', 'message': error.message});
         }
         const user =  await User.findOne({email:req.body.email});
         if(!user){
            return res.status(400).json({'status':'error', 'message': "Email is not registered"});
         }
         // const salt = await bcrypt.genSalt(saltRound)
         // const loginPasswordHashed = await bcrypt.hash(req.body.password, salt)
         //compare the login password with the one in the db
          const compareHashed =  await bcrypt.compare(req.body.password, user.password);
          if(!compareHashed){
             return res.status(400).json({'status':'error', 'message': "user password incorrect"});
          }

          return res.status(200).json({'status':'success', 'message': "login successfully", data:{user}});
          

   }catch(err){
     return res.status(500).json({'status':'error', 'message': "login failed"});
   }

} 

export const registerController = async (req, res)=>{
   const body = req.body;
  
   const {error} =  registerCredentialValidation(body);
   if(error){
      return res.status(400).json({'status':'error', 'message':error.message})
   }

   const user =  await User.findOne({email:body.email});
   // console.log(user)
   if(user){
      const compareHashed = await bcrypt.compare(body.password, user.password);
      if(compareHashed){
      return res.status(400).json({'status':'error', 'message':'password already in use'})
   }
      return res.status(400).json({'status':'error', 'message':'email already in use'})
   }
   

   const salt = await bcrypt.genSalt(saltRound);
   const hashed = await bcrypt.hash(body.password, salt);
   // console.log(hashed)
   await new User({firstname:body.firstname,
      lastname:body.lastname, 
      password:hashed, 
      email:body.email 
   }).save().catch(err=>res.status(500).json({'status':'error',  'message':'register fails'}));
   return res.status(200).json({'status':false,  'message':'register successfully'});
   //  res.end()
} 

