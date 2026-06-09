import express from "express";
import multer from "multer";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { hasPermission } from "../middleware/permission.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  hasPermission("company:create"),
  (req, res, next) => {
  upload.single("logo")(req, res, (err) => {
    if (err) {
      if (
        err instanceof multer.MulterError &&
        err.code === "LIMIT_FILE_SIZE"
      ) {
        return res.status(400).json({
          success: false,
          message: "File size cannot exceed 5 MB.",
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
createCompany
);

// GET ALL
router.get("/", authMiddleware, hasPermission("company:read"), getCompanies);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("company:read"),
  getCompanyById
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("company:update"),
  (req, res, next) => {
  upload.single("logo")(req, res, (err) => {
    if (err) {
      if (
        err instanceof multer.MulterError &&
        err.code === "LIMIT_FILE_SIZE"
      ) {
        return res.status(400).json({
          success: false,
          message: "File size cannot exceed 5 MB.",
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
  updateCompany
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("company:delete"),
  deleteCompany
);

export default router;
