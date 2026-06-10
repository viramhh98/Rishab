import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Truck,
} from "lucide-react";

import { vehicleService } from "../services/vehicle.services";

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

export default function Vehicles() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] =
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

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const fetchVehicles =
    async () => {
      try {
        setLoading(true);

        const response =
          await vehicleService.getAll({
            page,
            limit: 10,
            search,
          });

        setVehicles(
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
        fetchVehicles();
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [page, search]);

  const handleDelete =
    async () => {
      try {
        await vehicleService.delete(
          selectedVehicle.id,
        );

        handleSuccess(
          "Vehicle deleted successfully",
        );

        setDeleteOpen(false);
        setSelectedVehicle(null);

        fetchVehicles();
      } catch (error) {
        handleApiError(error);
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
                "/settings/master-data",
              )
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              Vehicle Management
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage fleet vehicles
              used across the
              organization.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Vehicles
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {pagination.total}
              </h2>
            </div>

            <div className="rounded-2xl border p-4">
              <Truck className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

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
                placeholder="Search vehicle number, name, type ..."
              />
            </div>

            <Button
              onClick={() =>
                navigate(
                  "/settings/master-data/vehicles/create",
                )
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 text-center">
              Loading vehicles...
            </div>
          ) : vehicles.length ===
            0 ? (
            <div className="flex flex-col items-center gap-4 p-10">
              <Truck className="h-12 w-12 text-muted-foreground" />

              <p className="text-muted-foreground">
                No vehicles found
              </p>

              <Button
                onClick={() =>
                  navigate(
                    "/settings/master-data/vehicles/create",
                  )
                }
              >
                Create Vehicle
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Vehicle No
                  </TableHead>

                  <TableHead>
                    Vehicle Name
                  </TableHead>

                  <TableHead>
                    Type
                  </TableHead>

                  <TableHead>
                    Registration No
                  </TableHead>

                  <TableHead>
                    Seats
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
               {vehicles.map(
  (vehicle, index) => (
    <TableRow
      key={vehicle.id}
      className={
  index % 2 === 0
    ? ""
    : "bg-muted/40"
}
    >
                      <TableCell className="font-medium">
                        {
                          vehicle.vehicleNumber
                        }
                      </TableCell>

                      <TableCell>
                        {vehicle.vehicleName ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        {vehicle.vehicleType ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        {vehicle.registrationNo ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        {vehicle.seatingCapacity ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            vehicle.isActive
                              ? "default"
                              : "secondary"
                          }
                        >
                          {vehicle.isActive
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/settings/master-data/vehicles/${vehicle.id}/edit`,
                              )
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedVehicle(
                                vehicle,
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
              Delete Vehicle?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot
            be undone.
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