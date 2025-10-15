import mongoose from 'mongoose'
import 'dotenv/config'

export default async function dbConnection(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connection Established");
    }
    catch(err){
        console.log("Cannot Established database connection");
        console.error(err);
        process.exit(1);
    }
}