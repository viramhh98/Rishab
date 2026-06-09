import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { companyService } from "../services/company.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import { Textarea } from "../components/ui/textarea";

import {
  Card,
  CardContent,
} from "../components/ui/card";

export default function CreateCompany() {
  const navigate = useNavigate();

  const [saving, setSaving] =
    useState(false);

  const [logo, setLogo] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] =
    useState({
      companyName: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      gstNumber: "",
      panNumber: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setLogo(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.companyName.trim()
      ) {
        return handleApiError({
          message:
            "Company name is required",
        });
      }

      if (
        !form.ownerName.trim()
      ) {
        return handleApiError({
          message:
            "Owner name is required",
        });
      }

      setSaving(true);

      const formData =
        new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          formData.append(
            key,
            value || ""
          );
        }
      );

      if (logo) {
        formData.append(
          "logo",
          logo
        );
      }

      await companyService.create(
        formData
      );

      handleSuccess(
        "Company created successfully"
      );

      navigate(
        "/settings/companies"
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

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
              Create Company
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add a new company to
              the system.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Basic Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                Company Name *
              </Label>

              <Input
                name="companyName"
                value={
                  form.companyName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>
                Owner Name *
              </Label>

              <Input
                name="ownerName"
                value={
                  form.ownerName
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Contact Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Phone</Label>

              <Input
                name="phone"
                value={form.phone}
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>Email</Label>

              <Input
                name="email"
                value={form.email}
                onChange={
                  handleChange
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <Label>Address</Label>

            <Textarea
              name="address"
              value={
                form.address
              }
              onChange={
                handleChange
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Tax Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                GST Number
              </Label>

              <Input
                name="gstNumber"
                value={
                  form.gstNumber
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>
                PAN Number
              </Label>

              <Input
                name="panNumber"
                value={
                  form.panNumber
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Bank Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Bank Name"
              name="bankName"
              value={
                form.bankName
              }
              onChange={
                handleChange
              }
            />

            <Input
              placeholder="Account Holder Name"
              name="accountHolderName"
              value={
                form.accountHolderName
              }
              onChange={
                handleChange
              }
            />

            <Input
              placeholder="Account Number"
              name="accountNumber"
              value={
                form.accountNumber
              }
              onChange={
                handleChange
              }
            />

            <Input
              placeholder="IFSC Code"
              name="ifscCode"
              value={
                form.ifscCode
              }
              onChange={
                handleChange
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Company Logo
          </h2>

          <Input
            type="file"
            accept="image/*"
            onChange={
              handleLogoChange
            }
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-28 w-28 rounded-lg border object-cover"
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              "/settings/companies"
            )
          }
        >
          Cancel
        </Button>

        <Button
          disabled={saving}
          onClick={handleSubmit}
        >
          {saving
            ? "Creating..."
            : "Create Company"}
        </Button>
      </div>
    </div>
  );
}