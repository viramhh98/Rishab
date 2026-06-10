import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  hasPermission("department:create"),
  createDepartment,
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  hasPermission("department:read"),
  getDepartments,
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("department:read"),
  getDepartmentById,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("department:update"),
  updateDepartment,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("department:delete"),
  deleteDepartment,
);

export default router;
