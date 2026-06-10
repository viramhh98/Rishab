import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Pencil, Trash2, User } from "lucide-react";

import fileService from "../services/image.services";

import { employeeService } from "../services/employee.services";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

import { Badge } from "../components/ui/badge";

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

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="text-right font-medium">{value || "-"}</p>
    </div>
  );
}

export default function EmployeeDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const response = await employeeService.getById(id);

      setEmployee(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await employeeService.delete(id);

      handleSuccess("Employee deleted successfully");

      navigate("/employees");
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
          Loading employee...
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
            onClick={() => navigate("/employees")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Employee Details</h1>

            <p className="mt-2 text-muted-foreground">
              View employee information and records.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-6">
          {employee.profilePhoto ? (
            <img
              src={fileService.getFileUrl(employee.profilePhoto)}
              alt={employee.firstName}
              className="h-28 w-28 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {employee.firstName} {employee.lastName}
            </h2>

            <p className="text-muted-foreground">{employee.employeeCode}</p>
          </div>

          <Badge
            variant={employee.status === "ACTIVE" ? "default" : "destructive"}
          >
            {employee.status}
          </Badge>
        </CardContent>
      </Card>
      {/* PERSONAL INFORMATION */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>

          <InfoRow label="First Name" value={employee.firstName} />

          <InfoRow label="Last Name" value={employee.lastName} />

          <InfoRow label="Phone" value={employee.phone} />

          <InfoRow label="Email" value={employee.email} />

          <InfoRow label="Gender" value={employee.gender} />

          <InfoRow
            label="Date Of Birth"
            value={
              employee.dateOfBirth
                ? new Date(employee.dateOfBirth).toLocaleDateString()
                : "-"
            }
          />
        </CardContent>
      </Card>

      {/* EMPLOYMENT INFORMATION */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Employment Information</h2>

          <InfoRow label="Employee Code" value={employee.employeeCode} />

          <InfoRow
            label="Joining Date"
            value={
              employee.joiningDate
                ? new Date(employee.joiningDate).toLocaleDateString()
                : "-"
            }
          />

          <InfoRow label="Company" value={employee.company?.companyName} />

          <InfoRow label="Department" value={employee.department?.name} />

          <InfoRow label="Designation" value={employee.designation?.name} />

          <InfoRow
            label="Employment Type"
            value={employee.employmentType?.name}
          />

          <InfoRow label="Status" value={employee.status} />
        </CardContent>
      </Card>

      {/* GOVERNMENT DOCUMENTS */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Government Documents</h2>

          <InfoRow label="PAN Number" value={employee.panNumber} />

          <InfoRow label="Aadhaar Number" value={employee.aadhaarNumber} />

          <InfoRow
            label="Driving License No"
            value={employee.drivingLicenseNo}
          />
        </CardContent>
      </Card>
      {/* BANK INFORMATION */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Bank Information</h2>

          <InfoRow label="Bank Name" value={employee.bankName} />

          <InfoRow label="Account Holder" value={employee.accountHolderName} />

          <InfoRow label="Account Number" value={employee.accountNumber} />

          <InfoRow label="IFSC Code" value={employee.ifscCode} />
        </CardContent>
      </Card>

      {/* SALARY INFORMATION */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Salary Information</h2>

          <InfoRow
            label="Joining Salary"
            value={employee.joiningSalary ? `₹${employee.joiningSalary}` : "-"}
          />

          <InfoRow
            label="Current Salary"
            value={employee.currentSalary ? `₹${employee.currentSalary}` : "-"}
          />

          <InfoRow
            label="Basic Salary"
            value={employee.basicSalary ? `₹${employee.basicSalary}` : "-"}
          />

          <InfoRow
            label="HRA"
            value={employee.hra ? `₹${employee.hra}` : "-"}
          />

          <InfoRow label="DA" value={employee.da ? `₹${employee.da}` : "-"} />
        </CardContent>
      </Card>

      {/* PF / PT / ESIC */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">PF / PT / ESIC</h2>

          <InfoRow
            label="PF Enabled"
            value={employee.pfEnabled ? "Yes" : "No"}
          />

          <InfoRow label="PF Percentage" value={employee.pfPercentage} />

          <InfoRow label="PF Salary Limit" value={employee.pfSalaryLimit} />

          <InfoRow
            label="PT Applicable"
            value={employee.ptApplicable ? "Yes" : "No"}
          />

          <InfoRow label="PT Amount" value={employee.ptAmount} />

          <InfoRow
            label="ESIC Applicable"
            value={employee.esicApplicable ? "Yes" : "No"}
          />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => navigate(`/employees/${id}/edit`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Employee
        </Button>

        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Employee
        </Button>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this employee?
              <br />
              <br />
              This action will mark the employee as terminated and inactive.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction disabled={deleting} onClick={handleDelete}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
