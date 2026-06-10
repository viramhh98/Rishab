import express from "express";
import multer from "multer";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeMasterData,
} from "../controllers/employee.controller.js";

import { employeeUpload } from "../middleware/employeeUpload.middleware.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get(
  "/master-data",
  authMiddleware,
  hasPermission("employee:read"),
  getEmployeeMasterData,
);

router.post(
  "/",
  authMiddleware,
  hasPermission("employee:create"),
  (req, res, next) => {
    employeeUpload.single("profilePhoto")(req, res, (err) => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_FILE_SIZE"
        ) {
          return res.status(400).json({
            success: false,
            message: "File size cannot exceed 5 MB",
          });
        }

        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  createEmployee,
);

router.get("/", authMiddleware, hasPermission("employee:read"), getEmployees);

router.get(
  "/:id",
  authMiddleware,
  hasPermission("employee:read"),
  getEmployeeById,
);


router.put(
  "/:id",
  authMiddleware,
  hasPermission("employee:update"),
  (req, res, next) => {
    employeeUpload.single("profilePhoto")(
      req,
      res,
      (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        next();
      }
    );
  },
  updateEmployee
);



router.delete(
  "/:id",
  authMiddleware,
  hasPermission("employee:delete"),
  deleteEmployee,
);

export default router;
