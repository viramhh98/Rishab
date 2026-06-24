import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  HandCoins,
  FileText,
} from "lucide-react";

import { employeeAdvanceService } from "../services/employeeAdvance.service";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Badge } from "../components/ui/badge";

import { Card, CardContent } from "../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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

export default function EmployeeAdvanceListPage() {
  const navigate = useNavigate();

  const [advances, setAdvances] = useState([]);

  const [loading, setLoading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedAdvance, setSelectedAdvance] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    deductionStatus: "ALL",
  });

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchAdvances = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 10,
      };

      if (filters.search.trim()) {
        params.search = filters.search;
      }

      if (filters.deductionStatus !== "ALL") {
        params.deductionStatus = filters.deductionStatus;
      }

      const response = await employeeAdvanceService.getAll(params);

      setAdvances(response.data || []);

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
    const timer = setTimeout(() => {
      fetchAdvances();
    }, 400);

    return () => clearTimeout(timer);
  }, [page, filters.search, filters.deductionStatus]);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await employeeAdvanceService.delete(selectedAdvance.id);

      handleSuccess("Employee advance deleted successfully");

      setDeleteOpen(false);

      setSelectedAdvance(null);

      fetchAdvances();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {" "}
      <section className="rounded-2xl border bg-card p-8">
        {" "}
        <div className="flex items-start gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            {" "}
            <ArrowLeft className="h-4 w-4" />{" "}
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Employee Advances</h1>

            <p className="mt-2 text-muted-foreground">
              Manage employee advances and salary advance records.
            </p>
          </div>
        </div>
      </section>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grid w-full gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  className="pl-9"
                  placeholder="Search employee name, code or phone..."
                  value={filters.search}
                  onChange={(e) => {
                    setPage(1);

                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }));
                  }}
                />
              </div>

              <Select
                value={filters.deductionStatus}
                onValueChange={(value) => {
                  setPage(1);

                  setFilters((prev) => ({
                    ...prev,
                    deductionStatus: value,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>

                  <SelectItem value="PENDING">Pending</SelectItem>

                  <SelectItem value="DEDUCTED">Deducted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => navigate("/employee-advances/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Advance
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 text-center">Loading employee advances...</div>
          ) : advances.length === 0 ? (
            <div className="flex flex-col items-center gap-4 p-10">
              <HandCoins className="h-12 w-12 text-muted-foreground" />

              <p className="text-muted-foreground">
                No employee advances found
              </p>

              <Button onClick={() => navigate("/employee-advances/create")}>
                Create Advance
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>

                  <TableHead>Employee Code</TableHead>

                  <TableHead>Phone</TableHead>

                  <TableHead>Advance Date</TableHead>

                  <TableHead>Amount</TableHead>

                  <TableHead>Payment Method</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Given By</TableHead>

                  <TableHead>Documents</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {advances.map((advance, index) => (
                  <TableRow
                    key={advance.id}
                    className={index % 2 === 0 ? "" : "bg-muted/50"}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {advance.employee?.firstName}{" "}
                          {advance.employee?.lastName}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>{advance.employee?.employeeCode}</TableCell>

                    <TableCell>{advance.employee?.phone}</TableCell>

                    <TableCell>
                      {new Date(advance.advanceDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      ₹{Number(advance.amount).toLocaleString()}
                    </TableCell>

                    <TableCell>{advance.paymentMethod?.name}</TableCell>

                    <TableCell>
                      {advance.deductionStatus === "DEDUCTED" ? (
                        <Badge>Deducted</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>

                    <TableCell>{advance.givenBy?.username}</TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/employees/${advance.employeeId}/documents`)
                        }
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(`/employee-advances/${advance.id}`)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          disabled={advance.deductionStatus === "DEDUCTED"}
                          onClick={() =>
                            navigate(`/employee-advances/edit/${advance.id}`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={advance.deductionStatus === "DEDUCTED"}
                          onClick={() => {
                            setSelectedAdvance(advance);

                            setDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {pagination.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>

            {Array.from(
              {
                length: pagination.totalPages,
              },
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page < pagination.totalPages && setPage(page + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee Advance?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction disabled={deleting} onClick={handleDelete}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
