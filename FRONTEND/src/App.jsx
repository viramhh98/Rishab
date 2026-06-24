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
import MasterData from "./pages/MasterData";
import Departments from "./pages/Departments";
import Designations from "./pages/Designations";
import EmploymentTypes from "./pages/EmploymentTypes";
import PaymentMethods from "./pages/PaymentMethods";
import Vehicles from "./pages/Vehicles";
import CreateVehicle from "./pages/CreateVehicle";
import EditVehicle from "./pages/EditVehicle";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployees";
import ViewEmployee from "./pages/ViewEmployee";
import EmployeeDocuments from "./pages/EmployeeDocuments";
import BulkAttendance from "./pages/BulkAttendance";
import SalaryRevisionListPage from "./pages/SalaryRevisionListPage";
import SalaryRevisionCreatePage from "./pages/SalaryRevisionCreatePage";
import SalaryRevisionDetailPage from "./pages/SalaryRevisionDetailPage";

import EmployeeAdvanceListPage from "./pages/EmployeeAdvanceListPage";
import EmployeeAdvanceCreatePage from "./pages/EmployeeAdvanceCreatePage";
import EmployeeAdvanceDetailPage from "./pages/EmployeeAdvanceForm";
import EmployeeAdvanceEditPage from "./pages/EmployeeAdvanceEditPage"
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

        <Route
          path="/settings/master-data"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MasterData />} />
        </Route>

        <Route
          path="/settings/master-data/departments"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Departments />} />
        </Route>

        <Route
          path="/settings/master-data/designations"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Designations />} />
        </Route>

        <Route
          path="/settings/master-data/employment-types"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmploymentTypes />} />
        </Route>

        <Route
          path="/settings/master-data/payment-methods"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PaymentMethods />} />
        </Route>

        <Route
          path="/settings/master-data/vehicles"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Vehicles />} />
        </Route>

        <Route
          path="/settings/master-data/vehicles/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateVehicle />} />
        </Route>
        <Route
          path="/settings/master-data/vehicles/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EditVehicle />} />
        </Route>

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Employees />} />
        </Route>
        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateEmployee />} />
        </Route>
        <Route
          path="/employees/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EditEmployee />} />
        </Route>
        <Route
          path="/employees/:id/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ViewEmployee />} />
        </Route>
        <Route
          path="/employees/:id/documents"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDocuments />} />
        </Route>

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BulkAttendance />} />
        </Route>

        <Route
          path="/salary-revision/:employeeId"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SalaryRevisionListPage />} />
        </Route>

        <Route
          path="/salary-revision/create/:employeeId"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SalaryRevisionCreatePage />} />
        </Route>

        <Route
          path="/salary-revision/detail/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SalaryRevisionDetailPage />} />
        </Route>

        <Route
          path="/employee-advances"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeAdvanceListPage />} />
        </Route>


          <Route
          path="/employee-advances/create"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeAdvanceCreatePage />} />
        </Route>


          <Route
          path="/employee-advances/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeAdvanceEditPage />} />
        </Route>


          <Route
          path="/employee-advances/:id"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeAdvanceDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
