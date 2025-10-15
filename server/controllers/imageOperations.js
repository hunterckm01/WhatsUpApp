import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'

export async function uploadImageToCloudinary(req, res){
    try{
        if(!req.file){
            return res.status(400).json({
                error: "No File Found"
            })
        }

        const options = {
            folder: process.env.FOLDER_NAME,
            resource_type: "auto"
        }

        const result = await cloudinary.uploader.upload(req.file.path, options);

        res.status(200).json({
            message: "Image has been uploaded successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Image has not been uploaded properly",
            error: err
        })
    }
}