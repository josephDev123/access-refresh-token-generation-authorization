import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {authValidation} from '../utils/authValidation.js';
import {User} from '../Model/User.js';

const saltRound = 20;

export const loginController = async (req, res)=>{

   try{
         // login credential validation
         const {error} = authValidation(req.body);
         if(error) res.json({'error':true, 'message': error.message});

         const user =  await User.findOne({email:req.body.email});
         if(!user){
            if(error) res.json({'error':true, 'message': "user is not registered"});
         }
         const salt = await bcrypt.genSalt(saltRound)
         const loginPasswordHashed = await bcrypt.hash(req.body.password, salt)
         //compare the login password with the one in the db
          const compareHashed =  await bcrypt.compare(loginPasswordHashed, user.password);
          if(!compareHashed){
            if(error) res.json({'error':true, 'message': "user password incorrect"});
          }

          if(error) res.json({'error':false, 'message': "login successfully"});
          

   }catch(err){
      console.log(err.message)
   }
  

} 

export const registerController = (req, res)=>{
    
} 

