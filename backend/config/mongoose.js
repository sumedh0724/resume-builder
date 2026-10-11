import mongoose from 'mongoose';

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        // console.log("Connected to DB successfully...");
        
    }
    catch(err){
        // console.log(err);
        
    }
}

export {connectToDB}