import express from "express";

import {
  createEmploymentType,
  getEmploymentTypes,
  getEmploymentTypeById,
  updateEmploymentType,
  deleteEmploymentType,
} from "../controllers/employmentType.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  hasPermission("employment-type:create"),
  createEmploymentType,
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  hasPermission("employment-type:read"),
  getEmploymentTypes,
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("employment-type:read"),
  getEmploymentTypeById,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("employment-type:update"),
  updateEmploymentType,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("employment-type:delete"),
  deleteEmploymentType,
);

export default router;
