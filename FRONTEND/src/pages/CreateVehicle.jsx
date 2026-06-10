// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { ArrowLeft } from "lucide-react";

// import { vehicleService } from "../services/vehicle.services";

// import {
//   handleApiError,
//   handleSuccess,
// } from "../lib/error-handler";

// import { Button } from "../components/ui/button";

// import { Input } from "../components/ui/input";

// import { Label } from "../components/ui/label";

// import {
//   Card,
//   CardContent,
// } from "../components/ui/card";

// import { Switch } from "../components/ui/switch";

// export default function CreateVehicle() {
//   const navigate = useNavigate();

//   const [saving, setSaving] =
//     useState(false);

//   const [form, setForm] =
//     useState({
//       vehicleNumber: "",
//       vehicleName: "",
//       vehicleType: "",
//       registrationNo: "",
//       seatingCapacity: "",
//       isActive: true,
//     });

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]:
//         e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (
//         !form.vehicleNumber.trim()
//       ) {
//         return handleApiError({
//           message:
//             "Vehicle Number is required",
//         });
//       }

//       setSaving(true);

//       await vehicleService.create({
//         ...form,
//         seatingCapacity:
//           form.seatingCapacity
//             ? Number(
//                 form.seatingCapacity,
//               )
//             : null,
//       });

//       handleSuccess(
//         "Vehicle created successfully",
//       );

//       navigate(
//         "/settings/vehicles",
//       );
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <section className="rounded-2xl border bg-card p-8">
//         <div className="flex items-start gap-4">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() =>
//               navigate(
//                 "/settings/vehicles",
//               )
//             }
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>

//           <div>
//             <h1 className="text-3xl font-bold">
//               Create Vehicle
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               Add a new vehicle to
//               your fleet.
//             </p>
//           </div>
//         </div>
//       </section>

//       <Card>
//         <CardContent className="p-6">
//           <h2 className="mb-6 text-lg font-semibold">
//             Vehicle Information
//           </h2>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <Label>
//                 Vehicle Number *
//               </Label>

//               <Input
//                 name="vehicleNumber"
//                 value={
//                   form.vehicleNumber
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="GJ01AB1234"
//               />
//             </div>

//             <div>
//               <Label>
//                 Vehicle Name
//               </Label>

//               <Input
//                 name="vehicleName"
//                 value={
//                   form.vehicleName
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Volvo Bus"
//               />
//             </div>

//             <div>
//               <Label>
//                 Vehicle Type
//               </Label>

//               <Input
//                 name="vehicleType"
//                 value={
//                   form.vehicleType
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Bus"
//               />
//             </div>

//             <div>
//               <Label>
//                 Registration Number
//               </Label>

//               <Input
//                 name="registrationNo"
//                 value={
//                   form.registrationNo
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="REG123456"
//               />
//             </div>

//             <div>
//               <Label>
//                 Seating Capacity
//               </Label>

//               <Input
//                 type="number"
//                 name="seatingCapacity"
//                 value={
//                   form.seatingCapacity
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="52"
//               />
//             </div>

//             <div className="flex flex-col justify-end">
//               <Label className="mb-3">
//                 Active Vehicle
//               </Label>

//               <Switch
//                 checked={
//                   form.isActive
//                 }
//                 onCheckedChange={(
//                   checked,
//                 ) =>
//                   setForm(
//                     (prev) => ({
//                       ...prev,
//                       isActive:
//                         checked,
//                     }),
//                   )
//                 }
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-end gap-2">
//         <Button
//           variant="outline"
//           onClick={() =>
//             navigate(
//               "/settings/vehicles",
//             )
//           }
//         >
//           Cancel
//         </Button>

//         <Button
//           disabled={saving}
//           onClick={handleSubmit}
//         >
//           {saving
//             ? "Creating..."
//             : "Create Vehicle"}
//         </Button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, Truck } from "lucide-react";

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

export default function CreateVehicle() {
  const navigate = useNavigate();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      vehicleNumber: "",
      vehicleName: "",
      vehicleType: "",
      registrationNo: "",
      seatingCapacity: "",
    });

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

      await vehicleService.create({
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

        isActive: true,
      });

      handleSuccess(
        "Vehicle created successfully",
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
              Create Vehicle
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add a new vehicle to
              your fleet management
              system.
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
                Enter vehicle
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
                placeholder="GJ01AB1234"
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
                placeholder="Volvo Bus"
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
                placeholder="Bus"
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
                placeholder="RJ14TC5678"
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
                placeholder="45"
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
            ? "Creating..."
            : "Create Vehicle"}
        </Button>
      </div>
    </div>
  );
}