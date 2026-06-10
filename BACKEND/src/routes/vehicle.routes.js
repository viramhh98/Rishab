import express from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  hasPermission("vehicle:create"),
  createVehicle
);

router.get(
  "/",
  authMiddleware,
  hasPermission("vehicle:read"),
  getVehicles
);

router.get(
  "/:id",
  authMiddleware,
  hasPermission("vehicle:read"),
  getVehicleById
);

router.put(
  "/:id",
  authMiddleware,
  hasPermission("vehicle:update"),
  updateVehicle
);

router.delete(
  "/:id",
  authMiddleware,
  hasPermission("vehicle:delete"),
  deleteVehicle
);

export default router;