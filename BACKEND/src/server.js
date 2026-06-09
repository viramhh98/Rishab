import express from "express";
import cors from "cors";
import {PORT,UPLOAD_PATH} from "./config/config.env.js";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
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


app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), UPLOAD_PATH)
  )
);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
