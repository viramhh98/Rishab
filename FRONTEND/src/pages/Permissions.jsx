import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { permissionService } from "../services/permission.services";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { handleApiError, handleSuccess } from "../lib/error-handler";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
const navigate = useNavigate();
  const [selectedPermission, setSelectedPermission] = useState(null);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const fetchPermissions = async () => {
    try {
      setLoading(true);

      const data = await permissionService.getAll();

      setPermissions(data || []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const filteredPermissions = useMemo(() => {
    return permissions.filter((permission) =>
      permission.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [permissions, search]);

  const resetForm = () => {
    setCategory("");
    setType("");
    setSelectedPermission(null);
  };

  const handleCreate = async () => {
    try {
      if (!category.trim()) {
        return handleApiError("Permission category is required");
      }

      if (!type.trim()) {
        return handleApiError("Permission type is required");
      }

      setSaving(true);

      await permissionService.create({
        name: `${category.trim()}:${type.trim()}`,
      });

      handleSuccess("Permission created successfully");

      setCreateOpen(false);

      resetForm();

      await fetchPermissions();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const openEditDialog = (permission) => {
    const [permissionCategory, permissionType] = permission.name.split(":");

    setSelectedPermission(permission);
    setCategory(permissionCategory || "");
    setType(permissionType || "");
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      if (!category.trim()) {
        return handleApiError("Permission category is required");
      }

      if (!type.trim()) {
        return handleApiError("Permission type is required");
      }

      setSaving(true);

      await permissionService.update(selectedPermission.id, {
        name: `${category.trim()}:${type.trim()}`,
      });

      handleSuccess("Permission updated successfully");

      setEditOpen(false);

      resetForm();

      await fetchPermissions();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await permissionService.delete(selectedPermission.id);

      handleSuccess("Permission deleted successfully");

      setDeleteOpen(false);

      setSelectedPermission(null);

      await fetchPermissions();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDeleting(false);
    }
  };

  return (<div className="space-y-6">
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
          Permissions Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          {permissions.length} permissions configured across the system.
        </p>
      </div>
    </div>
  </section>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search permissions..."
                className="pl-9"
              />
            </div>

            <Button disabled={saving} onClick={() => setCreateOpen(true)}>
              {" "}
              <Plus className="mr-2 h-4 w-4" />
              Add Permission
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center p-10">
            <p className="text-muted-foreground">Loading permissions...</p>
          </CardContent>
        </Card>
      ) : filteredPermissions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-10">
            <p className="text-muted-foreground">No permissions found</p>

            <Button disabled={saving} onClick={() => setCreateOpen(true)}>
              {" "}
              <Plus className="mr-2 h-4 w-4" />
              Create Permission
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(
                filteredPermissions.reduce((acc, permission) => {
                  const [category, type] = permission.name.split(":");

                  if (!acc[category]) {
                    acc[category] = [];
                  }

                  acc[category].push({
                    ...permission,
                    type,
                  });

                  return acc;
                }, {}),
              ).map(([category, items]) => (
                <Card
                  key={category}
                  className="h-full transition-all hover:shadow-md"
                >
                  {" "}
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold capitalize">
                        {category}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {items.length} Permissions
                      </p>
                    </div>

                    <div className="space-y-2">
                      {items.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/40 transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {permission.type}
                          </span>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(permission)}
                            >
                              <Pencil className="mr-1 h-4 w-4" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedPermission(permission);

                                setDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Permission</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Permission Category
              </label>

              <Input
                placeholder="company"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Permission Type
              </label>

              <Input
                placeholder="create"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Preview</p>

              <p className="font-medium">
                {(category || "permission") + ":" + (type || "type")}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button disabled={saving} onClick={handleCreate}>
              {saving ? "Creating..." : "Create"}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >
        {" "}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Permission Category
              </label>

              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Permission Type
              </label>

              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Preview</p>

              <p className="font-medium">
                {category}:{type}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button disabled={saving} onClick={handleUpdate}>
              {saving ? "Updating..." : "Update"}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Permission?</AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              disabled={deleting}
              onClick={handleDelete}
            >
              {" "}
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
