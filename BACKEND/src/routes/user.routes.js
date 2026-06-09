import express from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import { authMiddleware }
from "../middleware/auth.middleware.js";

import { hasPermission }
from "../middleware/permission.middleware.js";

const router = express.Router();


// CREATE USER
router.post(
  "/",
  authMiddleware,
  hasPermission("user:create"),
  createUser
);


// GET ALL USERS
router.get(
  "/",
  authMiddleware,
  hasPermission("user:read"),
  getUsers
);


// GET USER BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("user:read"),
  getUserById
);


// UPDATE USER
router.put(
  "/:id",
  authMiddleware,
  hasPermission("user:update"),
  updateUser
);


// DELETE USER
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("user:delete"),
  deleteUser
);

export default router;