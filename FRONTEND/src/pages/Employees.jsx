import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Users,
} from "lucide-react";

import { employeeService } from "../services/employee.services";
import imageService from "../services/image.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState({
      page: 1,
      totalPages: 1,
      total: 0,
    });

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const fetchEmployees =
    async () => {
      try {
        setLoading(true);

        const response =
          await employeeService.getAll({
            page,
            limit: 10,
            search,
          });

        setEmployees(
          response.data || [],
        );

        setPagination(
          response.pagination || {
            page: 1,
            totalPages: 1,
            total: 0,
          },
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const timer =
      setTimeout(() => {
        fetchEmployees();
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [page, search]);

  const handleDelete =
    async () => {
      try {
        await employeeService.delete(
          selectedEmployee.id,
        );

        handleSuccess(
          "Employee deleted successfully",
        );

        setDeleteOpen(false);
        setSelectedEmployee(null);

        fetchEmployees();
      } catch (error) {
        handleApiError(error);
      }
    };

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status === "ACTIVE",
    ).length;

  return (
    <div className="space-y-6">

      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              navigate("/")
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Employee Management
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage employees,
              employee records and
              workforce information.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Employees
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {pagination.total}
                </h2>
              </div>

              <div className="rounded-2xl border p-4">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Employees
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {activeEmployees}
                </h2>
              </div>

              <div className="rounded-2xl border p-4">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(
                    e.target.value,
                  );
                }}
                className="pl-9"
                placeholder="Search employees..."
              />
            </div>

            <Button
              onClick={() =>
                navigate(
                  "/employees/create",
                )
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>

          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 text-center">
              Loading employees...
            </div>
          ) : employees.length ===
            0 ? (
            <div className="flex flex-col items-center gap-4 p-10">

              <Users className="h-12 w-12 text-muted-foreground" />

              <p className="text-muted-foreground">
                No employees found
              </p>

              <Button
                onClick={() =>
                  navigate(
                    "/employees/create",
                  )
                }
              >
                Create Employee
              </Button>

            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Employee
                  </TableHead>

                  <TableHead>
                    Employee Code
                  </TableHead>

                  <TableHead>
                    Company
                  </TableHead>

                  <TableHead>
                    Department
                  </TableHead>

                  <TableHead>
                    Designation
                  </TableHead>

                  <TableHead>
                    Phone
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {employees.map(
                  (
                    employee,
                    index,
                  ) => (
                    <TableRow
                      key={
                        employee.id
                      }
                      className={
                        index % 2 ===
                        0
                          ? ""
                          : "bg-muted/50"
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {employee.profilePhoto ? (
                            <img
                              src={imageService.getImageUrl(
                                employee.profilePhoto,
                              )}
                              alt={
                                employee.firstName
                              }
                              className="h-10 w-10 rounded-full border object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                              {employee.firstName?.charAt(
                                0,
                              )}
                            </div>
                          )}

                          <div>
                            <p className="font-medium">
                              {
                                employee.firstName
                              }{" "}
                              {
                                employee.lastName
                              }
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {
                                employee.email
                              }
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {
                          employee.employeeCode
                        }
                      </TableCell>

                      <TableCell>
                        {employee
                          .company
                          ?.companyName ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        {employee
                          .department
                          ?.name || "-"}
                      </TableCell>

                      <TableCell>
                        {employee
                          .designation
                          ?.name || "-"}
                      </TableCell>

                      <TableCell>
                        {employee.phone ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            employee.status ===
                            "ACTIVE"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {
                            employee.status
                          }
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/employees/${employee.id}`,
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>

                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/employees/${employee.id}/edit`,
                              )
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedEmployee(
                                employee,
                              );

                              setDeleteOpen(
                                true,
                              );
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>

                        </div>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {pagination.totalPages >
        1 && (
        <Pagination>
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  page > 1 &&
                  setPage(
                    page - 1,
                  )
                }
              />
            </PaginationItem>

            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) => (
                <PaginationItem
                  key={index}
                >
                  <PaginationLink
                    isActive={
                      page ===
                      index + 1
                    }
                    onClick={() =>
                      setPage(
                        index + 1,
                      )
                    }
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page <
                    pagination.totalPages &&
                  setPage(
                    page + 1,
                  )
                }
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      )}

      <AlertDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Employee?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-sm text-muted-foreground">
            This action will
            deactivate the employee.
          </p>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                handleDelete
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}