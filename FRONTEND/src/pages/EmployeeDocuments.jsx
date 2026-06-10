import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, FileText, Upload, User } from "lucide-react";

import fileService from "../services/image.services";

import { employeeService } from "../services/employee.services";

import { employeeDocumentService } from "../services/employeeDocument.services";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

import { Badge } from "../components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function EmployeeDocuments() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [uploadOpen, setUploadOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [form, setForm] = useState({
    documentType: "",
    documentName: "",
    file: null,
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      const [employeeResponse, documentsResponse] = await Promise.all([
        employeeService.getById(id),

        employeeDocumentService.getByEmployeeId(id),
      ]);

      setEmployee(employeeResponse.data);

      setDocuments(documentsResponse.data || []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          Loading employee documents...
        </CardContent>
      </Card>
    );
  }

  if (!employee) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          Employee not found
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
            onClick={() => navigate(`/employees/${id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Employee Documents</h1>

            <p className="mt-2 text-muted-foreground">
              Upload and manage employee documents.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {employee.profilePhoto ? (
              <img
                src={fileService.getFileUrl(employee.profilePhoto)}
                alt={employee.firstName}
                className="h-24 w-24 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {employee.firstName} {employee.lastName}
              </h2>

              <p className="text-muted-foreground">{employee.employeeCode}</p>

              <div className="flex flex-wrap gap-2">
                <Badge>{employee.department?.name}</Badge>

                <Badge variant="secondary">{employee.designation?.name}</Badge>

                <Badge variant="outline">{employee.employmentType?.name}</Badge>
              </div>
            </div>

            <div className="ml-auto">
              <Button onClick={() => setUploadOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Employee Document</DialogTitle>
          </DialogHeader>

          <UploadDocumentForm
            form={form}
            setForm={setForm}
            uploading={uploading}
            employeeId={id}
            fetchData={fetchData}
            setUploadOpen={setUploadOpen}
          />
        </DialogContent>
      </Dialog>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>

                <TableHead>Document Name</TableHead>

                <TableHead>Uploaded On</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No documents uploaded yet
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((document, index) => (
                  <TableRow
                    key={document.id}
                    className={index % 2 === 0 ? "" : "bg-muted/50"}
                  >
                    <TableCell>
                      {document.documentType?.replaceAll("_", " ")}
                    </TableCell>

                    <TableCell>{document.documentName || "-"}</TableCell>

                    <TableCell>
                      {new Date(document.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() =>
                            window.open(
                              fileService.getFileUrl(document.filePath),
                              "_blank",
                            )
                          }
                        >
                          View
                        </Button>

                        

                        <Button
                          variant="link"
                          className="p-0 text-destructive"
                          onClick={() => {
                            setSelectedDocument(document);

                            setDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this document?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={async () => {
                try {
                  await employeeDocumentService.delete(selectedDocument.id);

                  handleSuccess("Document deleted successfully");

                  setDeleteOpen(false);

                  fetchData();
                } catch (error) {
                  handleApiError(error);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function UploadDocumentForm({
  form,
  setForm,
  employeeId,
  fetchData,
  setUploadOpen,
}) {
  const [saving, setSaving] = useState(false);

  const documentTypes = [
    "PAN_CARD",
    "AADHAAR_CARD",
    "DRIVING_LICENSE",
    "BANK_PASSBOOK",
    "PHOTO",
    "OTHER",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (!form.documentType) {
        return handleApiError({
          response: {
            data: {
              message: "Document type is required",
            },
          },
        });
      }

      if (form.documentType === "OTHER" && !form.documentName?.trim()) {
        return handleApiError({
          response: {
            data: {
              message: "Document name is required",
            },
          },
        });
      }

      if (!form.file) {
        return handleApiError({
          response: {
            data: {
              message: "Please select a file",
            },
          },
        });
      }

      setSaving(true);

      const formData = new FormData();

      formData.append("employeeId", employeeId);

      formData.append("documentType", form.documentType);

      if (form.documentType === "OTHER") {
        formData.append("documentName", form.documentName);
      }

      formData.append("file", form.file);

      await employeeDocumentService.upload(formData);

      handleSuccess("Document uploaded successfully");

      setForm({
        documentType: "",
        documentName: "",
        file: null,
      });

      setUploadOpen(false);

      fetchData();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Document Type *</Label>

        <Select
          value={form.documentType}
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              documentType: value,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>

          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type
                  .replaceAll("_", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {form.documentType === "OTHER" && (
        <div>
          <Label>Document Name *</Label>

          <Input
            value={form.documentName}
            placeholder="March Advance Voucher"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                documentName: e.target.value,
              }))
            }
          />
        </div>
      )}

      <div>
        <Label>Select File *</Label>

        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              file: e.target.files?.[0],
            }))
          }
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setUploadOpen(false)}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={saving}>
          {saving ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
}
