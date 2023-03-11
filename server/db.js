import mongoose from 'mongoose';

export function db(){
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if(err) console.log('initial db connection fails:'+ err.message());
        console.log('initial db connection successful')
    });
    
    mongoose.connection.on("error", (err)=>{
        console.log('after initial db connection error: '+err.message())
    })
    
    mongoose.connection.on("connected", ()=>{
        console.log('after initial db connection successful')
    })

}
