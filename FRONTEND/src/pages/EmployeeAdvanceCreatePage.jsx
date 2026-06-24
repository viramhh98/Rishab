import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";

import { employeeAdvanceService } from "../services/employeeAdvance.service";

import imageService from "../services/image.services";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { cn } from "../lib/utils";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import { Textarea } from "../components/ui/textarea";

import { Card, CardContent } from "../components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";

export default function EmployeeAdvanceCreatePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [employeeOpen, setEmployeeOpen] = useState(false);

  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    amount: "",
    advanceDate: new Date().toISOString().split("T")[0],
    paymentMethodId: "",
    reason: "",
    remarks: "",
  });

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      setLoading(true);

      const response = await employeeAdvanceService.getMasterData();

      setEmployees(response.data?.employees || []);

      setPaymentMethods(response.data?.paymentMethods || []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedEmployee = employees.find(
    (employee) => String(employee.id) === String(form.employeeId),
  );

  const selectedPaymentMethod = paymentMethods.find(
    (method) => String(method.id) === String(form.paymentMethodId),
  );

  const handleSubmit = async () => {
    try {
      if (!form.employeeId) {
        return handleApiError({
          message: "Please select employee",
        });
      }

      if (!form.amount || Number(form.amount) <= 0) {
        return handleApiError({
          message: "Please enter valid amount",
        });
      }

      if (!form.paymentMethodId) {
        return handleApiError({
          message: "Please select payment method",
        });
      }

      setSaving(true);

      await employeeAdvanceService.create({
        employeeId: Number(form.employeeId),

        amount: Number(form.amount),

        advanceDate: form.advanceDate,

        paymentMethodId: Number(form.paymentMethodId),

        reason: form.reason,

        remarks: form.remarks,
      });

      handleSuccess("Employee advance created successfully");

      navigate("/employee-advances");
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading... </div>;
  }

  return (
    <div className="space-y-6">
      {" "}
      <section className="rounded-2xl border bg-card p-8">
        {" "}
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/employee-advances")}
          >
            {" "}
            <ArrowLeft className="h-4 w-4" />{" "}
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Create Employee Advance</h1>

            <p className="mt-2 text-muted-foreground">
              Record advance payment for an employee.
            </p>
          </div>
        </div>
      </section>
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Advance Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Employee *</Label>

              <Popover open={employeeOpen} onOpenChange={setEmployeeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedEmployee
                      ? `${selectedEmployee.employeeCode} - ${selectedEmployee.firstName} ${selectedEmployee.lastName || ""}`
                      : "Select Employee"}

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder="Search employee..." />

                    <CommandList>
                      <CommandEmpty>No employee found.</CommandEmpty>

                      <CommandGroup>
                        {employees.map((employee) => (
                          <CommandItem
                            key={employee.id}
                            value={`${employee.employeeCode} ${employee.firstName} ${employee.lastName || ""} ${employee.phone || ""}`}
                            onSelect={() => {
                              setForm((prev) => ({
                                ...prev,
                                employeeId: String(employee.id),
                              }));

                              setEmployeeOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                String(form.employeeId) === String(employee.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {employee.employeeCode}
                            {" - "}
                            {employee.firstName} {employee.lastName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Payment Method *</Label>

              <Popover
                open={paymentMethodOpen}
                onOpenChange={setPaymentMethodOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedPaymentMethod
                      ? selectedPaymentMethod.name
                      : "Select Payment Method"}

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search payment method..." />

                    <CommandList>
                      <CommandEmpty>No payment method found.</CommandEmpty>

                      <CommandGroup>
                        {paymentMethods.map((method) => (
                          <CommandItem
                            key={method.id}
                            value={method.name}
                            onSelect={() => {
                              setForm((prev) => ({
                                ...prev,
                                paymentMethodId: String(method.id),
                              }));

                              setPaymentMethodOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                String(form.paymentMethodId) ===
                                  String(method.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />

                            {method.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Amount *</Label>

              <Input
                type="number"
                placeholder="Enter advance amount"
                value={form.amount}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Advance Date</Label>

              <Input
                type="date"
                value={form.advanceDate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    advanceDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {selectedEmployee && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <img
                    src={
                      imageService.getImageUrl(selectedEmployee.profilePhoto) ||
                      "/placeholder-user.jpg"
                    }
                    alt=""
                    className="h-20 w-20 rounded-full border object-cover"
                  />

                  <div className="grid flex-1 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Employee</p>

                      <p className="font-medium">
                        {selectedEmployee.firstName} {selectedEmployee.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Employee Code
                      </p>

                      <p className="font-medium">
                        {selectedEmployee.employeeCode}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>

                      <p className="font-medium">{selectedEmployee.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Current Salary
                      </p>

                      <p className="font-medium">
                        ₹
                        {Number(
                          selectedEmployee.currentSalary || 0,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <Label>Reason</Label>

            <Textarea
              rows={4}
              value={form.reason}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
            />
          </div>

          <div className="mt-4">
            <Label>Remarks</Label>

            <Textarea
              rows={4}
              value={form.remarks}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigate("/employee-advances")}
        >
          Cancel
        </Button>

        <Button disabled={saving} onClick={handleSubmit}>
          {saving ? "Saving..." : "Create Advance"}
        </Button>
      </div>
    </div>
  );
}
