import { Bell, Search } from "lucide-react";
import { Input } from "../ui/input";
import ThemeToggle from "./themetoggle";
export default function Navbar() {
  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Search size={18} />
        <Input
          placeholder="Search employees..."
          className="w-80"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Bell size={20} />
        <div className="h-9 w-9 rounded-full bg-primary" />
      </div>
    </header>
  );
}
