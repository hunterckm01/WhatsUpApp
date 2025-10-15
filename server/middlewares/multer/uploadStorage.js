import path from "path";
import multer from "multer";

export default async function storageConfig(){
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '/tmp/uploads'),
    filename: (req, file, cb) => {
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random()*1e9)}`;
      cb(null, `${uniqueFileName}${path.extname(file.originalname)}`);
    },
  });

  return storage;
}