import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { roleService } from "../services/role.services";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { Card, CardContent } from "../components/ui/card";

import { Checkbox } from "../components/ui/checkbox";

export default function CreateRole() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");

  const [allPermissions, setAllPermissions] = useState([]);

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const fetchPermissions = async () => {
    try {
      setLoading(true);

      const data = await roleService.getAllPermissions();

      setAllPermissions(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }

      return [...prev, permissionId];
    });
  };

  const handleCreateRole = async () => {
    try {
      setError("");

      if (!roleName.trim()) {
        setError("Role name is required");
        return;
      }

      setSaving(true);

      const role = await roleService.create({
        name: roleName.trim(),
      });

      if (selectedPermissions.length > 0) {
        await roleService.assignPermissions({
          roleId: role.id,
          permissionIds: selectedPermissions,
        });
      }

      handleSuccess("Role created successfully");

      navigate(`/settings/roles/${role.id}`);
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    const [category, type] = permission.name.split(":");

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push({
      ...permission,
      type,
    });

    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/settings/roles")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Create Role</h1>

            <p className="mt-2 text-muted-foreground">
              Create a new role and assign permissions.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Role Name</label>

            <Input
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => {
                setRoleName(e.target.value);

                if (error) {
                  setError("");
                }
              }}
            />

            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center p-10">
            <p className="text-muted-foreground">Loading permissions...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(groupedPermissions).map(([category, permissions]) => (
            <Card key={category} className="h-full">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold capitalize">
                    {category}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {permissions.length} Permissions
                  </p>
                </div>

                <div className="space-y-3">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <Checkbox
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />

                      <span className="text-sm font-medium">
                        {permission.type}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={saving || !roleName.trim()}
          onClick={handleCreateRole}
        >
          {saving ? "Creating..." : "Create Role"}
        </Button>
      </div>
    </div>
  );
}
