import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Permissions from "./pages/Permissions";
import Settings from "./pages/Setting";
import Roles from "./pages/Roles";
import RoleDetails from "./pages/RoleDetails";
import CreateRole from "./pages/CreateRole";
import CompanyManagement from "./pages/CompanyManagement";
import CreateCompany from "./pages/CreateCompany";
import CompanyDetails from "./pages/CompanyDetails";
import EditCompany from "./pages/EditCompany";
import UserManagement from "./pages/UserManagement";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Settings />} />
        </Route>

        <Route
          path="/settings/permissions"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Permissions />} />
        </Route>

        <Route
          path="/settings/roles/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateRole />} />
        </Route>
        <Route
          path="/settings/roles"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Roles />} />
        </Route>
        <Route
          path="/settings/roles/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RoleDetails />} />
        </Route>

        <Route
          path="/settings/companies"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyManagement />} />
        </Route>

        <Route
          path="/settings/companies/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateCompany />} />
        </Route>

        <Route
          path="/settings/companies/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDetails />} />
        </Route>

        <Route
          path="/settings/companies/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EditCompany />} />
        </Route>

        <Route
          path="/settings/users"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserManagement />} />
        </Route>

        <Route
          path="/settings/users/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateUser />} />
        </Route>

<Route
          path="/settings/users/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDetails />} />
        </Route>

        <Route
          path="/settings/users/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EditUser />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
