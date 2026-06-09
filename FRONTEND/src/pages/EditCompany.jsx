import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

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

export default function EditCompany() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [logo, setLogo] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [removeLogo, setRemoveLogo] =
    useState(false);

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

  const fetchCompany =
    async () => {
      try {
        setLoading(true);

        const company =
          await companyService.getById(
            id
          );

        setForm({
          companyName:
            company.companyName ||
            "",

          ownerName:
            company.ownerName ||
            "",

          phone:
            company.phone || "",

          email:
            company.email || "",

          address:
            company.address || "",

          gstNumber:
            company.gstNumber ||
            "",

          panNumber:
            company.panNumber ||
            "",

          bankName:
            company.bankName ||
            "",

          accountHolderName:
            company.accountHolderName ||
            "",

          accountNumber:
            company.accountNumber ||
            "",

          ifscCode:
            company.ifscCode ||
            "",
        });

        setPreview(
          company.logo || ""
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCompany();
  }, [id]);

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

    setRemoveLogo(false);
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

      if (removeLogo) {
        formData.append(
          "removeLogo",
          "true"
        );
      }

      await companyService.update(
        id,
        formData
      );

      handleSuccess(
        "Company updated successfully"
      );

      navigate(
        `/settings/companies/${id}`
      );
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
          Loading company...
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
                `/settings/companies/${id}`
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Edit Company
            </h1>

            <p className="mt-2 text-muted-foreground">
              Update company
              information.
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
            <div>
              <Label>
                Bank Name
              </Label>

              <Input
                name="bankName"
                value={
                  form.bankName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>
                Account Holder Name
              </Label>

              <Input
                name="accountHolderName"
                value={
                  form.accountHolderName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>
                Account Number
              </Label>

              <Input
                name="accountNumber"
                value={
                  form.accountNumber
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label>
                IFSC Code
              </Label>

              <Input
                name="ifscCode"
                value={
                  form.ifscCode
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
            <div className="mt-4 space-y-4">
              <img
                src={preview}
                alt="Company Logo"
                className="h-28 w-28 rounded-lg border object-cover"
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPreview("");
                  setLogo(null);
                  setRemoveLogo(
                    true
                  );
                }}
              >
                Remove Logo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              `/settings/companies/${id}`
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
            ? "Updating..."
            : "Update Company"}
        </Button>
      </div>
    </div>
  );
}