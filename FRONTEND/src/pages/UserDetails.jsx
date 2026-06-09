import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  User,
} from "lucide-react";

import { userService } from "../services/user.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

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

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="text-right font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

export default function UserDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const fetchUser =
    async () => {
      try {
        setLoading(true);

        const data =
          await userService.getById(
            id
          );

        setUser(data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleDelete =
    async () => {
      try {
        setDeleting(true);

        await userService.delete(
          id
        );

        handleSuccess(
          "User deleted successfully"
        );

        navigate(
          "/settings/users"
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setDeleting(false);
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

  if (!user) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          User not found
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
                "/settings/users"
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              User Details
            </h1>

            <p className="mt-2 text-muted-foreground">
              View user information.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl border bg-muted">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-bold">
            {user.username}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            User Information
          </h2>

          <InfoRow
            label="Username"
            value={user.username}
          />

          <InfoRow
            label="Role"
            value={
              user.role?.name
            }
          />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={() =>
            navigate(
              `/settings/users/${id}/edit`
            )
          }
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit User
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            setDeleteOpen(true)
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </Button>
      </div>

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
              to delete this user?

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