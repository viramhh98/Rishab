import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}