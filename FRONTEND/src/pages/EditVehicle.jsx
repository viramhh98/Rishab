import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Truck,
} from "lucide-react";

import { vehicleService } from "../services/vehicle.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
} from "../components/ui/card";

export default function EditVehicle() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      vehicleNumber: "",
      vehicleName: "",
      vehicleType: "",
      registrationNo: "",
      seatingCapacity: "",
      isActive: true,
    });

  const fetchVehicle =
    async () => {
      try {
        setLoading(true);

        const data =
          await vehicleService.getById(
            id,
          );

        setForm({
          vehicleNumber:
            data.vehicleNumber || "",

          vehicleName:
            data.vehicleName || "",

          vehicleType:
            data.vehicleType || "",

          registrationNo:
            data.registrationNo || "",

          seatingCapacity:
            data.seatingCapacity || "",

          isActive:
            data.isActive,
        });
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.vehicleNumber.trim()
      ) {
        return handleApiError({
          message:
            "Vehicle Number is required",
        });
      }

      if (
        form.seatingCapacity &&
        Number(
          form.seatingCapacity,
        ) < 1
      ) {
        return handleApiError({
          message:
            "Seating Capacity must be greater than 0",
        });
      }

      setSaving(true);

      await vehicleService.update(
        id,
        {
          vehicleNumber:
            form.vehicleNumber.trim(),

          vehicleName:
            form.vehicleName.trim(),

          vehicleType:
            form.vehicleType.trim(),

          registrationNo:
            form.registrationNo.trim(),

          seatingCapacity:
            form.seatingCapacity
              ? Number(
                  form.seatingCapacity,
                )
              : null,

          isActive:
            form.isActive,
        },
      );

      handleSuccess(
        "Vehicle updated successfully",
      );

      navigate(
        "/settings/master-data/vehicles",
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-10 text-center">
            Loading vehicle...
          </CardContent>
        </Card>
      </div>
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
                "/settings/master-data/vehicles",
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Edit Vehicle
            </h1>

            <p className="mt-2 text-muted-foreground">
              Update vehicle
              information.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl border p-3">
              <Truck className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Vehicle Information
              </h2>

              <p className="text-sm text-muted-foreground">
                Modify vehicle
                details below.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block">
                Vehicle Number *
              </Label>

              <Input
                name="vehicleNumber"
                value={
                  form.vehicleNumber
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Vehicle Name
              </Label>

              <Input
                name="vehicleName"
                value={
                  form.vehicleName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Vehicle Type
              </Label>

              <Input
                name="vehicleType"
                value={
                  form.vehicleType
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Registration Number
              </Label>

              <Input
                name="registrationNo"
                value={
                  form.registrationNo
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Seating Capacity
              </Label>

              <Input
                type="number"
                min="1"
                name="seatingCapacity"
                value={
                  form.seatingCapacity
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              "/settings/master-data/vehicles",
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
            : "Update Vehicle"}
        </Button>
      </div>
    </div>
  );
}