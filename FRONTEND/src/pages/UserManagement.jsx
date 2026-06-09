import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import { userService } from "../services/user.services";
import { roleService } from "../services/role.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] =
    useState([]);

  const [roles, setRoles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const fetchData =
    async () => {
      try {
        setLoading(true);

        const [
          userData,
          roleData,
        ] = await Promise.all([
          userService.getAll(),
          roleService.getAll(),
        ]);

        setUsers(userData);
        setRoles(roleData);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete =
    async () => {
      try {
        if (!selectedUser) return;

        setDeleting(true);

        await userService.delete(
          selectedUser.id
        );

        handleSuccess(
          "User deleted successfully"
        );

        setDeleteOpen(false);

        fetchData();
      } catch (error) {
        handleApiError(error);
      } finally {
        setDeleting(false);
      }
    };

  const filteredUsers =
    users.filter((user) => {
      const matchesSearch =
        user.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRole =
        roleFilter === "all"
          ? true
          : String(
              user.role?.id
            ) === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );
    });

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
              User Management
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage system users and
              role assignments.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search username..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="pl-9"
            />
          </div>

          <Select
            value={roleFilter}
            onValueChange={
              setRoleFilter
            }
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Roles
              </SelectItem>

              {roles.map((role) => (
                <SelectItem
                  key={role.id}
                  value={String(
                    role.id
                  )}
                >
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() =>
            navigate(
              "/settings/users/create"
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 text-center">
              Loading users...
            </div>
          ) : filteredUsers.length ===
            0 ? (
            <div className="flex flex-col items-center gap-4 p-10">
              <p className="text-muted-foreground">
                No users found
              </p>

              <Button
                onClick={() =>
                  navigate(
                    "/settings/users/create"
                  )
                }
              >
                Create User
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Username
                  </TableHead>

                  <TableHead>
                    Role
                  </TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map(
                  (user) => (
                    <TableRow
                      key={user.id}
                    >
                      <TableCell className="font-medium">
                        {
                          user.username
                        }
                      </TableCell>

                      <TableCell>
                        {user.role
                          ?.name ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/settings/users/${user.id}/edit`
                              )
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedUser(
                                user
                              );

                              setDeleteOpen(
                                true
                              );
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete User
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want
              to delete user{" "}
              <strong>
                {
                  selectedUser?.username
                }
              </strong>
              ?

              <br />
              <br />

              This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleting}
              onClick={
                handleDelete
              }
            >
              {deleting
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}