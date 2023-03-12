import mongoose from 'mongoose';

export function db(){
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});
    
    mongoose.connection.on("error", (err)=>{
        console.log('after initial db connection error: '+err);
    })
    
    mongoose.connection.on("connected", ()=>{
        console.log('after initial db connection successful')
    })

}
