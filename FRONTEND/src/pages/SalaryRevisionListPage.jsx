// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { salaryRevisionService } from "@/services/salaryRevision.service";

// export default function SalaryRevisionListPage() {
//   const navigate = useNavigate();
//   const { employeeId } = useParams();

//   const [salaryRevisions, setSalaryRevisions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadSalaryRevisions = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response =
//         await salaryRevisionService.getByEmployee(
//           employeeId,
//         );

//       setSalaryRevisions(response.data || []);
//     } catch (error) {
//       console.error(error);

//       setError(
//         error?.response?.data?.message ||
//           "Failed to load salary revisions",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadSalaryRevisions();
//   }, [employeeId]);

//   const formatCurrency = (amount) => {
//     return Number(amount || 0).toLocaleString(
//       "en-IN",
//       {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//       },
//     );
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       },
//     );
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         <Card>
//           <CardContent className="py-10 text-center">
//             Loading salary revisions...
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <Card>
//           <CardContent className="py-10 text-center text-red-500">
//             {error}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Salary Revisions
//           </h1>

//           <p className="text-muted-foreground text-sm">
//             Employee Salary Revision History
//           </p>
//         </div>

//         <Button
//           onClick={() =>
//             navigate(
//               `/salary-revision/create/${employeeId}`,
//             )
//           }
//         >
//           New Salary Revision
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Salary Revision Records
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {salaryRevisions.length === 0 ? (
//             <div className="text-muted-foreground py-10 text-center">
//               No salary revisions found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[900px]">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="px-4 py-3 text-left">
//                       Effective Date
//                     </th>

//                     <th className="px-4 py-3 text-right">
//                       Previous Salary
//                     </th>

//                     <th className="px-4 py-3 text-right">
//                       Revised Salary
//                     </th>

//                     <th className="px-4 py-3 text-right">
//                       Difference
//                     </th>

//                     <th className="px-4 py-3 text-left">
//                       Reason
//                     </th>

//                     <th className="px-4 py-3 text-center">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {salaryRevisions.map(
//                     (revision, index) => {
//                       const difference =
//                         Number(
//                           revision.revisedSalary,
//                         ) -
//                         Number(
//                           revision.previousSalary,
//                         );

//                       return (
//                         <tr
//                           key={revision.id}
//                           className={`border-b transition-colors hover:bg-muted/50 ${
//                             index % 2 === 0
//                               ? "bg-background"
//                               : "bg-muted/20"
//                           }`}
//                         >
//                           <td className="px-4 py-3">
//                             {formatDate(
//                               revision.effectiveFrom,
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-right">
//                             {formatCurrency(
//                               revision.previousSalary,
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-right font-medium">
//                             {formatCurrency(
//                               revision.revisedSalary,
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-right text-green-600">
//                             {formatCurrency(
//                               difference,
//                             )}
//                           </td>

//                           <td className="px-4 py-3">
//                             {revision.revisionReason ||
//                               "-"}
//                           </td>

//                           <td className="px-4 py-3 text-center">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 navigate(
//                                   `/salary-revision/detail/${revision.id}`,
//                                 )
//                               }
//                             >
//                               View
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     },
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { salaryRevisionService } from "@/services/salaryRevision.service";
import imageService from "../services/image.services";

export default function SalaryRevisionListPage() {
  const navigate = useNavigate();

  const { employeeId } = useParams();

  const [salaryRevisions, setSalaryRevisions] = useState([]);

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadSalaryRevisions = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await salaryRevisionService.getByEmployee(
          employeeId,
        );

      setSalaryRevisions(
        response.data?.salaryRevisions || [],
      );

      setEmployee(
        response.data?.employee || null,
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load salary revisions",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalaryRevisions();
  }, [employeeId]);

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      },
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center">
            Loading salary revisions...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-10 text-center text-red-500">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Salary Revisions
          </h1>

          <p className="text-muted-foreground text-sm">
            Employee Salary Revision History
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(
              `/salary-revision/create/${employeeId}`,
            )
          }
        >
          New Salary Revision
        </Button>
      </div>

      {employee && (
        <Card>
          <CardHeader>
            <CardTitle>
              Employee Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center text-2xl">
              <div className="h-24 w-24 overflow-hidden rounded-full border">
                {employee.profilePhoto ? (
                  <img
                    src={imageService.getFileUrl(
                      employee.profilePhoto,
                    )}
                    alt={`${employee.firstName} ${employee.lastName || ""}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    N/A
                  </div>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <span className="font-medium">
                    Employee Code:
                  </span>{" "}
                  {employee.employeeCode}
                </div>

                <div>
                  <span className="font-medium">
                    Name:
                  </span>{" "}
                  {employee.firstName}{" "}
                  {employee.lastName || ""}
                </div>

                <div>
                  <span className="font-medium">
                    Phone:
                  </span>{" "}
                  {employee.phone || "-"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            Salary Revision Records
          </CardTitle>
        </CardHeader>

        <CardContent>
          {salaryRevisions.length === 0 ? (
            <div className="text-muted-foreground py-10 text-center">
              No salary revisions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">
                      Effective Date
                    </th>

                    <th className="px-4 py-3 text-right">
                      Previous Salary
                    </th>

                    <th className="px-4 py-3 text-right">
                      Revised Salary
                    </th>

                    <th className="px-4 py-3 text-right">
                      Difference
                    </th>

                    <th className="px-4 py-3 text-left">
                      Reason
                    </th>

                    <th className="px-4 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {salaryRevisions.map(
                    (revision, index) => {
                      const difference =
                        Number(
                          revision.revisedSalary,
                        ) -
                        Number(
                          revision.previousSalary,
                        );

                      return (
                        <tr
                          key={revision.id}
                          className={`border-b transition-colors hover:bg-muted/50 ${
                            index % 2 === 0
                              ? "bg-background"
                              : "bg-muted/20"
                          }`}
                        >
                          <td className="px-4 py-3">
                            {formatDate(
                              revision.effectiveFrom,
                            )}
                          </td>

                          <td className="px-4 py-3 text-right">
                            {formatCurrency(
                              revision.previousSalary,
                            )}
                          </td>

                          <td className="px-4 py-3 text-right font-medium">
                            {formatCurrency(
                              revision.revisedSalary,
                            )}
                          </td>

                          <td className="px-4 py-3 text-right text-green-600">
                            {formatCurrency(
                              difference,
                            )}
                          </td>

                          <td className="px-4 py-3">
                            {revision.revisionReason ||
                              "-"}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/salary-revision/detail/${revision.id}`,
                                )
                              }
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

