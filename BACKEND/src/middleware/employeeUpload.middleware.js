import multer from "multer";
import path from "path";
import fs from "fs";
import { UPLOAD_PATH } from "../config/config.env.js";

const tempPath = path.join(
  process.cwd(),
  UPLOAD_PATH,
  "TEMP"
);

if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}-${file.fieldname}${path.extname(
        file.originalname
      )}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only PNG, JPG, JPEG and WEBP images are allowed."
      )
    );
  }

  cb(null, true);
};

export const employeeUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});