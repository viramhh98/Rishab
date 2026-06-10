// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination: async (
//     req,
//     file,
//     cb
//   ) => {
//     try {
//       const {
//         employeeId,
//       } = req.body;

//       const uploadPath =
//         `../STROAGE_BACKUP/UPLOADS/EMPLOYEE_DOCUMENTS/${employeeId}`;

//       fs.mkdirSync(
//         uploadPath,
//         {
//           recursive: true,
//         }
//       );

//       cb(
//         null,
//         uploadPath
//       );
//     } catch (error) {
//       cb(error);
//     }
//   },

//   filename: (
//     req,
//     file,
//     cb
//   ) => {
//     cb(
//       null,
//       `${Date.now()}-${file.originalname}`
//     );
//   },
// });


import path from "path";
import fs from "fs";
import multer from "multer";
import prisma from "../lib/prisma.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { employeeId } = req.body;

      const employee = await prisma.employee.findUnique({
        where: {
          id: Number(employeeId),
        },

        select: {
          employeeCode: true,
        },
      });

      if (!employee) {
        return cb(new Error("Employee not found"));
      }

      const uploadPath = path.join(
        "../STROAGE_BACKUP/UPLOADS",
        "EMPLOYEE",
        employee.employeeCode,
      );

      fs.mkdirSync(uploadPath, {
        recursive: true,
      });

      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(
      null,
      true
    );
  } else {
    cb(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed"
      )
    );
  }
};

export const employeeDocumentUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});