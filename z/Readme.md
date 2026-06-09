# HRMS + Fleet Management System - Detailed MCP (Model Context Protocol)

## Project Overview

This project is an offline-first HRMS + Fleet Management desktop application for a Tour & Travel company.

Primary goals:

* Employee Management
* Driver Management
* Vehicle Management
* Attendance Tracking
* Payroll System
* Role & Permission Management (RBAC)
* Offline Desktop Capability
* Scalable Architecture
* Modern UI/UX
* Future-ready modular backend

Technology philosophy:

* Start simple
* Build scalable architecture
* Avoid overengineering
* Keep deployment easy
* Maintain professional code structure

---

# FINAL TECH STACK

## Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Radix UI
* React Router DOM
* Axios
* Context API

## Backend

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT Authentication
* bcryptjs

## Database

* SQLite (offline-first)

## Future Desktop Packaging

* Tauri

---

# WHY SQLITE

SQLite chosen because:

* Offline support
* No database server required
* Easy deployment
* Single-file database
* Excellent for desktop apps
* Easy backups
* Lightweight
* Fast local performance

Database file:

```text
dev.db
```

SQLite is sufficient for:

* 500+ employees
* Attendance history
* Payroll records
* Driver logs
* Vehicle data

Future migration path:
SQLite → PostgreSQL possible via Prisma ORM.

---

# BACKEND ARCHITECTURE

## Folder Structure

```text
BACKEND/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── role.controller.js
│   │   ├── permission.controller.js
│   │   └── employee.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── role.routes.js
│   │   ├── permission.routes.js
│   │   └── employee.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── permission.middleware.js
│   │
│   ├── lib/
│   │   └── prisma.js
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js
```

---

# DATABASE ARCHITECTURE

