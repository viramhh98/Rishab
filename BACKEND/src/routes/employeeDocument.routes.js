import express from "express";
import multer from "multer";

import {
  uploadEmployeeDocument,
  getEmployeeDocuments,
  deleteEmployeeDocument,
} from "../controllers/employeeDocument.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

import {
  employeeDocumentUpload,
} from "../middleware/employeeDocumentUpload.middleware.js";

const router =
  express.Router();

router.post(
  "/upload",
  authMiddleware,
  hasPermission(
    "employee:update"
  ),
  (
    req,
    res,
    next
  ) => {
    employeeDocumentUpload.single(
      "file"
    )(
      req,
      res,
      (
        err
      ) => {
        if (
          err instanceof
            multer.MulterError &&
          err.code ===
            "LIMIT_FILE_SIZE"
        ) {
          return res
            .status(400)
            .json({
              success:
                false,
              message:
                "File size cannot exceed 10 MB",
            });
        }

        if (
          err
        ) {
          return res
            .status(400)
            .json({
              success:
                false,
              message:
                err.message,
            });
        }

        next();
      }
    );
  },
  uploadEmployeeDocument
);

router.get(
  "/:employeeId",
  authMiddleware,
  hasPermission(
    "employee:read"
  ),
  getEmployeeDocuments
);

router.delete(
  "/:id",
  authMiddleware,
  hasPermission(
    "employee:update"
  ),
  deleteEmployeeDocument
);

export default router;