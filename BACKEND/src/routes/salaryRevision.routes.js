import express from "express";

import {
  createSalaryRevision,
  getSalaryRevisionsByEmployee,
  getSalaryRevisionById,
} from "../controllers/salaryRevision.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  hasPermission("salary-revision:create"),
  createSalaryRevision,
);

router.get(
  "/:employeeId",
  authMiddleware,
  hasPermission("salary-revision:read"),
  getSalaryRevisionsByEmployee,
);

router.get(
  "/detail/:id",
  authMiddleware,
  hasPermission("salary-revision:read"),
  getSalaryRevisionById,
);

export default router;