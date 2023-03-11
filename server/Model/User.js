import mongoose from 'mongoose';

const schema = mongoose.Schema({
    firstname:{
        type:String(),
        maxLength:20,
        minLength: 5
    },
    lastname: {
        type:String(),
        maxLength:20,
        minLength: 5
    },
    password:{
        type:String(),
        max:20,
        min: 5
    },
    email:  {
        type:String(),
        unique: true
    },
})

export const User = mongoose.model('User', schema);