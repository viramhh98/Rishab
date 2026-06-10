import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  Users,
  CreditCard,
  Truck,
} from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

const masterDataItems = [
  {
    title: "Departments",
    description:
      "Manage organizational departments used across employees and reporting.",
    icon: Building2,
    path: "/settings/master-data/departments",
  },
  {
    title: "Designations",
    description:
      "Manage employee designations and job titles.",
    icon: Briefcase,
    path: "/settings/master-data/designations",
  },
  {
    title: "Employment Types",
    description:
      "Manage full-time, part-time, contract and other employment categories.",
    icon: Users,
    path: "/settings/master-data/employment-types",
  },
  {
    title: "Payment Methods",
    description:
      "Manage payment methods used for employee advances and payroll.",
    icon: CreditCard,
    path: "/settings/master-data/payment-methods",
  },
  {
    title: "Vehicles",
    description:
      "Manage fleet vehicles, registrations and operational details.",
    icon: Truck,
    path: "/settings/master-data/vehicles",
  },
];

export default function MasterData() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              navigate("/settings")
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Master Data
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage foundational system data
              used throughout HRMS and Fleet
              Management modules.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {masterDataItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              onClick={() =>
                navigate(item.path)
              }
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Icon className="h-10 w-10 text-primary" />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}