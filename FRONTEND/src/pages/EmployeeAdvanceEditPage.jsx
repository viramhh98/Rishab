import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
Check,
ChevronsUpDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";

import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
CommandList,
} from "@/components/ui/command";

import imageService from "@/services/image.services";

import { employeeAdvanceService } from "@/services/employeeAdvance.service";

export default function EmployeeAdvanceEditPage() {
const navigate = useNavigate();

const { id } = useParams();

const [loading, setLoading] =
useState(false);

const [pageLoading, setPageLoading] =
useState(true);

const [employeeOpen, setEmployeeOpen] =
useState(false);

const [
paymentMethodOpen,
setPaymentMethodOpen,
] = useState(false);

const [masterData, setMasterData] =
useState({
employees: [],
paymentMethods: [],
});

const [formData, setFormData] =
useState({
employeeId: "",
amount: "",
advanceDate: "",
paymentMethodId: "",
reason: "",
remarks: "",
});

useEffect(() => {
loadData();
}, [id]);

const loadData = async () => {
try {
setPageLoading(true);


  const [
    masterResponse,
    advanceResponse,
  ] = await Promise.all([
    employeeAdvanceService.getMasterData(),
    employeeAdvanceService.getById(id),
  ]);

  setMasterData(
    masterResponse.data || {
      employees: [],
      paymentMethods: [],
    }
  );

  const advance =
    advanceResponse.data;

  setFormData({
    employeeId:
      advance.employeeId?.toString() ||
      "",

    amount:
      advance.amount?.toString() ||
      "",

    advanceDate:
      advance.advanceDate?.split(
        "T"
      )[0] || "",

    paymentMethodId:
      advance.paymentMethodId?.toString() ||
      "",

    reason:
      advance.reason || "",

    remarks:
      advance.remarks || "",
  });
} catch (error) {
  console.error(error);
} finally {
  setPageLoading(false);
}


};

const selectedEmployee =
masterData.employees.find(
(employee) =>
String(employee.id) ===
String(formData.employeeId)
);

const selectedPaymentMethod =
masterData.paymentMethods.find(
(method) =>
String(method.id) ===
String(
formData.paymentMethodId
)
);

const handleChange = (e) => {
const { name, value } =
e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleSubmit = async (
e
) => {
e.preventDefault();


try {
  setLoading(true);

  await employeeAdvanceService.update(
    id,
    formData
  );

  navigate(
    `/employee-advances/${id}`
  );
} catch (error) {
  console.error(error);

  alert(
    error?.response?.data
      ?.message ||
      "Failed to update advance"
  );
} finally {
  setLoading(false);
}


};

if (pageLoading) {
return ( <div className="p-6"> <Card> <CardContent className="py-10 text-center">
Loading... </CardContent> </Card> </div>
);
}

return ( <div className="p-6"> <Card> <CardHeader> <CardTitle>
Edit Employee Advance </CardTitle> </CardHeader>


    <CardContent>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <Label>
              Employee
            </Label>

            <Popover
              open={
                employeeOpen
              }
              onOpenChange={
                setEmployeeOpen
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedEmployee
                    ? `${selectedEmployee.employeeCode} - ${selectedEmployee.firstName} ${selectedEmployee.lastName || ""}`
                    : "Select Employee"}

                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[500px] p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />

                  <CommandList>
                    <CommandEmpty>
                      No employee found.
                    </CommandEmpty>

                    <CommandGroup>
                      {masterData.employees.map(
                        (
                          employee
                        ) => (
                          <CommandItem
                            key={
                              employee.id
                            }
                            value={`${employee.employeeCode} ${employee.firstName} ${employee.lastName || ""} ${employee.phone || ""}`}
                            onSelect={() => {
                              setFormData(
                                (
                                  prev
                                ) => ({
                                  ...prev,
                                  employeeId:
                                    String(
                                      employee.id
                                    ),
                                })
                              );

                              setEmployeeOpen(
                                false
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                String(
                                  formData.employeeId
                                ) ===
                                  String(
                                    employee.id
                                  )
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />

                            <div className="flex flex-col">
                              <span>
                                {
                                  employee.employeeCode
                                }
                                {" - "}
                                {
                                  employee.firstName
                                }{" "}
                                {
                                  employee.lastName
                                }
                              </span>

                              <span className="text-xs text-muted-foreground">
                                {
                                  employee.phone
                                }
                              </span>
                            </div>
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>
              Payment Method
            </Label>

            <Popover
              open={
                paymentMethodOpen
              }
              onOpenChange={
                setPaymentMethodOpen
              }
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

                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search payment method..." />

                  <CommandList>
                    <CommandEmpty>
                      No payment method found.
                    </CommandEmpty>

                    <CommandGroup>
                      {masterData.paymentMethods.map(
                        (
                          method
                        ) => (
                          <CommandItem
                            key={
                              method.id
                            }
                            value={
                              method.name
                            }
                            onSelect={() => {
                              setFormData(
                                (
                                  prev
                                ) => ({
                                  ...prev,
                                  paymentMethodId:
                                    String(
                                      method.id
                                    ),
                                })
                              );

                              setPaymentMethodOpen(
                                false
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                String(
                                  formData.paymentMethodId
                                ) ===
                                  String(
                                    method.id
                                  )
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />

                            {
                              method.name
                            }
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>
              Amount
            </Label>

            <Input
              type="number"
              name="amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div>
            <Label>
              Advance Date
            </Label>

            <Input
              type="date"
              name="advanceDate"
              value={
                formData.advanceDate
              }
              onChange={
                handleChange
              }
              required
            />
          </div>
        </div>

        {selectedEmployee && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">

                <img
                  src={
                    imageService.getImageUrl(
                      selectedEmployee.profilePhoto
                    ) ||
                    "/placeholder-user.jpg"
                  }
                  alt=""
                  className="h-20 w-20 rounded-full border object-cover"
                />

                <div className="grid flex-1 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Employee
                    </p>

                    <p className="font-medium">
                      {
                        selectedEmployee.firstName
                      }{" "}
                      {
                        selectedEmployee.lastName
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Code
                    </p>

                    <p className="font-medium">
                      {
                        selectedEmployee.employeeCode
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone
                    </p>

                    <p className="font-medium">
                      {
                        selectedEmployee.phone
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Salary
                    </p>

                    <p className="font-medium">
                      ₹
                      {Number(
                        selectedEmployee.currentSalary ||
                          0
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <Label>
            Reason
          </Label>

          <Textarea
            name="reason"
            value={
              formData.reason
            }
            onChange={
              handleChange
            }
            rows={3}
          />
        </div>

        <div>
          <Label>
            Remarks
          </Label>

          <Textarea
            name="remarks"
            value={
              formData.remarks
            }
            onChange={
              handleChange
            }
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(
                `/employee-advances/${id}`
              )
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Advance"}
          </Button>
        </div>

      </form>
    </CardContent>
  </Card>
</div>


);
}
