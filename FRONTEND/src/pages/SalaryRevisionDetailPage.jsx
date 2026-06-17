import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { salaryRevisionService } from "@/services/salaryRevision.service";

export default function SalaryRevisionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [salaryRevision, setSalaryRevision] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadSalaryRevision =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await salaryRevisionService.getById(
            id,
          );

        setSalaryRevision(
          response.data,
        );
      } catch (error) {
        console.error(error);

        setError(
          error?.response?.data
            ?.message ||
            "Failed to load salary revision",
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSalaryRevision();
  }, [id]);

  const formatCurrency = (
    amount,
  ) => {
    return Number(
      amount || 0,
    ).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      },
    );
  };

  const formatDate = (
    date,
  ) => {
    if (!date) return "-";

    return new Date(
      date,
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center">
            Loading salary revision...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center text-red-500">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!salaryRevision) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center">
            Salary revision not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  const difference =
    Number(
      salaryRevision.revisedSalary,
    ) -
    Number(
      salaryRevision.previousSalary,
    );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Salary Revision Details
          </h1>

          <p className="text-muted-foreground text-sm">
            View salary revision
            information
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            navigate(-1)
          }
        >
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Employee Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">
                Employee Code
              </p>

              <p className="font-medium">
                {salaryRevision
                  .employee
                  ?.employeeCode ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Employee Name
              </p>

              <p className="font-medium">
                {
                  salaryRevision
                    .employee
                    ?.firstName
                }{" "}
                {
                  salaryRevision
                    .employee
                    ?.lastName
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Salary Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">
                Previous Salary
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.previousSalary,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Revised Salary
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.revisedSalary,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Difference
              </p>

              <p className="font-medium text-green-600">
                {formatCurrency(
                  difference,
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Salary Breakup
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">
                Basic Salary
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.basicSalary,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                HRA
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.hra,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                DA
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.da,
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Statutory Settings
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">
                PF Enabled
              </p>

              <p className="font-medium">
                {salaryRevision.pfEnabled
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                PF %
              </p>

              <p className="font-medium">
                {
                  salaryRevision.pfPercentage
                }
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                PF Salary Limit
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.pfSalaryLimit,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                PT Applicable
              </p>

              <p className="font-medium">
                {salaryRevision.ptApplicable
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                PT Amount
              </p>

              <p className="font-medium">
                {formatCurrency(
                  salaryRevision.ptAmount,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                ESIC Applicable
              </p>

              <p className="font-medium">
                {salaryRevision.esicApplicable
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Revision Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">
                Effective From
              </p>

              <p className="font-medium">
                {formatDate(
                  salaryRevision.effectiveFrom,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Created At
              </p>

              <p className="font-medium">
                {formatDate(
                  salaryRevision.createdAt,
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Revision Reason
              </p>

              <p className="font-medium">
                {salaryRevision.revisionReason ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Updated By
              </p>

              <p className="font-medium">
                {salaryRevision
                  .updatedBy
                  ?.username || "-"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-muted-foreground text-sm">
                Remarks
              </p>

              <p className="font-medium whitespace-pre-wrap">
                {salaryRevision.remarks ||
                  "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}