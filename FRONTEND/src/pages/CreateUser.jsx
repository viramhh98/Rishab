import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function CreateUser() {
  const navigate = useNavigate();

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

  const fetchRoles =
    async () => {
      try {
        const data =
          await roleService.getAll();

        setRoles(data);
      } catch (error) {
        handleApiError(error);
      }
    };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

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

        if (
          !form.password.trim()
        ) {
          return handleApiError({
            message:
              "Password is required",
          });
        }

        if (!form.roleId) {
          return handleApiError({
            message:
              "Role is required",
          });
        }

        setSaving(true);

        await userService.create({
          username:
            form.username,
          password:
            form.password,
          roleId: Number(
            form.roleId
          ),
        });

        handleSuccess(
          "User created successfully"
        );

        navigate(
          "/settings/users"
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setSaving(false);
      }
    };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              navigate(
                "/settings/users"
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Create User
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add a new user to the
              system.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            User Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                Username *
              </Label>

              <Input
                name="username"
                value={
                  form.username
                }
                onChange={
                  handleChange
                }
                placeholder="Enter username"
              />
            </div>

            <div>
              <Label>
                Password *
              </Label>

              <Input
                type="password"
                name="password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter password"
              />
            </div>
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
                setForm(
                  (
                    prev
                  ) => ({
                    ...prev,
                    roleId:
                      value,
                  })
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
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
              "/settings/users"
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
            ? "Creating..."
            : "Create User"}
        </Button>
      </div>
    </div>
  );
}