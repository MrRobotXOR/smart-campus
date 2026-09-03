import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "src/uploads",

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;