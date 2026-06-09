import express from "express";

import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
  updateRolePermissions
} from "../controllers/role.controller.js";
import { getPermissions } from "../controllers/permission.controller.js";
import { authMiddleware }
from "../middleware/auth.middleware.js";

import { hasPermission }
from "../middleware/permission.middleware.js";

const router = express.Router();


// CREATE ROLE
router.post(
  "/",
  authMiddleware,
  hasPermission("role:create"),
  createRole
);

router.get(
  "/get-all-permissions",
  authMiddleware,
  hasPermission("role:create"),
  getPermissions
);


// GET ALL ROLES
router.get(
  "/",
  authMiddleware,
  hasPermission("role:read"),
  getRoles
);


// GET ROLE BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("role:read"),
  getRoleById
);


// UPDATE ROLE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("role:update"),
  updateRole
);


// DELETE ROLE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("role:delete"),
  deleteRole
);


// ASSIGN PERMISSIONS
router.post(
  "/assign-permissions",
  authMiddleware,
  hasPermission("role:assign-permission"),
  assignPermissions
);


//update Assigned Permissions
router.put(
  "/:id/update-permissions",
  authMiddleware,
  hasPermission("role:update-assigned-permission"),
  updateRolePermissions
);



export default router;