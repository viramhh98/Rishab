import express from "express";
import cors from "cors";
import { PORT, UPLOAD_PATH } from "./config/config.env.js";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import designationRoutes from "./routes/designation.routes.js";
import employmentTypeRoutes from "./routes/employmentType.routes.js";
import paymentMethodRoutes from "./routes/paymentMethod.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import employeesRoutes from "./routes/employee.routes.js";
import employeeDocumentRoutes from "./routes/employeeDocument.routes.js";
import attendanceRoute from "./routes/attendance.routes.js";
import salaryRevisionRoutes from "./routes/salaryRevision.routes.js"
import path from "path";

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/permissions", permissionRoutes);
app.use("/companies", companyRoutes);
app.use("/department", departmentRoutes);
app.use("/designation", designationRoutes);
app.use("/employment-type", employmentTypeRoutes);
app.use("/payment-method", paymentMethodRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/employee", employeesRoutes);
app.use("/attendance",attendanceRoute)
app.use("/salary-revision",salaryRevisionRoutes)
app.use("/employee-document", employeeDocumentRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), UPLOAD_PATH)));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
