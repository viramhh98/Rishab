import { useNavigate } from "react-router-dom";

import {
  Shield,
  Users,
  Building2,
  UserCog,
  Database,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "../components/ui/card";

const settingsItems = [
  {
    title: "Permission Management",
    description:
      "Manage system permissions and access controls.",
    icon: Shield,
    path: "/settings/permissions",
  },
  {
    title: "Role Management",
    description:
      "Manage roles and assign permissions.",
    icon: UserCog,
    path: "/settings/roles",
  },
  {
    title: "User Management",
    description:
      "Manage application users.",
    icon: Users,
    path: "/settings/users",
  },
  {
    title: "Company Management",
    description:
      "Manage company records.",
    icon: Building2,
    path: "/settings/companies",
  },
  {
    title: "Master Data",
    description:
      "Manage departments, designations, employment types, payment methods and other system master records.",
    icon: Database,
    path: "/settings/master-data",
  },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Configure system settings and
          administration modules.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {settingsItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
              onClick={() =>
                navigate(item.path)
              }
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
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}