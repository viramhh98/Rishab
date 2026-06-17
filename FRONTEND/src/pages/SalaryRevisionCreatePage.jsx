import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { salaryRevisionService } from "@/services/salaryRevision.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function SalaryRevisionCreatePage() {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    revisedSalary: "",
    basicSalary: "",
    hra: "",
    da: "",

    pfEnabled: false,
    pfPercentage: 12,
    pfSalaryLimit: 15000,

    ptApplicable: true,
    ptAmount: 200,

    esicApplicable: false,

    effectiveFrom: "",

    revisionReason: "",
    remarks: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.revisedSalary) {
      toast.error("Revised salary is required");
      return false;
    }

    if (!formData.effectiveFrom) {
      toast.error("Effective date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      await salaryRevisionService.create({
        employeeId: Number(employeeId),

        revisedSalary: Number(
          formData.revisedSalary,
        ),

        basicSalary: formData.basicSalary
          ? Number(formData.basicSalary)
          : null,

        hra: formData.hra
          ? Number(formData.hra)
          : null,

        da: formData.da
          ? Number(formData.da)
          : null,

        pfEnabled: formData.pfEnabled,
        pfPercentage: Number(
          formData.pfPercentage,
        ),
        pfSalaryLimit: Number(
          formData.pfSalaryLimit,
        ),

        ptApplicable: formData.ptApplicable,
        ptAmount: Number(formData.ptAmount),

        esicApplicable:
          formData.esicApplicable,

        effectiveFrom:
          formData.effectiveFrom,

        revisionReason:
          formData.revisionReason,

        remarks: formData.remarks,
      });

      toast.success(
        "Salary revision created successfully",
      );

      navigate(
        `/salary-revision/${employeeId}`,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create salary revision",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Create Salary Revision
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>
                  Revised Salary *
                </Label>

                <Input
                  type="number"
                  value={
                    formData.revisedSalary
                  }
                  onChange={(e) =>
                    handleChange(
                      "revisedSalary",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Effective From *
                </Label>

                <Input
                  type="date"
                  value={
                    formData.effectiveFrom
                  }
                  onChange={(e) =>
                    handleChange(
                      "effectiveFrom",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>
                  Basic Salary
                </Label>

                <Input
                  type="number"
                  value={
                    formData.basicSalary
                  }
                  onChange={(e) =>
                    handleChange(
                      "basicSalary",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div>
                <Label>HRA</Label>

                <Input
                  type="number"
                  value={formData.hra}
                  onChange={(e) =>
                    handleChange(
                      "hra",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div>
                <Label>DA</Label>

                <Input
                  type="number"
                  value={formData.da}
                  onChange={(e) =>
                    handleChange(
                      "da",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  PF Settings
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>
                      PF Enabled
                    </Label>

                    <select
                      className="border-input bg-background h-10 w-full rounded-md border px-3"
                      value={
                        formData.pfEnabled
                          ? "true"
                          : "false"
                      }
                      onChange={(e) =>
                        handleChange(
                          "pfEnabled",
                          e.target.value ===
                            "true",
                        )
                      }
                    >
                      <option value="true">
                        Yes
                      </option>
                      <option value="false">
                        No
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label>
                      PF %
                    </Label>

                    <Input
                      type="number"
                      value={
                        formData.pfPercentage
                      }
                      onChange={(e) =>
                        handleChange(
                          "pfPercentage",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label>
                      PF Salary Limit
                    </Label>

                    <Input
                      type="number"
                      value={
                        formData.pfSalaryLimit
                      }
                      onChange={(e) =>
                        handleChange(
                          "pfSalaryLimit",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  PT / ESIC Settings
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>
                      PT Applicable
                    </Label>

                    <select
                      className="border-input bg-background h-10 w-full rounded-md border px-3"
                      value={
                        formData.ptApplicable
                          ? "true"
                          : "false"
                      }
                      onChange={(e) =>
                        handleChange(
                          "ptApplicable",
                          e.target.value ===
                            "true",
                        )
                      }
                    >
                      <option value="true">
                        Yes
                      </option>
                      <option value="false">
                        No
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label>
                      PT Amount
                    </Label>

                    <Input
                      type="number"
                      value={
                        formData.ptAmount
                      }
                      onChange={(e) =>
                        handleChange(
                          "ptAmount",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label>
                      ESIC Applicable
                    </Label>

                    <select
                      className="border-input bg-background h-10 w-full rounded-md border px-3"
                      value={
                        formData.esicApplicable
                          ? "true"
                          : "false"
                      }
                      onChange={(e) =>
                        handleChange(
                          "esicApplicable",
                          e.target.value ===
                            "true",
                        )
                      }
                    >
                      <option value="true">
                        Yes
                      </option>
                      <option value="false">
                        No
                      </option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label>
                Revision Reason
              </Label>

              <Input
                value={
                  formData.revisionReason
                }
                onChange={(e) =>
                  handleChange(
                    "revisionReason",
                    e.target.value,
                  )
                }
              />
            </div>

            <div>
              <Label>Remarks</Label>

              <Textarea
                rows={4}
                value={formData.remarks}
                onChange={(e) =>
                  handleChange(
                    "remarks",
                    e.target.value,
                  )
                }
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Revision"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate(
                    `/salary-revision/${employeeId}`,
                  )
                }
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}