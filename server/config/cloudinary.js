import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

export default async function cloudinaryConnection(){
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_KEY,
            api_secret: process.env.CLOUD_SECRET
        })
        console.log("Cloudinary Connection established successfully");
    }
    catch(err){
        console.log("Error while connecting to cloudinary");
        console.error(err);
    }
}