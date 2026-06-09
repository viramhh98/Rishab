import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { userService } from "../services/user.services";
import { roleService } from "../services/role.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [roles, setRoles] =
    useState([]);

  const [form, setForm] =
    useState({
      username: "",
      password: "",
      roleId: "",
    });

  const fetchData =
    async () => {
      try {
        setLoading(true);

        const [
          user,
          roleData,
        ] = await Promise.all([
          userService.getById(id),
          roleService.getAll(),
        ]);

        setRoles(roleData);

        setForm({
          username:
            user.username || "",
          password: "",
          roleId: String(
            user.role?.id || ""
          ),
        });
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit =
    async () => {
      try {
        if (
          !form.username.trim()
        ) {
          return handleApiError({
            message:
              "Username is required",
          });
        }

        if (!form.roleId) {
          return handleApiError({
            message:
              "Role is required",
          });
        }

        setSaving(true);

        const payload = {
          username:
            form.username,
          roleId: Number(
            form.roleId
          ),
        };

        if (
          form.password.trim()
        ) {
          payload.password =
            form.password;
        }

        await userService.update(
          id,
          payload
        );

        handleSuccess(
          "User updated successfully"
        );

        navigate(
          `/settings/users/${id}`
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          Loading user...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              navigate(
                `/settings/users/${id}`
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Edit User
            </h1>

            <p className="mt-2 text-muted-foreground">
              Update user details.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div>
            <Label>
              Username *
            </Label>

            <Input
              value={
                form.username
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  username:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              New Password
            </Label>

            <Input
              type="password"
              placeholder="Leave empty to keep current password"
              value={
                form.password
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Role *
            </Label>

            <Select
              value={
                form.roleId
              }
              onValueChange={(
                value
              ) =>
                setForm({
                  ...form,
                  roleId: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {roles.map(
                  (role) => (
                    <SelectItem
                      key={
                        role.id
                      }
                      value={String(
                        role.id
                      )}
                    >
                      {role.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              `/settings/users/${id}`
            )
          }
        >
          Cancel
        </Button>

        <Button
          disabled={saving}
          onClick={
            handleSubmit
          }
        >
          {saving
            ? "Updating..."
            : "Update User"}
        </Button>
      </div>
    </div>
  );
}