## Authentication System

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String

  roleId    Int
  role      Role     @relation(fields: [roleId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Purpose:

* Stores login credentials
* Links users to roles
* Controls access

---

## Role-Based Access Control (RBAC)

### Role Model

```prisma
model Role {
  id          Int              @id @default(autoincrement())
  name        String           @unique

  users       User[]
  permissions RolePermission[]

  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}
```

Example Roles:

* SUPER_ADMIN
* ADMIN
* HR
* MANAGER
* ACCOUNTANT

---

### Permission Model

```prisma
model Permission {
  id    Int              @id @default(autoincrement())
  name  String           @unique

  roles RolePermission[]
}
```

Example Permissions:

* employee:create
* employee:view
* employee:edit
* employee:delete
* payroll:manage
* attendance:manage
* vehicle:manage

---

### RolePermission Model

```prisma
model RolePermission {
  id           Int        @id @default(autoincrement())

  roleId       Int
  permissionId Int

  role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@unique([roleId, permissionId])
}
```

Purpose:

* Bridge table
* Many-to-many relation
* Connects roles to permissions

---

# RBAC FLOW

```text
User
 ↓
Role
 ↓
RolePermission
 ↓
Permission
```

Example:

```text
ADMIN
 ├── employee:create
 ├── employee:edit
 ├── payroll:manage
 └── attendance:manage
```

---

# AUTH FLOW

## Login Process

```text
User enters username/password
        ↓
Backend validates credentials
        ↓
Fetch user role + permissions
        ↓
Generate JWT token
        ↓
Frontend stores token
        ↓
User redirected to dashboard
```

---

# JWT AUTHENTICATION

## Middleware

Purpose:

* Protect routes
* Validate tokens
* Attach logged-in user to request

Example protected route:

```js
router.post(
  "/employees",
  authMiddleware,
  hasPermission("employee:create"),
  createEmployee
);
```

---

# PERMISSION MIDDLEWARE FLOW

```text
Request
 ↓
Validate JWT
 ↓
Fetch User
 ↓
Fetch Role
 ↓
Fetch Permissions
 ↓
Check permission exists
 ↓
Allow or deny request
```

---

# FRONTEND ARCHITECTURE

## Folder Structure

```text
FRONTEND/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── tables/
│   │   ├── sidebar/
│   │   ├── navbar/
│   │   ├── cards/
│   │   └── modals/
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardPage.jsx
│   │   │
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── users/
│   │   ├── employees/
│   │   ├── attendance/
│   │   ├── payroll/
│   │   ├── vehicles/
│   │   └── drivers/
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── role.service.js
│   │   └── employee.service.js
│   │
│   ├── lib/
│   │   └── axios.js
│   │
│   ├── hooks/
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

# FRONTEND UI STACK

## shadcn/ui

Chosen because:

* Editable source code
* Tailwind-based
* Modern SaaS styling
* Excellent admin dashboards
* Built on Radix UI

## Selected Configuration

```text
Style: New York
Preset: Nova - Lucide / Geist
Base Color: Slate
Component Library: Radix UI
```

---

# FRONTEND ROUTING

## React Router Structure

```text
/login
/dashboard
/roles
/permissions
/users
/employees
/attendance
/payroll
/vehicles
/drivers
```

---

# AUTH CONTEXT FLOW

```text
Login
 ↓
Store token in localStorage
 ↓
Store user in Context API
 ↓
Access protected routes
 ↓
Render permission-based UI
```

---

# AXIOS INSTANCE

Purpose:

* Centralized API handling
* Auto-attach JWT token
* Shared backend communication

Flow:

```text
Frontend Request
 ↓
Axios Instance
 ↓
Attach Authorization Header
 ↓
Send Request
```

---

# PERMISSION-BASED UI RENDERING

Example:

```js
if (permissions.includes("employee:view")) {
  showEmployeeMenu();
}
```

Purpose:

* Hide unauthorized UI
* Cleaner UX
* Better security

---

# FUTURE MODULES

## Employee Module

Features:

* Employee profiles
* Department assignment
* Salary structure
* PF/ESIC
* Documents
* Shift assignment

---

## Attendance Module

Features:

* Daily attendance
* Driver attendance
* Shift timing
* Late entries
* Overtime

---

## Payroll Module

Features:

* Salary generation
* Wage rate calculation
* PF deduction
* ESIC deduction
* Salary slips

---

## Fleet Management

Features:

* Vehicle records
* Driver assignment
* Trip tracking
* Fuel logs
* Maintenance tracking

---

# FUTURE AUDIT LOG SYSTEM

Planned later.

Purpose:

* Track user activity
* Maintain action history
* Security auditing

Example logs:

* LOGIN
* CREATE_EMPLOYEE
* UPDATE_PAYROLL
* DELETE_VEHICLE

Not implemented yet because:

* MVP priority is core functionality first.

---

# DEVELOPMENT PHILOSOPHY

Important decisions made:

* Avoid premature optimization
* Avoid overengineering
* Build scalable structure early
* Keep MVP focused
* Use professional architecture
* Maintain clean folder structure

---

# CURRENT DEVELOPMENT STAGE

Completed:

* SQLite setup
* Prisma setup
* RBAC schema
* Auth architecture
* Middleware architecture
* Frontend foundation
* Tailwind setup
* shadcn setup
* Routing setup
* Auth context setup

Current focus:

* Login flow
* Protected routes
* Dashboard UI
* Role management pages
* Employee module

---

# IMPORTANT ENGINEERING DECISIONS

## Why RBAC?

Needed for:

* HR permissions
* Payroll restrictions
* Manager access control
* Secure admin operations

---

## Why Prisma?

Benefits:

* Easy migrations
* Type-safe queries
* Easier DB switching
* Cleaner backend code

---

## Why shadcn instead of UI libraries?

Benefits:

* Full control
* Editable components
* No vendor lock-in
* Better customization

---

# FUTURE SCALABILITY

Future migration path:

* SQLite → PostgreSQL
* React → Tauri desktop executable
* Local-only → Hybrid sync architecture

Possible future:

* Multi-company support
* Cloud sync
* Mobile companion app
* Reporting analytics
* Notification system

---

# FINAL PROJECT VISION

Professional offline-first HRMS + Fleet Management desktop system with:

* modern UI
* scalable backend
* RBAC security
* modular architecture
* enterprise-grade structure
* easy deployment
* future scalability

Designed specifically for Tour & Travel company operations.
