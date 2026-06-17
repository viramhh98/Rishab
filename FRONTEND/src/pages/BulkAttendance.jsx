// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   Building2,
//   Calendar,
//   CheckCircle2,
//   Save,
//   Search,
//   Users,
//   XCircle,
//   Clock3,
//   Plane,
// } from "lucide-react";

// import { attendanceService } from "../services/attendance.services";
// import { employeeService } from "../services/employee.services";

// import {
//   handleApiError,
//   handleSuccess,
// } from "../lib/error-handler";

// import { Button } from "../components/ui/button";

// import { Input } from "../components/ui/input";

// import {
//   Card,
//   CardContent,
// } from "../components/ui/card";

// import { Label } from "../components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// import { Badge } from "../components/ui/badge";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../components/ui/alert-dialog";

// export default function BulkAttendance() {
//   const navigate = useNavigate();

//   const [loading, setLoading] =
//     useState(false);

//   const [saving, setSaving] =
//     useState(false);

//   const [masterData, setMasterData] =
//     useState({
//       companies: [],
//       attendanceStatuses: [],
//     });

//   const [employees, setEmployees] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [companyId, setCompanyId] =
//     useState("");

//   const [saveOpen, setSaveOpen] =
//     useState(false);

//   const [attendanceDate, setAttendanceDate] =
//     useState(
//       new Date()
//         .toISOString()
//         .split("T")[0],
//     );

//   const [attendanceData, setAttendanceData] =
//     useState({});

//   const fetchMasterData =
//     async () => {
//       try {
//         const response =
//           await attendanceService.getMasterData();

//         setMasterData(response);
//       } catch (error) {
//         handleApiError(error);
//       }
//     };

//   const fetchEmployees =
//     async () => {
//       if (!companyId) {
//         setEmployees([]);
//         return;
//       }

//       try {
//         setLoading(true);

//         const response =
//           await employeeService.getAll({
//             companyId,
//             all: true,
//             search,
//           });

//         const employees =
//           response.data || [];

//         setEmployees(employees);

//         const initialAttendance =
//           {};

//         employees.forEach(
//           (employee) => {
//             initialAttendance[
//               employee.id
//             ] = {
//               employeeId:
//                 employee.id,

//               status:
//                 "PRESENT",

//               overtimeHours: 0,

//               remarks: "",
//             };
//           },
//         );

//         setAttendanceData(
//           initialAttendance,
//         );
//       } catch (error) {
//         handleApiError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchMasterData();
//   }, []);

//   useEffect(() => {
//     const timer =
//       setTimeout(() => {
//         fetchEmployees();
//       }, 400);

//     return () =>
//       clearTimeout(timer);
//   }, [companyId, search]);

//   const updateAttendance =
//     (
//       employeeId,
//       field,
//       value,
//     ) => {
//       setAttendanceData(
//         (prev) => ({
//           ...prev,

//           [employeeId]: {
//             ...prev[
//               employeeId
//             ],

//             [field]: value,
//           },
//         }),
//       );
//     };

//   const markAllStatus =
//     (status) => {
//       const updated = {};

//       employees.forEach(
//         (employee) => {
//           updated[
//             employee.id
//           ] = {
//             ...attendanceData[
//               employee.id
//             ],

//             status,
//           };
//         },
//       );

//       setAttendanceData(updated);
//     };

//   const handleSave =
//     async () => {
//       try {
//         setSaving(true);

//         const payload = {
//           attendances:
//             Object.values(
//               attendanceData,
//             ).map(
//               (attendance) => ({
//                 employeeId:
//                   attendance.employeeId,

//                 date:
//                   attendanceDate,

//                 status:
//                   attendance.status,

//                 overtimeHours:
//                   Number(
//                     attendance.overtimeHours ||
//                       0,
//                   ),

//                 remarks:
//                   attendance.remarks,
//               }),
//             ),
//         };

//         await attendanceService.bulkCreate(
//           payload,
//         );

//         handleSuccess(
//           "Attendance saved successfully",
//         );

//         setSaveOpen(false);
//       } catch (error) {
//         handleApiError(error);
//       } finally {
//         setSaving(false);
//       }
//     };

//   const statistics =
//     useMemo(() => {
//       let present = 0;
//       let absent = 0;
//       let halfDay = 0;
//       let leave = 0;
//       let holiday = 0;

//       Object.values(
//         attendanceData,
//       ).forEach(
//         (attendance) => {
//           switch (
//             attendance.status
//           ) {
//             case "PRESENT":
//               present++;
//               break;

//             case "ABSENT":
//               absent++;
//               break;

//             case "HALF_DAY":
//               halfDay++;
//               break;

//             case "LEAVE":
//               leave++;
//               break;

//             case "HOLIDAY":
//               holiday++;
//               break;
//           }
//         },
//       );

//       return {
//         present,
//         absent,
//         halfDay,
//         leave,
//         holiday,
//       };
//     }, [attendanceData]);

//   return (
//     <div className="space-y-6">

//       <section className="rounded-2xl border bg-card p-8">

//         <div className="flex items-start gap-4">

//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() =>
//               navigate("/attendance")
//             }
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>

//           <div>

//             <h1 className="text-3xl font-bold">
//               Bulk Attendance
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               Mark attendance company wise.
//             </p>

//           </div>

//         </div>

//       </section>

//       <div className="grid gap-4 md:grid-cols-5">

//         <Card>
//           <CardContent className="p-5">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-muted-foreground">
//                   Present
//                 </p>

