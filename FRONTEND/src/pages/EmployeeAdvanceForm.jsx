import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { employeeAdvanceService } from "@/services/employeeAdvance.service";
import imageService from "@/services/image.services";


export default function EmployeeAdvanceDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [advance, setAdvance] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadAdvance = async () => {
    try {
      setLoading(true);

      const response = await employeeAdvanceService.getById(id);

      setAdvance(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message || "Failed to load advance details",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdvance();
  }, [id]);

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this advance?",
    );

    if (!confirmed) return;

    try {
      await employeeAdvanceService.delete(id);

      navigate("/employee-advances");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete advance");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {" "}
        <Card>
          {" "}
          <CardContent className="py-10 text-center">
            Loading...{" "}
          </CardContent>{" "}
        </Card>{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {" "}
        <Card>
          {" "}
          <CardContent className="py-10 text-center text-red-500">
            {error}{" "}
          </CardContent>{" "}
        </Card>{" "}
      </div>
    );
  }

  if (!advance) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/employee-advances")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">Employee Advance Details</h1>

                <p className="mt-2 text-muted-foreground">
                  View employee advance information and deduction details.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/employee-advances/edit/${id}`)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Employee Information</h2>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img
              src={
                imageService.getImageUrl(advance.employee?.profilePhoto) ||
                "/placeholder-user.jpg"
              }
              alt=""
              className="h-24 w-24 rounded-full border object-cover"
            />

            <div className="grid flex-1 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Employee Code</p>

                <p className="font-medium">{advance.employee?.employeeCode}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Employee Name</p>

                <p className="font-medium">
                  {advance.employee?.firstName} {advance.employee?.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Phone</p>

                <p className="font-medium">{advance.employee?.phone}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Current Salary</p>

                <p className="font-medium">
                  ₹
                  {Number(
                    advance.employee?.currentSalary || 0,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Advance Information</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Advance Amount</p>

              <p className="mt-1 text-lg font-semibold">
                {formatCurrency(advance.amount)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Advance Date</p>

              <p className="mt-1 font-medium">
                {formatDate(advance.advanceDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Payment Method</p>

              <p className="mt-1 font-medium">{advance.paymentMethod?.name}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Deduction Status</p>

              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    advance.deductionStatus === "DEDUCTED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {advance.deductionStatus}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Given By</p>

              <p className="mt-1 font-medium">
                {advance.givenBy?.username || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Created At</p>

              <p className="mt-1 font-medium">
                {formatDate(advance.createdAt)}
              </p>
            </div>

            {advance.deductionMonth && advance.deductionYear && (
              <div>
                <p className="text-xs text-muted-foreground">
                  Deduction Period
                </p>

                <p className="mt-1 font-medium">
                  {advance.deductionMonth}/{advance.deductionYear}
                </p>
              </div>
            )}

            {advance.deductedAt && (
              <div>
                <p className="text-xs text-muted-foreground">Deducted At</p>

                <p className="mt-1 font-medium">
                  {formatDate(advance.deductedAt)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Reason & Remarks</h2>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium">Reason</p>

              <div className="rounded-lg border bg-muted/20 p-4">
                {advance.reason || "No reason provided"}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Remarks</p>

              <div className="rounded-lg border bg-muted/20 p-4">
                {advance.remarks || "No remarks available"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
