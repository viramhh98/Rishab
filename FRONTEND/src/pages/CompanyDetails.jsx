import { useEffect, useState } from "react";
import fileService from "../services/image.services";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

import { companyService } from "../services/company.services";

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

export default function CompanyDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [company, setCompany] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const fetchCompany =
    async () => {
      try {
        setLoading(true);

        const data =
          await companyService.getById(
            id
          );

        setCompany(data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const handleDelete =
    async () => {
      try {
        setDeleting(true);

        await companyService.delete(
          id
        );

        handleSuccess(
          "Company deleted successfully"
        );

        navigate(
          "/settings/companies"
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
          Loading company...
        </CardContent>
      </Card>
    );
  }

  if (!company) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          Company not found
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
                "/settings/companies"
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Company Details
            </h1>

            <p className="mt-2 text-muted-foreground">
              View company
              information and
              settings.
            </p>
          </div>
        </div>
      </section>

    <Card>
  <CardContent className="flex flex-col items-center gap-4 p-6">
    {company.logo ? (
      <img
        src={fileService.getFileUrl(company.logo)}
        alt={company.companyName}
        className="h-28 w-28 rounded-xl border object-cover"
      />
    ) : (
      <div className="flex h-28 w-28 items-center justify-center rounded-xl border bg-muted">
        <Building2 className="h-10 w-10 text-muted-foreground" />
      </div>
    )}

    <h2 className="text-xl font-bold">
      {company.companyName}
    </h2>
  </CardContent>
</Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            Basic Information
          </h2>

          <InfoRow
            label="Company Name"
            value={
              company.companyName
            }
          />

          <InfoRow
            label="Owner Name"
            value={
              company.ownerName
            }
          />

          <InfoRow
            label="Phone"
            value={company.phone}
          />

          <InfoRow
            label="Email"
            value={company.email}
          />

          <InfoRow
            label="Address"
            value={
              company.address
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            Tax Information
          </h2>

          <InfoRow
            label="GST Number"
            value={
              company.gstNumber
            }
          />

          <InfoRow
            label="PAN Number"
            value={
              company.panNumber
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            Bank Information
          </h2>

          <InfoRow
            label="Bank Name"
            value={
              company.bankName
            }
          />

          <InfoRow
            label="Account Holder"
            value={
              company.accountHolderName
            }
          />

          <InfoRow
            label="Account Number"
            value={
              company.accountNumber
            }
          />

          <InfoRow
            label="IFSC Code"
            value={
              company.ifscCode
            }
          />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={() =>
            navigate(
              `/settings/companies/${id}/edit`
            )
          }
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Company
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            setDeleteOpen(true)
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Company
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
              Delete Company
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want
              to delete this
              company?

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