//                 <h2 className="text-3xl font-bold">
//                   {
//                     statistics.present
//                   }
//                 </h2>

//               </div>

//               <CheckCircle2 className="h-8 w-8" />

//             </div>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-muted-foreground">
//                   Absent
//                 </p>

//                 <h2 className="text-3xl font-bold">
//                   {
//                     statistics.absent
//                   }
//                 </h2>

//               </div>

//               <XCircle className="h-8 w-8" />

//             </div>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-muted-foreground">
//                   Half Day
//                 </p>

//                 <h2 className="text-3xl font-bold">
//                   {
//                     statistics.halfDay
//                   }
//                 </h2>

//               </div>

//               <Clock3 className="h-8 w-8" />

//             </div>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-muted-foreground">
//                   Leave
//                 </p>

//                 <h2 className="text-3xl font-bold">
//                   {
//                     statistics.leave
//                   }
//                 </h2>

//               </div>

//               <Plane className="h-8 w-8" />

//             </div>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-muted-foreground">
//                   Employees
//                 </p>

//                 <h2 className="text-3xl font-bold">
//                   {employees.length}
//                 </h2>

//               </div>

//               <Users className="h-8 w-8" />

//             </div>

//           </CardContent>
//         </Card>

//       </div>

//       <Card>

//         <CardContent className="p-6">

//           <div className="grid gap-4 md:grid-cols-3">

//             <div>

//               <Label>
//                 Company
//               </Label>

//               <Select
//                 value={companyId}
//                 onValueChange={
//                   setCompanyId
//                 }
//               >

//                 <SelectTrigger>

//                   <SelectValue placeholder="Select Company" />

//                 </SelectTrigger>

//                 <SelectContent>

//                   {masterData.companies?.map(
//                     (company) => (
//                       <SelectItem
//                         key={
//                           company.id
//                         }
//                         value={String(
//                           company.id,
//                         )}
//                       >
//                         {
//                           company.companyName
//                         }
//                       </SelectItem>
//                     ),
//                   )}

//                 </SelectContent>

//               </Select>

//             </div>

//             <div>

//               <Label>
//                 Attendance Date
//               </Label>

//               <Input
//                 type="date"
//                 value={
//                   attendanceDate
//                 }
//                 onChange={(e) =>
//                   setAttendanceDate(
//                     e.target.value,
//                   )
//                 }
//               />

//             </div>

//             <div>

//               <Label>
//                 Search Employee
//               </Label>

//               <div className="relative">

//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

