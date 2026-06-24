
import express from "express";

import {
  createEmployeeAdvance,
  getEmployeeAdvances,
  getEmployeeAdvanceById,
  updateEmployeeAdvance,
  deleteEmployeeAdvance,
  getEmployeeAdvanceMasterData,
} from "../controllers/employeeAdvance.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

router.get(
  "/master-data",
  authMiddleware,
  hasPermission("employee_advance:read"),
  getEmployeeAdvanceMasterData,
);

router.post(
  "/",
  authMiddleware,
  hasPermission("employee_advance:create"),
  createEmployeeAdvance,
);

router.get(
  "/",
  authMiddleware,
  hasPermission("employee_advance:read"),
  getEmployeeAdvances,
);

router.get(
  "/:id",
  authMiddleware,
  hasPermission("employee_advance:read"),
  getEmployeeAdvanceById,
);

router.put(
  "/:id",
  authMiddleware,
  hasPermission("employee_advance:update"),
  updateEmployeeAdvance,
);

router.delete(
  "/:id",
  authMiddleware,
  hasPermission("employee_advance:delete"),
  deleteEmployeeAdvance,
);

export default router;

