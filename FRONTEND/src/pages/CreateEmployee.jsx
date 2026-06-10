import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  User,
} from "lucide-react";

import { employeeService } from "../services/employee.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import imageService from "../services/image.services";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

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

import { Checkbox } from "../components/ui/checkbox";

export default function CreateEmployee() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [masterData, setMasterData] =
    useState({
      companies: [],
      departments: [],
      designations: [],
      employmentTypes: [],
    });

  const [profilePreview, setProfilePreview] =
    useState(null);

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",

      phone: "",
      email: "",

      gender: "",

      dateOfBirth: "",
      joiningDate: "",

      profilePhoto: null,

      companyId: "",
      departmentId: "",
      designationId: "",
      employmentTypeId: "",

      panNumber: "",
      aadhaarNumber: "",
      drivingLicenseNo: "",

      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",

      joiningSalary: "",
      currentSalary: "",

      basicSalary: "",
      hra: "",
      da: "",

      pfEnabled: false,
      pfPercentage: "12",
      pfSalaryLimit: "15000",

      ptApplicable: true,
      ptAmount: "200",

      esicApplicable: false,
    });

  const fetchMasterData =
    async () => {
      try {
        setLoading(true);

        const response =
          await employeeService.getMasterData();

        setMasterData(
          response.data || {
            companies: [],
            departments: [],
            designations: [],
            employmentTypes: [],
          }
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMasterData();
  }, []);

  const handleInputChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    setProfilePreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (!form.firstName) {
          return handleApiError({
            response: {
              data: {
                message:
                  "First Name is required",
              },
            },
          });
        }

        if (!form.joiningDate) {
          return handleApiError({
            response: {
              data: {
                message:
                  "Joining Date is required",
              },
            },
          });
        }

        if (!form.companyId) {
          return handleApiError({
            response: {
              data: {
                message:
                  "Company is required",
              },
            },
          });
        }

        setSaving(true);

        const formData =
          new FormData();

        Object.entries(form).forEach(
          ([key, value]) => {
            if (
              value !== null &&
              value !== undefined &&
              value !== ""
            ) {
              formData.append(
                key,
                value
              );
            }
          }
        );

        await employeeService.create(
          formData
        );

        handleSuccess(
          "Employee created successfully"
        );

        navigate("/employees");
      } catch (error) {
        handleApiError(error);
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          Loading employee master
          data...
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              navigate("/employees")
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Create Employee
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add a new employee to
              the organization.
            </p>
          </div>
        </div>
      </section>

      {/* PERSONAL INFORMATION */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            Personal Information
          </h2>

          <div className="flex flex-col items-center gap-4">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile"
                className="h-28 w-28 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full border bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}

            <Label
              htmlFor="profilePhoto"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 rounded-md border px-4 py-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </div>
            </Label>

            <Input
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={
                handlePhotoChange
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                First Name *
              </Label>

              <Input
                value={form.firstName}
                onChange={(e) =>
                  handleInputChange(
                    "firstName",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Last Name
              </Label>

              <Input
                value={form.lastName}
                onChange={(e) =>
                  handleInputChange(
                    "lastName",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>Phone</Label>

              <Input
                value={form.phone}
                onChange={(e) =>
                  handleInputChange(
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>Email</Label>

              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  handleInputChange(
                    "email",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>Gender</Label>

              <Select
                value={form.gender}
                onValueChange={(value) =>
                  handleInputChange(
                    "gender",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Male">
                    Male
                  </SelectItem>

                  <SelectItem value="Female">
                    Female
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Date Of Birth
              </Label>

              <Input
                type="date"
                value={
                  form.dateOfBirth
                }
                onChange={(e) =>
                  handleInputChange(
                    "dateOfBirth",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
            {/* EMPLOYMENT INFORMATION */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            Employment Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                Joining Date *
              </Label>

              <Input
                type="date"
                value={
                  form.joiningDate
                }
                onChange={(e) =>
                  handleInputChange(
                    "joiningDate",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Company *
              </Label>

              <Select
                value={
                  form.companyId
                }
                onValueChange={(value) =>
                  handleInputChange(
                    "companyId",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>

                <SelectContent>
                  {masterData.companies.map(
                    (
                      company
                    ) => (
                      <SelectItem
                        key={
                          company.id
                        }
                        value={String(
                          company.id
                        )}
                      >
                        {
                          company.companyName
                        }
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Department
              </Label>

              <Select
                value={
                  form.departmentId
                }
                onValueChange={(value) =>
                  handleInputChange(
                    "departmentId",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>

                <SelectContent>
                  {masterData.departments.map(
                    (
                      department
                    ) => (
                      <SelectItem
                        key={
                          department.id
                        }
                        value={String(
                          department.id
                        )}
                      >
                        {
                          department.name
                        }
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Designation
              </Label>

              <Select
                value={
                  form.designationId
                }
                onValueChange={(value) =>
                  handleInputChange(
                    "designationId",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>

                <SelectContent>
                  {masterData.designations.map(
                    (
                      designation
                    ) => (
                      <SelectItem
                        key={
                          designation.id
                        }
                        value={String(
                          designation.id
                        )}
                      >
                        {
                          designation.name
                        }
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Employment Type
              </Label>

              <Select
                value={
                  form.employmentTypeId
                }
                onValueChange={(value) =>
                  handleInputChange(
                    "employmentTypeId",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Employment Type" />
                </SelectTrigger>

                <SelectContent>
                  {masterData.employmentTypes.map(
                    (
                      type
                    ) => (
                      <SelectItem
                        key={
                          type.id
                        }
                        value={String(
                          type.id
                        )}
                      >
                        {
                          type.name
                        }
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GOVERNMENT DOCUMENTS */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            Government Documents
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>
                PAN Number
              </Label>

              <Input
                value={
                  form.panNumber
                }
                onChange={(e) =>
                  handleInputChange(
                    "panNumber",
                    e.target.value.toUpperCase()
                  )
                }
              />
            </div>

            <div>
              <Label>
                Aadhaar Number
              </Label>

              <Input
                value={
                  form.aadhaarNumber
                }
                onChange={(e) =>
                  handleInputChange(
                    "aadhaarNumber",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Driving License No
              </Label>

              <Input
                value={
                  form.drivingLicenseNo
                }
                onChange={(e) =>
                  handleInputChange(
                    "drivingLicenseNo",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BANK INFORMATION */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            Bank Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                Bank Name
              </Label>

              <Input
                value={
                  form.bankName
                }
                onChange={(e) =>
                  handleInputChange(
                    "bankName",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Account Holder Name
              </Label>

              <Input
                value={
                  form.accountHolderName
                }
                onChange={(e) =>
                  handleInputChange(
                    "accountHolderName",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Account Number
              </Label>

              <Input
                value={
                  form.accountNumber
                }
                onChange={(e) =>
                  handleInputChange(
                    "accountNumber",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                IFSC Code
              </Label>

              <Input
                value={
                  form.ifscCode
                }
                onChange={(e) =>
                  handleInputChange(
                    "ifscCode",
                    e.target.value.toUpperCase()
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
            {/* SALARY INFORMATION */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            Salary Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                Joining Salary
              </Label>

              <Input
                type="number"
                value={
                  form.joiningSalary
                }
                onChange={(e) =>
                  handleInputChange(
                    "joiningSalary",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Current Salary
              </Label>

              <Input
                type="number"
                value={
                  form.currentSalary
                }
                onChange={(e) =>
                  handleInputChange(
                    "currentSalary",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Basic Salary
              </Label>

              <Input
                type="number"
                value={
                  form.basicSalary
                }
                onChange={(e) =>
                  handleInputChange(
                    "basicSalary",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                HRA
              </Label>

              <Input
                type="number"
                value={form.hra}
                onChange={(e) =>
                  handleInputChange(
                    "hra",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>DA</Label>

              <Input
                type="number"
                value={form.da}
                onChange={(e) =>
                  handleInputChange(
                    "da",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PF / PT / ESIC */}

      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">
            PF / PT / ESIC
          </h2>

          <div className="grid gap-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  form.pfEnabled
                }
                onCheckedChange={(
                  checked
                ) =>
                  handleInputChange(
                    "pfEnabled",
                    checked
                  )
                }
              />

              <Label>
                PF Enabled
              </Label>
            </div>

            {form.pfEnabled && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>
                    PF Percentage
                  </Label>

                  <Input
                    type="number"
                    value={
                      form.pfPercentage
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "pfPercentage",
                        e.target.value
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
                      form.pfSalaryLimit
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "pfSalaryLimit",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  form.ptApplicable
                }
                onCheckedChange={(
                  checked
                ) =>
                  handleInputChange(
                    "ptApplicable",
                    checked
                  )
                }
              />

              <Label>
                Professional Tax
                Applicable
              </Label>
            </div>

            {form.ptApplicable && (
              <div>
                <Label>
                  PT Amount
                </Label>

                <Input
                  type="number"
                  value={
                    form.ptAmount
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "ptAmount",
                      e.target.value
                    )
                  }
                />
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  form.esicApplicable
                }
                onCheckedChange={(
                  checked
                ) =>
                  handleInputChange(
                    "esicApplicable",
                    checked
                  )
                }
              />

              <Label>
                ESIC Applicable
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ACTIONS */}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            navigate("/employees")
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Creating Employee..."
            : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}