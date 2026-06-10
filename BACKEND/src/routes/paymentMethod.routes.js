import express from "express";

import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { hasPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  hasPermission("payment-method:create"),
  createPaymentMethod
);

router.get(
  "/",
  authMiddleware,
  hasPermission("payment-method:read"),
  getPaymentMethods
);

router.get(
  "/:id",
  authMiddleware,
  hasPermission("payment-method:read"),
  getPaymentMethodById
);

router.put(
  "/:id",
  authMiddleware,
  hasPermission("payment-method:update"),
  updatePaymentMethod
);

router.delete(
  "/:id",
  authMiddleware,
  hasPermission("payment-method:delete"),
  deletePaymentMethod
);

export default router;