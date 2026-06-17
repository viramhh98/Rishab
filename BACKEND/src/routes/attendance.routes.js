import express from "express";

import {
  getAttendanceMasterData,
  getBulkAttendanceData,
  saveBulkAttendance,

  getAttendances,
  getAttendanceById,
  getEmployeeAttendance,
  getEmployeeMonthlyAttendance,
  getEmployeeAttendanceSummary,

  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

// MASTER DATA
router.get(
  "/master-data",
  authMiddleware,
  hasPermission("attendance:read"),
  getAttendanceMasterData
);

// BULK DATA
router.get(
  "/bulk-data",
  authMiddleware,
  hasPermission("attendance:read"),
  getBulkAttendanceData
);

// BULK SAVE (CREATE + UPDATE)
router.post(
  "/bulk-save",
  authMiddleware,
  hasPermission("attendance:create"),
  saveBulkAttendance
);

// LIST
router.get(
  "/",
  authMiddleware,
  hasPermission("attendance:read"),
  getAttendances
);

// EMPLOYEE ATTENDANCE
router.get(
  "/employee/:employeeId",
  authMiddleware,
  hasPermission("attendance:read"),
  getEmployeeAttendance
);

// MONTHLY
router.get(
  "/monthly/:employeeId",
  authMiddleware,
  hasPermission("attendance:read"),
  getEmployeeMonthlyAttendance
);

// SUMMARY
router.get(
  "/summary/:employeeId",
  authMiddleware,
  hasPermission("attendance:read"),
  getEmployeeAttendanceSummary
);

// BY ID
router.get(
  "/:id",
  authMiddleware,
  hasPermission("attendance:read"),
  getAttendanceById
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  hasPermission("attendance:update"),
  updateAttendance
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  hasPermission("attendance:delete"),
  deleteAttendance
);

export default router;