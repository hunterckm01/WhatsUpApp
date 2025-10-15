import multer from "multer";
import imageFilter from "./fileFilter";
import storageConfig from "./uploadStorage";

export default async function uploadConfig(){
    const storage = await storageConfig();
    const fileFilter = await imageFilter();

    const uploadImage = multer({
        storage,
        fileFilter, 
        limits: {fileSize: 5 * 1024 * 1024},
    });

    return uploadImage;
}