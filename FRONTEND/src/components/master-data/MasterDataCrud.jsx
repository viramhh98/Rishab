import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ArrowLeft,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import {
  handleApiError,
  handleSuccess,
} from "../../lib/error-handler";

export default function MasterDataCrud({
  title,
  entityName,
  service,
  icon: Icon,
  countField,
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await service.getAll();
      setItems(data || []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const totalEmployees = useMemo(() => {
    if (!countField) return 0;

    return items.reduce(
      (sum, item) => sum + (item._count?.[countField] || 0),
      0
    );
  }, [items, countField]);

  const resetForm = () => {
    setName("");
    setSelectedItem(null);
  };

  const handleCreate = async () => {
    try {
      if (!name.trim()) {
        return handleApiError(`${entityName} name is required`);
      }

      setSaving(true);

      await service.create({
        name: name.trim(),
      });

      handleSuccess(`${entityName} created successfully`);

      setCreateOpen(false);
      resetForm();
      await fetchItems();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!name.trim()) {
        return handleApiError(`${entityName} name is required`);
      }

      setSaving(true);

      await service.update(selectedItem.id, {
        name: name.trim(),
      });

      handleSuccess(`${entityName} updated successfully`);

      setEditOpen(false);
      resetForm();
      await fetchItems();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await service.delete(selectedItem.id);

      handleSuccess(`${entityName} deleted successfully`);

      setDeleteOpen(false);
      setSelectedItem(null);

      await fetchItems();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/settings/master-data")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-muted-foreground">
              Manage {title.toLowerCase()} used across the system.
            </p>
          </div>
        </div>
      </section>

      <div className={`grid gap-4 ${countField ? "md:grid-cols-2" : ""}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total {title}</p>
                <h2 className="mt-2 text-4xl font-bold">{items.length}</h2>
              </div>

              <div className="rounded-2xl border p-4">
                <Icon className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {countField && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Employees
                  </p>
                  <h2 className="mt-2 text-4xl font-bold">
                    {totalEmployees}
                  </h2>
                </div>

                <div className="rounded-2xl border p-4">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
              />
            </div>

            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add {entityName}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="p-12 text-center">
            Loading...
          </CardContent>
        </Card>
      ) : filteredItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-12">
            <Icon className="h-14 w-14 text-muted-foreground" />
            <h3 className="text-xl font-semibold">
              No {title} Found
            </h3>
            <Button onClick={() => setCreateOpen(true)}>
              Create {entityName}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="transition-all hover:shadow-md hover:border-primary"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {entityName}
                    </p>
                  </div>

                  <Icon className="h-5 w-5" />
                </div>

                {countField && (
                  <div className="mt-4 rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">
                      Employees
                    </p>
                    <p className="text-2xl font-bold">
                      {item._count?.[countField] || 0}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedItem(item);
                      setName(item.name);
                      setEditOpen(true);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create {entityName}</DialogTitle>
          </DialogHeader>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${entityName} Name`}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>

            <Button disabled={saving} onClick={handleCreate}>
              {saving ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {entityName}</DialogTitle>
          </DialogHeader>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>

            <Button disabled={saving} onClick={handleUpdate}>
              {saving ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {entityName}?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
