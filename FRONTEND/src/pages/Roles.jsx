import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus, ArrowLeft } from "lucide-react";

import { roleService } from "../services/role.services";

import { handleApiError } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

export default function Roles() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const data = await roleService.getAll();

      setRoles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Role Management</h1>

            <p className="mt-2 text-muted-foreground">
              Manage roles and assign permissions.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={() => navigate("/settings/roles/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center p-10">
              <p className="text-muted-foreground">Loading roles...</p>
            </CardContent>
          </Card>
        ) : roles.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-10">
              <p className="text-muted-foreground">No roles found</p>

              <Button onClick={() => navigate("/settings/roles/create")}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Role
              </Button>
            </CardContent>
          </Card>
        ) : (
          roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
              onClick={() => navigate(`/settings/roles/${role.id}`)}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold capitalize">
                  {role.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Click to manage permissions
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
