import path from 'path';

export default async function imageFilter (req, file, cb) {
    const imageAllTypes = /jpeg|jpg|png|webp/;
    const mimeType = imageAllTypes.test(file.mimetype);
    const extName = imageAllTypes.test(path.extname(file.originalname).toLowerCase());

    if(mimeType && extName){
        cb(null, true);
    }
    else{
        cb(new Error("Unsupported Image Types"));
    }
};