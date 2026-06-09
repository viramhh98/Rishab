// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { UPLOAD_PATH } from "../config/config.env.js";

// // Create folder if not exists
// const uploadPath = `${UPLOAD_PATH}COMPANY`;

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, {
//     recursive: true
//   });
// }


// // Storage config
// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {

//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1E9) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   }

// });


// // File filter
// // const fileFilter = (req, file, cb) => {

// //   const allowedTypes = [
// //     "image/png",
// //     "image/jpeg",
// //     "image/jpg",
// //     "image/webp"
// //   ];

// //   if (allowedTypes.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {

// //     cb(
// //       new Error(
// //         "Only PNG, JPG, JPEG, WEBP allowed"
// //       ),
// //       false
// //     );

// //   }
// // };

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/png",
//     "image/jpeg",
//     "image/jpg",
//     "image/webp",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     return cb(null, true);
//   }

//   return cb(
//     new multer.MulterError(
//       "LIMIT_UNEXPECTED_FILE",
//       "logo"
//     )
//   );
// };

// // Multer upload instance
// export const upload = multer({

//   storage,

//   fileFilter,

//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB
//   }

// });


import multer from "multer";
import path from "path";
import fs from "fs";
import { UPLOAD_PATH } from "../config/config.env.js";

// Create folder if not exists
const uploadPath = path.join(
  UPLOAD_PATH,
  "COMPANY"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

// File filter
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
        "Invalid file type. Only PNG, JPG, JPEG and WEBP images are allowed."
      )
    );
  }

  cb(null, true);
};

// Multer upload instance
export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Upload error handler
export const handleUploadError = (
  err,
  req,
  res,
  next
) => {
  if (!err) {
    return next();
  }

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message:
            "File size cannot exceed 5 MB.",
        });

      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          success: false,
          message:
            "Unexpected file upload field.",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  return res.status(400).json({
    success: false,
    message:
      err.message ||
      "File upload failed.",
  });
};