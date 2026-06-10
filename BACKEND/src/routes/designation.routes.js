import express from "express";

import {
  createDesignation,
  getDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../controllers/designation.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  hasPermission("designation:create"),
  createDesignation,
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  hasPermission("designation:read"),
  getDesignations,
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("designation:read"),
  getDesignationById,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("designation:update"),
  updateDesignation,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("designation:delete"),
  deleteDesignation,
);

export default router;
