import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Calendar,
  IndianRupee,
  Truck,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Employees",
    icon: Users,
    path: "/employees",
  },
  {
    name: "Attendance",
    icon: Calendar,
    path: "/attendance",
  },
  {
    name: "Payroll",
    icon: IndianRupee,
    path: "/payroll",
  },
  {
    name: "Fleet",
    icon: Truck,
    path: "/fleet",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">
          HRMS Pro
        </h1>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}