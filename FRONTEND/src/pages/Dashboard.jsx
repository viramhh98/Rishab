import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-2xl border p-8 bg-card">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage employees, attendance, payroll,
          and fleet operations from one place.
        </p>
      </section>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Employees
            </p>
            <h2 className="text-3xl font-bold">542</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Present Today
            </p>
            <h2 className="text-3xl font-bold">498</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Vehicles
            </p>
            <h2 className="text-3xl font-bold">85</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Monthly Payroll
            </p>
            <h2 className="text-3xl font-bold">₹18.5L</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}