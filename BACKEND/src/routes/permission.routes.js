import express from "express";

import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
  createBulkPermission
} from "../controllers/permission.controller.js";

import {authMiddleware} from "../middleware/auth.middleware.js";
import {hasPermission} from "../middleware/permission.middleware.js";

const router = express.Router();


// CREATE
router.post(
  "/",
  authMiddleware,
  hasPermission("permission:create"),
  createPermission
);

router.post(
  "/bulk",
  authMiddleware,
  hasPermission("permission:create"),
  createBulkPermission
);

// READ ALL
router.get(
  "/",
  authMiddleware,
  hasPermission("permission:read"),
  getPermissions
);


// READ ONE
router.get(
  "/:id",
  authMiddleware,
  hasPermission("permission:read"),
  getPermissionById
);


// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("permission:update"),
  updatePermission
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("permission:delete"),
  deletePermission
);

export default router;