//                 <Input
//                   className="pl-9"
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(
//                       e.target.value,
//                     )
//                   }
//                   placeholder="Search employee..."
//                 />

//               </div>

//             </div>

//           </div>

//                     <div className="mt-6 flex flex-wrap gap-2">

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "PRESENT",
//                 )
//               }
//             >
//               Mark All Present
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "ABSENT",
//                 )
//               }
//             >
//               Mark All Absent
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "HALF_DAY",
//                 )
//               }
//             >
//               Mark All Half Day
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "LEAVE",
//                 )
//               }
//             >
//               Mark All Leave
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "HOLIDAY",
//                 )
//               }
//             >
//               Mark All Holiday
//             </Button>

//           </div>

//         </CardContent>

//       </Card>

//       {!companyId ? (

//         <Card>

//           <CardContent className="p-12 text-center">

//             <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

//             <h3 className="text-lg font-semibold">
//               Select Company
//             </h3>

//             <p className="text-muted-foreground">
//               Choose a company to load employees.
//             </p>

//           </CardContent>

//         </Card>

//       ) : loading ? (

//         <Card>

//           <CardContent className="p-12 text-center">
//             Loading employees...
//           </CardContent>

//         </Card>

//       ) : employees.length === 0 ? (

//         <Card>

//           <CardContent className="p-12 text-center">

//             <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

//             <h3 className="text-lg font-semibold">
//               No Employees Found
//             </h3>

//             <p className="text-muted-foreground">
//               No employees available for this company.
//             </p>

//           </CardContent>

//         </Card>

//       ) : (

//         <Card>

//           <CardContent className="p-0 overflow-x-auto">

//             <table className="w-full">

//               <thead>

//                 <tr className="border-b bg-muted/50">

//                   <th className="p-4 text-left">
//                     Employee
//                   </th>

//                   <th className="p-4 text-left">
//                     Code
//                   </th>

//                   <th className="p-4 text-left">
//                     Status
//                   </th>

//                   <th className="p-4 text-left">
//                     Overtime
//                   </th>

//                   <th className="p-4 text-left">
//                     Remarks
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {employees.map(
//                   (
//                     employee,
//                     index,
//                   ) => (
//                     <tr
//                       key={
//                         employee.id
//                       }
//                       className={
//                         index % 2 === 0
//                           ? ""
//                           : "bg-muted/40"
//                       }
//                     >

//                       <td className="p-4">

//                         <div>

//                           <p className="font-medium">
//                             {
//                               employee.firstName
//                             }{" "}
//                             {
//                               employee.lastName
//                             }
//                           </p>

//                           <p className="text-xs text-muted-foreground">
//                             {
//                               employee.email
//                             }
//                           </p>

//                         </div>

//                       </td>

//                       <td className="p-4">
//                         {
//                           employee.employeeCode
//                         }
//                       </td>

//                       <td className="p-4">

//                         <Select
//                           value={
//                             attendanceData[
//                               employee.id
//                             ]
//                               ?.status
//                           }
//                           onValueChange={(
//                             value,
//                           ) =>
//                             updateAttendance(
//                               employee.id,
//                               "status",
//                               value,
//                             )
//                           }
//                         >

//                           <SelectTrigger className="w-[170px]">

//                             <SelectValue />

//                           </SelectTrigger>

//                           <SelectContent>

//                             <SelectItem value="PRESENT">
//                               Present
//                             </SelectItem>

//                             <SelectItem value="ABSENT">
//                               Absent
//                             </SelectItem>

//                             <SelectItem value="HALF_DAY">
//                               Half Day
//                             </SelectItem>

//                             <SelectItem value="LEAVE">
//                               Leave
//                             </SelectItem>

//                             <SelectItem value="HOLIDAY">
//                               Holiday
//                             </SelectItem>

//                           </SelectContent>

//                         </Select>

//                       </td>

//                       <td className="p-4">

//                         <Input
//                           type="number"
//                           min="0"
//                           step="0.5"
//                           value={
//                             attendanceData[
//                               employee.id
//                             ]
//                               ?.overtimeHours
//                           }
//                           onChange={(
//                             e,
//                           ) =>
//                             updateAttendance(
//                               employee.id,
//                               "overtimeHours",
//                               e.target
//                                 .value,
//                             )
//                           }
//                         />

//                       </td>

//                       <td className="p-4">

//                         <Input
//                           value={
//                             attendanceData[
//                               employee.id
//                             ]?.remarks
//                           }
//                           onChange={(
//                             e,
//                           ) =>
//                             updateAttendance(
//                               employee.id,
//                               "remarks",
//                               e.target
//                                 .value,
//                             )
//                           }
//                           placeholder="Remarks"
//                         />

//                       </td>

//                     </tr>
//                   ),
//                 )}

//               </tbody>

//             </table>

//           </CardContent>

//         </Card>

//       )}

//       {employees.length > 0 && (

//         <div className="flex justify-end">

//           <Button
//             size="lg"
//             onClick={() =>
//               setSaveOpen(
//                 true,
//               )
//             }
//           >

//             <Save className="mr-2 h-4 w-4" />

//             Save Attendance

//           </Button>

//         </div>

//       )}

//       <AlertDialog
//         open={saveOpen}
//         onOpenChange={
//           setSaveOpen
//         }
//       >

//         <AlertDialogContent>

//           <AlertDialogHeader>

//             <AlertDialogTitle>
//               Save Attendance?
//             </AlertDialogTitle>

//           </AlertDialogHeader>

//           <p className="text-sm text-muted-foreground">
//             Attendance will be saved for{" "}
//             {
//               employees.length
//             }{" "}
//             employees.
//           </p>

//           <AlertDialogFooter>

//             <AlertDialogCancel>
//               Cancel
//             </AlertDialogCancel>

//             <AlertDialogAction
//               disabled={
//                 saving
//               }
//               onClick={
//                 handleSave
//               }
//             >
//               {saving
//                 ? "Saving..."
//                 : "Save"}
//             </AlertDialogAction>

//           </AlertDialogFooter>

//         </AlertDialogContent>

//       </AlertDialog>

//     </div>
//   );
// }

















































// import { useEffect, useMemo, useState } from "react";

// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   AlertTriangle,
//   Building2,
//   Bus,
//   Search,
// } from "lucide-react";

// import { attendanceService } from "../services/attendance.services";

// import { employeeService } from "../services/employee.services";

// import {
//   handleApiError,
//   handleSuccess,
// } from "../lib/error-handler";

// import { Button } from "../components/ui/button";

// import { Input } from "../components/ui/input";

// import {
//   Card,
//   CardContent,
// } from "../components/ui/card";

// import { Label } from "../components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../components/ui/popover";

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "../components/ui/command";

// export default function BulkAttendance() {
//   const navigate = useNavigate();

//   const [loading, setLoading] =
//     useState(false);

//   const [saving, setSaving] =
//     useState(false);

//   const [masterData, setMasterData] =
//     useState({
//       companies: [],
//       vehicles: [],
//       attendanceStatuses: [],
//     });

//   const [employees, setEmployees] =
//     useState([]);

//   const [companyId, setCompanyId] =
//     useState("");

//   const [vehicleId, setVehicleId] =
//     useState("");

//   const [vehicleOpen, setVehicleOpen] =
//     useState(false);

//   const [attendanceData, setAttendanceData] =
//     useState({});

//   const [search, setSearch] =
//     useState("");

//   const [attendanceDate, setAttendanceDate] =
//     useState(
//       new Date()
//         .toISOString()
//         .split("T")[0],
//     );

//   const fetchMasterData =
//     async () => {
//       try {

//         const response =
//           await attendanceService.getMasterData();

//         setMasterData(response);

//       } catch (error) {

//         handleApiError(error);

//       }
//     };

//   useEffect(() => {
//     fetchMasterData();
//   }, []);

//   const selectedVehicle =
//     masterData.vehicles?.find(
//       (vehicle) =>
//         String(vehicle.id) ===
//         vehicleId,
//     );

//   const filteredVehicles =
//     masterData.vehicles || [];
//       const fetchEmployees =
//     async () => {

//       if (!companyId) {
//         setEmployees([]);
//         return;
//       }

//       try {

//         setLoading(true);

//         const response =
//           await employeeService.getAll({
//             companyId,
//             all: true,
//             search,
//           });

//         const employeeList =
//           response.data || [];

//         setEmployees(employeeList);

//         const initialData = {};

//         employeeList.forEach(
//           (employee) => {

//             initialData[
//               employee.id
//             ] = {

//               employeeId:
//                 employee.id,

//               vehicleId:
//                 vehicleId
//                   ? Number(
//                       vehicleId,
//                     )
//                   : null,

//               status:
//                 "PRESENT",

//               overtimeHours: 0,

//               remarks: "",
//             };

//           },
//         );

//         setAttendanceData(
//           initialData,
//         );

//       } catch (error) {

//         handleApiError(error);

//       } finally {

//         setLoading(false);

//       }

//     };

//   useEffect(() => {

//     const timer =
//       setTimeout(() => {

//         fetchEmployees();

//       }, 300);

//     return () =>
//       clearTimeout(timer);

//   }, [
//     companyId,
//     search,
//   ]);

//   useEffect(() => {

//     if (
//       filteredVehicles.length === 1
//     ) {

//       setVehicleId(
//         String(
//           filteredVehicles[0].id,
//         ),
//       );

//     }

//   }, [filteredVehicles]);

//   const updateAttendance =
//     (
//       employeeId,
//       field,
//       value,
//     ) => {

//       setAttendanceData(
//         (prev) => ({

//           ...prev,

//           [employeeId]: {

//             ...prev[
//               employeeId
//             ],

//             [field]: value,
//           },
//         }),
//       );

//     };

//   const markAllStatus =
//     (status) => {

//       const updated = {
//         ...attendanceData,
//       };

//       employees.forEach(
//         (employee) => {

//           updated[
//             employee.id
//           ] = {

//             ...updated[
//               employee.id
//             ],

//             status,
//           };

//         },
//       );

//       setAttendanceData(
//         updated,
//       );

//     };

//   const statistics =
//     useMemo(() => {

//       let present = 0;
//       let absent = 0;
//       let halfDay = 0;
//       let leave = 0;
//       let holiday = 0;

//       Object.values(
//         attendanceData,
//       ).forEach(
//         (attendance) => {

//           switch (
//             attendance.status
//           ) {

//             case "PRESENT":
//               present++;
//               break;

//             case "ABSENT":
//               absent++;
//               break;

//             case "HALF_DAY":
//               halfDay++;
//               break;

//             case "LEAVE":
//               leave++;
//               break;

//             case "HOLIDAY":
//               holiday++;
//               break;

//           }

//         },
//       );

//       return {
//         present,
//         absent,
//         halfDay,
//         leave,
//         holiday,
//       };

//     }, [attendanceData]);
//       useEffect(() => {

//     const handleKeyDown = (
//       event,
//     ) => {

//       if (
//         event.ctrlKey &&
//         event.key === "s"
//       ) {

//         event.preventDefault();

//         if (
//           employees.length > 0
//         ) {
//           setSaveOpen(
//             true,
//           );
//         }

//       }

//     };

//     window.addEventListener(
//       "keydown",
//       handleKeyDown,
//     );

//     return () =>
//       window.removeEventListener(
//         "keydown",
//         handleKeyDown,
//       );

//   }, [employees]);
//     const [saveOpen, setSaveOpen] =
//     useState(false);
//       const handleSave =
//     async () => {

//       try {

//         setSaving(true);

//         const payload = {

//           attendances:
//             Object.values(
//               attendanceData,
//             ).map(
//               (attendance) => ({

//                 employeeId:
//                   attendance.employeeId,

//                 vehicleId:
//                   vehicleId
//                     ? Number(
//                         vehicleId,
//                       )
//                     : null,

//                 date:
//                   attendanceDate,

//                 status:
//                   attendance.status,

//                 overtimeHours:
//                   Number(
//                     attendance.overtimeHours ||
//                       0,
//                   ),

//                 remarks:
//                   attendance.remarks,
//               }),
//             ),
//         };

//         await attendanceService.bulkCreate(
//           payload,
//         );

//         handleSuccess(
//           "Attendance saved successfully",
//         );

//         setSaveOpen(
//           false,
//         );

//       } catch (error) {

//         handleApiError(error);

//       } finally {

//         setSaving(false);

//       }

//     };
//       return (
//     <div className="space-y-6">

//       <section className="rounded-2xl border bg-card p-8">

//         <div className="flex items-start gap-4">

//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() =>
//               navigate("/attendance")
//             }
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>

//           <div>

//             <h1 className="text-3xl font-bold">
//               Bulk Attendance
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               Mark attendance company wise.
//             </p>

//           </div>

//         </div>

//       </section>

//       <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-950/20">

//         <CardContent className="p-6">

//           <div className="flex gap-4">

//             <AlertTriangle className="h-10 w-10 text-red-600" />

//             <div>

//               <h2 className="text-lg font-bold text-red-600">
//                 ATTENTION
//               </h2>

//               <p className="mt-2 font-medium">
//                 You are marking attendance for:
//               </p>

//               <p className="text-2xl font-bold text-red-600">
//                 {attendanceDate}
//               </p>

//               <p className="mt-2 text-sm">
//                 Verify the attendance date before
//                 saving. This will affect payroll.
//               </p>

//             </div>

//           </div>

//         </CardContent>

//       </Card>

//       <Card>

//         <CardContent className="p-6">

//           <div className="grid gap-4 md:grid-cols-4">

//             <div>

//               <Label>
//                 Company
//               </Label>

//               <Select
//                 value={companyId}
//                 onValueChange={
//                   setCompanyId
//                 }
//               >

//                 <SelectTrigger>

//                   <SelectValue placeholder="Select Company" />

//                 </SelectTrigger>

//                 <SelectContent>

//                   {masterData.companies?.map(
//                     (company) => (
//                       <SelectItem
//                         key={company.id}
//                         value={String(
//                           company.id,
//                         )}
//                       >
//                         {
//                           company.companyName
//                         }
//                       </SelectItem>
//                     ),
//                   )}

//                 </SelectContent>

//               </Select>

//             </div>

//             <div>

//               <Label>
//                 Attendance Date
//               </Label>

//               <Input
//                 type="date"
//                 value={
//                   attendanceDate
//                 }
//                 onChange={(e) =>
//                   setAttendanceDate(
//                     e.target.value,
//                   )
//                 }
//               />

//             </div>

//             <div>

//               <Label>
//                 Search Employee
//               </Label>

//               <Input
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(
//                     e.target.value,
//                   )
//                 }
//                 placeholder="Search employee..."
//               />

//             </div>

//             <div>

//               <Label>
//                 Vehicle
//               </Label>

//               <Popover
//                 open={vehicleOpen}
//                 onOpenChange={
//                   setVehicleOpen
//                 }
//               >

//                 <PopoverTrigger asChild>

//                   <Button
//                     variant="outline"
//                     className="w-full justify-start"
//                   >

//                     <Bus className="mr-2 h-4 w-4" />

//                     {selectedVehicle
//                       ? `${selectedVehicle.vehicleNumber} ${
//                           selectedVehicle.vehicleName || ""
//                         }`
//                       : "Search Vehicle"}

//                   </Button>

//                 </PopoverTrigger>

//                 <PopoverContent className="w-[350px] p-0">

//                   <Command>

//                     <CommandInput placeholder="Type vehicle number..." />

//                     <CommandEmpty>
//                       No vehicle found.
//                     </CommandEmpty>

//                     <CommandGroup>

//                       {filteredVehicles.map(
//                         (vehicle) => (
//                           <CommandItem
//                             key={vehicle.id}
//                             value={`${vehicle.vehicleNumber} ${vehicle.vehicleName || ""}`}
//                             onSelect={() => {

//                               setVehicleId(
//                                 String(
//                                   vehicle.id,
//                                 ),
//                               );

//                               setVehicleOpen(
//                                 false,
//                               );

//                             }}
//                           >

//                             {
//                               vehicle.vehicleNumber
//                             }

//                             {vehicle.vehicleName && (
//                               <span className="ml-2 text-muted-foreground">
//                                 -
//                                 {" "}
//                                 {
//                                   vehicle.vehicleName
//                                 }
//                               </span>
//                             )}

//                           </CommandItem>
//                         ),
//                       )}

//                     </CommandGroup>

//                   </Command>

//                 </PopoverContent>

//               </Popover>

//             </div>

//           </div>

//         </CardContent>

//       </Card>

//       <div className="grid gap-4 md:grid-cols-5">

//         <Card>
//           <CardContent className="p-5">
//             <p className="text-sm text-muted-foreground">
//               Present
//             </p>
//             <h2 className="text-3xl font-bold">
//               {statistics.present}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">
//             <p className="text-sm text-muted-foreground">
//               Absent
//             </p>
//             <h2 className="text-3xl font-bold">
//               {statistics.absent}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">
//             <p className="text-sm text-muted-foreground">
//               Half Day
//             </p>
//             <h2 className="text-3xl font-bold">
//               {statistics.halfDay}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">
//             <p className="text-sm text-muted-foreground">
//               Leave
//             </p>
//             <h2 className="text-3xl font-bold">
//               {statistics.leave}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-5">
//             <p className="text-sm text-muted-foreground">
//               Holiday
//             </p>
//             <h2 className="text-3xl font-bold">
//               {statistics.holiday}
//             </h2>
//           </CardContent>
//         </Card>

//       </div>

//       <Card>

//         <CardContent className="p-6">

//           <div className="flex flex-wrap gap-2">

//             <Button
//               onClick={() =>
//                 markAllStatus(
//                   "PRESENT",
//                 )
//               }
//             >
//               All Present
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "ABSENT",
//                 )
//               }
//             >
//               All Absent
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "HALF_DAY",
//                 )
//               }
//             >
//               All Half Day
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "LEAVE",
//                 )
//               }
//             >
//               All Leave
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() =>
//                 markAllStatus(
//                   "HOLIDAY",
//                 )
//               }
//             >
//               All Holiday
//             </Button>

//           </div>

//         </CardContent>

//       </Card>

//       <Card>

//         <CardContent className="p-0">

//           {!companyId ? (

//             <div className="p-12 text-center">
//               Select company first.
//             </div>

//           ) : loading ? (

//             <div className="p-12 text-center">
//               Loading employees...
//             </div>

//           ) : employees.length === 0 ? (

//             <div className="p-12 text-center">
//               No employees found.
//             </div>

//           ) : (

//             <div className="overflow-x-auto">

//               <table className="w-full">

//                 <thead>

//                   <tr className="border-b bg-muted/50">

//                     <th className="p-4 text-left sticky left-0 bg-background">
//                       Employee
//                     </th>

//                     <th className="p-4 text-center">
//                       P
//                     </th>

//                     <th className="p-4 text-center">
//                       A
//                     </th>

//                     <th className="p-4 text-center">
//                       HD
//                     </th>

//                     <th className="p-4 text-center">
//                       L
//                     </th>

//                     <th className="p-4 text-center">
//                       H
//                     </th>

//                     <th className="p-4">
//                       OT
//                     </th>

//                     <th className="p-4">
//                       Remarks
//                     </th>

//                   </tr>

//                 </thead>

//                 <tbody>

//                   {employees.map(
//                     (
//                       employee,
//                       index,
//                     ) => {

//                       const attendance =
//                         attendanceData[
//                           employee.id
//                         ];

//                       return (

//                         <tr
//                           key={
//                             employee.id
//                           }
//                           className={
//                             index % 2 === 0
//                               ? ""
//                               : "bg-muted/30"
//                           }
//                         >

//                           <td className="p-4 sticky left-0 bg-background">

//                             <div>

//                               <p className="font-medium">
//                                 {
//                                   employee.firstName
//                                 }{" "}
//                                 {
//                                   employee.lastName
//                                 }
//                               </p>

//                               <p className="text-xs text-muted-foreground">
//                                 {
//                                   employee.employeeCode
//                                 }
//                               </p>

//                             </div>

//                           </td>

//                           {[
//                             "PRESENT",
//                             "ABSENT",
//                             "HALF_DAY",
//                             "LEAVE",
//                             "HOLIDAY",
//                           ].map(
//                             (
//                               status,
//                             ) => (

//                               <td
//                                 key={
//                                   status
//                                 }
//                                 className="text-center"
//                               >

//                                 <input
//                                   type="radio"
//                                   name={`attendance-${employee.id}`}
//                                   checked={
//                                     attendance?.status ===
//                                     status
//                                   }
//                                   onChange={() =>
//                                     updateAttendance(
//                                       employee.id,
//                                       "status",
//                                       status,
//                                     )
//                                   }
//                                   className="h-5 w-5"
//                                 />

//                               </td>

//                             ),
//                           )}

//                           <td className="p-2">

//                             <Input
//                               type="number"
//                               min="0"
//                               step="0.5"
//                               value={
//                                 attendance?.overtimeHours
//                               }
//                               onChange={(e) =>
//                                 updateAttendance(
//                                   employee.id,
//                                   "overtimeHours",
//                                   e.target
//                                     .value,
//                                 )
//                               }
//                             />

//                           </td>

//                           <td className="p-2">

//                             <Input
//                               value={
//                                 attendance?.remarks
//                               }
//                               onChange={(e) =>
//                                 updateAttendance(
//                                   employee.id,
//                                   "remarks",
//                                   e.target
//                                     .value,
//                                 )
//                               }
//                               placeholder="Remarks"
//                             />

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

//       {employees.length > 0 && (

//         <div className="flex justify-end">

//           <Button
//             size="lg"
//             onClick={() =>
//               handleSave()
//             }
//             disabled={saving}
//           >

//             {saving
//               ? "Saving..."
//               : "Save Attendance (Ctrl + S)"}

//           </Button>

//         </div>

//       )}

//     </div>
//   );
// }


















































































import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

import { attendanceService } from "../services/attendance.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import { Label } from "../components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

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
} from "../components/ui/command";

export default function BulkAttendance() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [masterData, setMasterData] =
    useState({
      companies: [],
      departments: [],
      vehicles: [],
      attendanceStatuses: [],
    });

  const [employees, setEmployees] =
    useState([]);

  const [attendanceData, setAttendanceData] =
    useState({});

  const [companyId, setCompanyId] =
    useState("");

  const [departmentId, setDepartmentId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [attendanceDate, setAttendanceDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0],
    );

  const loadMasterData =
    async () => {
      try {

        const data =
          await attendanceService.getMasterData();

        setMasterData(data);

      } catch (error) {

        handleApiError(error);

      }
    };

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadAttendanceData =
    async () => {

      if (
        !companyId ||
        !attendanceDate
      ) {
        setEmployees([]);
        return;
      }

      try {

        setLoading(true);

        const response =
          await attendanceService.getBulkData({
            companyId,
            departmentId,
            date: attendanceDate,
            search,
          });

        const rows =
          response.data || [];

        setEmployees(rows);

        const attendanceMap = {};

        rows.forEach(
          (employee) => {

            attendanceMap[
              employee.id
            ] = {

              employeeId:
                employee.id,

              attendanceId:
                employee.attendance?.id ||
                null,

              vehicleId:
                employee.attendance?.vehicleId ||
                "",

              status:
                employee.attendance?.status ||
                "PRESENT",

              overtimeHours:
                employee.attendance?.overtimeHours ||
                0,

              overtimeRemarks:
                employee.attendance?.overtimeRemarks ||
                "",

              remarks:
                employee.attendance?.remarks ||
                "",
            };

          },
        );

        setAttendanceData(
          attendanceMap,
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

        loadAttendanceData();

      }, 300);

    return () =>
      clearTimeout(timer);

  }, [
    companyId,
    departmentId,
    attendanceDate,
    search,
  ]);

  const updateAttendance =
    (
      employeeId,
      field,
      value,
    ) => {

      setAttendanceData(
        (prev) => ({
          ...prev,

          [employeeId]: {
            ...prev[
              employeeId
            ],

            [field]: value,
          },
        }),
      );

    };

  const updateAllStatus =
    (status) => {

      const updated = {
        ...attendanceData,
      };

      employees.forEach(
        (employee) => {

          updated[
            employee.id
          ] = {

            ...updated[
              employee.id
            ],

            status,
          };

        },
      );

      setAttendanceData(
        updated,
      );

    };

  const statistics =
    useMemo(() => {

      let present = 0;
      let absent = 0;
      let halfDay = 0;
      let leave = 0;
      let holiday = 0;

      Object.values(
        attendanceData,
      ).forEach(
        (attendance) => {

          switch (
            attendance.status
          ) {

            case "PRESENT":
              present++;
              break;

            case "ABSENT":
              absent++;
              break;

            case "HALF_DAY":
              halfDay++;
              break;

            case "LEAVE":
              leave++;
              break;

            case "HOLIDAY":
              holiday++;
              break;

          }

        },
      );

      return {
        present,
        absent,
        halfDay,
        leave,
        holiday,
      };

    }, [attendanceData]);

  const handleSave =
    async () => {

      try {

        setSaving(true);

        const payload = {

          attendances:
            Object.values(
              attendanceData,
            ).map(
              (attendance) => ({

                employeeId:
                  attendance.employeeId,

                vehicleId:
                  attendance.vehicleId
                    ? Number(
                        attendance.vehicleId,
                      )
                    : null,

                date:
                  attendanceDate,

                status:
                  attendance.status,

                overtimeHours:
                  Number(
                    attendance.overtimeHours ||
                      0,
                  ),

                overtimeRemarks:
                  attendance.overtimeRemarks,

                remarks:
                  attendance.remarks,
              }),
            ),
        };

        await attendanceService.saveBulk(
          payload,
        );

        handleSuccess(
          "Attendance saved successfully",
        );

        await loadAttendanceData();

      } catch (error) {

        handleApiError(error);

      } finally {

        setSaving(false);

      }

    };

  useEffect(() => {

    const handleKeyDown =
      (event) => {

        if (
          event.ctrlKey &&
          event.key === "s"
        ) {

          event.preventDefault();

          handleSave();

        }

      };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

  }, [
    attendanceData,
    attendanceDate,
  ]);

  return (
    <div className="space-y-6">

      <section className="rounded-2xl border bg-card p-8">

        <div className="flex items-start gap-4">

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              navigate("/attendance")
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>

            <h1 className="text-3xl font-bold">
              Bulk Attendance
            </h1>

            <p className="mt-2 text-muted-foreground">
              Create and update attendance.
            </p>

          </div>

        </div>

      </section>

      <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-950/20">

        <CardContent className="p-6">

          <div className="flex gap-4">

            <AlertTriangle className="h-10 w-10 text-red-600" />

            <div>

              <h2 className="text-lg font-bold text-red-600">
                VERIFY DATE BEFORE SAVING
              </h2>

              <p className="mt-2">
                Attendance is being marked for:
              </p>

              <p className="text-3xl font-bold text-red-600">
                {attendanceDate}
              </p>

              <p className="mt-2 text-sm">
                Existing attendance for this date
                will be loaded automatically and
                updated if changed.
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardContent className="p-6">

          <div className="grid gap-4 md:grid-cols-4">

            <div>

              <Label>
                Company
              </Label>

              <Select
                value={companyId}
                onValueChange={
                  setCompanyId
                }
              >

                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>

                <SelectContent>

                  {masterData.companies.map(
                    (company) => (
                      <SelectItem
                        key={company.id}
                        value={String(
                          company.id,
                        )}
                      >
                        {company.companyName}
                      </SelectItem>
                    ),
                  )}

                </SelectContent>

              </Select>

            </div>

            <div>

              <Label>
                Department
              </Label>

              <Select
                value={departmentId}
                onValueChange={
                  setDepartmentId
                }
              >

                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>

                <SelectContent>

                  {masterData.departments.map(
                    (department) => (
                      <SelectItem
                        key={department.id}
                        value={String(
                          department.id,
                        )}
                      >
                        {department.name}
                      </SelectItem>
                    ),
                  )}

                </SelectContent>

              </Select>

            </div>

            <div>

              <Label>
                Attendance Date
              </Label>

              <Input
                type="date"
                value={attendanceDate}
                onChange={(e) =>
                  setAttendanceDate(
                    e.target.value,
                  )
                }
              />

            </div>

            <div>

              <Label>
                Search Employee
              </Label>

              <Input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value,
                  )
                }
                placeholder="Name, Code..."
              />

            </div>

          </div>

        </CardContent>

      </Card>
            <div className="grid gap-4 md:grid-cols-5">

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Present
            </p>

            <h2 className="text-3xl font-bold">
              {statistics.present}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Absent
            </p>

            <h2 className="text-3xl font-bold">
              {statistics.absent}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Half Day
            </p>

            <h2 className="text-3xl font-bold">
              {statistics.halfDay}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Leave
            </p>

            <h2 className="text-3xl font-bold">
              {statistics.leave}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Holiday
            </p>

            <h2 className="text-3xl font-bold">
              {statistics.holiday}
            </h2>
          </CardContent>
        </Card>

      </div>      <Card>

        <CardContent className="p-6">

          <div className="flex flex-wrap gap-2">

            <Button
              onClick={() =>
                updateAllStatus(
                  "PRESENT",
                )
              }
            >
              Mark All Present
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                updateAllStatus(
                  "ABSENT",
                )
              }
            >
              Mark All Absent
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                updateAllStatus(
                  "HALF_DAY",
                )
              }
            >
              Mark All Half Day
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                updateAllStatus(
                  "LEAVE",
                )
              }
            >
              Mark All Leave
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                updateAllStatus(
                  "HOLIDAY",
                )
              }
            >
              Mark All Holiday
            </Button>

          </div>

        </CardContent>

      </Card>
            <Card>

        <CardContent className="p-0">

          {!companyId ? (

            <div className="p-12 text-center text-muted-foreground">
              Select company to load employees.
            </div>

          ) : loading ? (

            <div className="p-12 text-center">
              Loading attendance...
            </div>

          ) : employees.length === 0 ? (

            <div className="p-12 text-center">
              No employees found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b bg-muted/50">

                    <th className="sticky left-0 z-10 bg-background p-4 text-left min-w-[250px]">
                      Employee
                    </th>

                    <th className="p-4 min-w-[280px]">
                      Vehicle
                    </th>

                    <th className="p-4">
                      P
                    </th>

                    <th className="p-4">
                      A
                    </th>

                    <th className="p-4">
                      HD
                    </th>

                    <th className="p-4">
                      L
                    </th>

                    <th className="p-4">
                      H
                    </th>

                    <th className="p-4 min-w-[120px]">
                      OT
                    </th>

                    <th className="p-4 min-w-[250px]">
                      Remarks
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {employees.map(
                    (
                      employee,
                      index,
                    ) => {

                      const attendance =
                        attendanceData[
                          employee.id
                        ];

                      return (

                        <tr
                          key={
                            employee.id
                          }
                          className={
                            index % 2 === 0
                              ? ""
                              : "bg-muted/20"
                          }
                        >

                          <td className="sticky left-0 bg-background p-4">

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
                                  employee.employeeCode
                                }
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {
                                  employee.department
                                    ?.name
                                }
                              </p>

                            </div>

                          </td>
                                                    <td className="p-2">

                            <Popover>

                              <PopoverTrigger asChild>

                                <Button
                                  variant="outline"
                                  className="w-full justify-start"
                                >

                                  {attendance?.vehicleId
                                    ? masterData.vehicles.find(
                                        (
                                          vehicle,
                                        ) =>
                                          vehicle.id ===
                                          attendance.vehicleId,
                                      )
                                        ?.vehicleNumber ||
                                      "Select Vehicle"
                                    : "Select Vehicle"}

                                </Button>

                              </PopoverTrigger>

                              <PopoverContent className="w-[320px] p-0">

                                <Command>

                                  <CommandInput placeholder="Search vehicle..." />

                                  <CommandEmpty>
                                    No vehicle found.
                                  </CommandEmpty>

                                  <CommandGroup>

                                    {masterData.vehicles.map(
                                      (
                                        vehicle,
                                      ) => (

                                        <CommandItem
                                          key={
                                            vehicle.id
                                          }
                                          value={`${vehicle.vehicleNumber} ${vehicle.vehicleName || ""}`}
                                          onSelect={() =>
                                            updateAttendance(
                                              employee.id,
                                              "vehicleId",
                                              vehicle.id,
                                            )
                                          }
                                        >

                                          {
                                            vehicle.vehicleNumber
                                          }

                                          {vehicle.vehicleName && (
                                            <span className="ml-2 text-muted-foreground">
                                              -
                                              {" "}
                                              {
                                                vehicle.vehicleName
                                              }
                                            </span>
                                          )}

                                        </CommandItem>

                                      ),
                                    )}

                                  </CommandGroup>

                                </Command>

                              </PopoverContent>

                            </Popover>

                          </td>
                                                    {[
                            "PRESENT",
                            "ABSENT",
                            "HALF_DAY",
                            "LEAVE",
                            "HOLIDAY",
                          ].map(
                            (
                              status,
                            ) => (

                              <td
                                key={
                                  status
                                }
                                className="text-center"
                              >

                                <input
                                  type="radio"
                                  tabIndex={0}
                                  name={`attendance-${employee.id}`}
                                  checked={
                                    attendance?.status ===
                                    status
                                  }
                                  onChange={() =>
                                    updateAttendance(
                                      employee.id,
                                      "status",
                                      status,
                                    )
                                  }
                                  className="h-5 w-5 cursor-pointer"
                                />

                              </td>

                            ),
                          )}

                          <td className="p-2">

                            <Input
                              type="number"
                              min="0"
                              step="0.5"
                              value={
                                attendance?.overtimeHours ||
                                0
                              }
                              onChange={(e) =>
                                updateAttendance(
                                  employee.id,
                                  "overtimeHours",
                                  e.target.value,
                                )
                              }
                            />

                          </td>

                          <td className="p-2">

                            <Input
                              value={
                                attendance?.remarks ||
                                ""
                              }
                              onChange={(e) =>
                                updateAttendance(
                                  employee.id,
                                  "remarks",
                                  e.target.value,
                                )
                              }
                              placeholder="Remarks"
                            />

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

      <div className="flex items-center justify-between">

        <div className="text-sm text-muted-foreground">

          Employees Loaded:
          {" "}
          <span className="font-medium">
            {employees.length}
          </span>

        </div>

        <Button
          size="lg"
          onClick={
            handleSave
          }
          disabled={
            saving ||
            employees.length === 0
          }
        >

          {saving
            ? "Saving Attendance..."
            : "Save Attendance"}

        </Button>

      </div>

    </div>
  );
}